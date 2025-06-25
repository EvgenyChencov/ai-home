import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '../../test/utils/testUtils'
import { UserRow } from '../UserRow'
import { mockUsers } from '../../test/mocks/userServiceMock'

const mockUser = mockUsers[0]

const defaultProps = {
	user: mockUser,
	onUserSelect: vi.fn(),
	onDeleteUser: vi.fn()
}

describe('UserRow', () => {
	it('renders user information correctly', () => {
		render(<UserRow {...defaultProps} />)

		expect(screen.getByText('John Doe')).toBeInTheDocument()
		expect(screen.getByText('john@example.com')).toBeInTheDocument()
		expect(screen.getByText('123 Main St, New York')).toBeInTheDocument()
		expect(screen.getByText('555-0123')).toBeInTheDocument()
		expect(screen.getByText('johndoe.com')).toBeInTheDocument()
		expect(screen.getByText('Acme Corp')).toBeInTheDocument()
	})

	it('calls onUserSelect when row is clicked', () => {
		const onUserSelect = vi.fn()
		render(<UserRow {...defaultProps} onUserSelect={onUserSelect} />)

		const row = screen.getByRole('button', { name: /view details for john doe/i })
		fireEvent.click(row)

		expect(onUserSelect).toHaveBeenCalledWith(mockUser)
	})

	it('calls onUserSelect when Enter key is pressed', () => {
		const onUserSelect = vi.fn()
		render(<UserRow {...defaultProps} onUserSelect={onUserSelect} />)

		const row = screen.getByRole('button', { name: /view details for john doe/i })
		fireEvent.keyDown(row, { key: 'Enter', code: 'Enter' })

		expect(onUserSelect).toHaveBeenCalledWith(mockUser)
	})

	it('calls onUserSelect when Space key is pressed', () => {
		const onUserSelect = vi.fn()
		render(<UserRow {...defaultProps} onUserSelect={onUserSelect} />)

		const row = screen.getByRole('button', { name: /view details for john doe/i })
		fireEvent.keyDown(row, { key: ' ', code: 'Space' })

		expect(onUserSelect).toHaveBeenCalledWith(mockUser)
	})

	it('does not call onUserSelect for other keys', () => {
		const onUserSelect = vi.fn()
		render(<UserRow {...defaultProps} onUserSelect={onUserSelect} />)

		const row = screen.getByRole('button', { name: /view details for john doe/i })
		fireEvent.keyDown(row, { key: 'Tab', code: 'Tab' })

		expect(onUserSelect).not.toHaveBeenCalled()
	})

	it('calls onDeleteUser when delete button is clicked and confirmed', () => {
		const onDeleteUser = vi.fn()
		render(<UserRow {...defaultProps} onDeleteUser={onDeleteUser} />)

		const deleteButton = screen.getByRole('button', { name: /delete john doe/i })
		fireEvent.click(deleteButton)

		expect(onDeleteUser).toHaveBeenCalledWith(1)
	})

	it('does not call onDeleteUser when delete is not confirmed', () => {
		// Mock window.confirm to return false
		window.confirm = vi.fn(() => false)
		const onDeleteUser = vi.fn()
		render(<UserRow {...defaultProps} onDeleteUser={onDeleteUser} />)

		const deleteButton = screen.getByRole('button', { name: /delete john doe/i })
		fireEvent.click(deleteButton)

		expect(onDeleteUser).not.toHaveBeenCalled()
	})

	it('formats website URL correctly with https prefix', () => {
		const userWithoutHttps = {
			...mockUser,
			website: 'example.com'
		}
		render(<UserRow {...defaultProps} user={userWithoutHttps} />)

		const websiteLink = screen.getByRole('link', { name: /example.com/i })
		expect(websiteLink).toHaveAttribute('href', 'https://example.com')
	})

	it('formats website URL correctly when already has https', () => {
		const userWithHttps = {
			...mockUser,
			website: 'https://example.com'
		}
		render(<UserRow {...defaultProps} user={userWithHttps} />)

		const websiteLink = screen.getByRole('link', { name: /https:\/\/example.com/i })
		expect(websiteLink).toHaveAttribute('href', 'https://example.com')
	})

	it('has proper accessibility attributes', () => {
		render(<UserRow {...defaultProps} />)

		const row = screen.getByRole('button', { name: /view details for john doe/i })
		expect(row).toHaveAttribute('tabIndex', '0')
		expect(row).toHaveAttribute('aria-label', 'View details for John Doe')

		const deleteButton = screen.getByRole('button', { name: /delete john doe/i })
		expect(deleteButton).toHaveAttribute('aria-label', 'Delete John Doe')
		expect(deleteButton).toHaveAttribute('title', 'Delete user')
	})

	it('prevents event propagation when clicking phone link', () => {
		render(<UserRow {...defaultProps} />)

		const phoneLink = screen.getByRole('link', { name: /555-0123/i })
		const stopPropagationSpy = vi.fn()
		
		const clickEvent = new MouseEvent('click', { bubbles: true })
		clickEvent.stopPropagation = stopPropagationSpy
		
		fireEvent(phoneLink, clickEvent)
		expect(stopPropagationSpy).toHaveBeenCalled()
	})

	it('prevents event propagation when clicking website link', () => {
		render(<UserRow {...defaultProps} />)

		const websiteLink = screen.getByRole('link', { name: /johndoe.com/i })
		const stopPropagationSpy = vi.fn()
		
		const clickEvent = new MouseEvent('click', { bubbles: true })
		clickEvent.stopPropagation = stopPropagationSpy
		
		fireEvent(websiteLink, clickEvent)
		expect(stopPropagationSpy).toHaveBeenCalled()
	})
}) 