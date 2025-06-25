import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, fireEvent } from '../../test/utils/testUtils'
import { UserModal } from '../UserModal'
import { mockUsers } from '../../test/mocks/userServiceMock'

const mockUser = mockUsers[0]

const defaultProps = {
	user: mockUser,
	onClose: vi.fn()
}

describe('UserModal', () => {
	beforeEach(() => {
		// Mock document.body.style
		Object.defineProperty(document.body, 'style', {
			writable: true,
			value: { overflow: '' }
		})
	})

	afterEach(() => {
		vi.clearAllMocks()
	})

	it('renders user details correctly', () => {
		render(<UserModal {...defaultProps} />)

		// Personal Information
		expect(screen.getByText('Personal Information')).toBeInTheDocument()
		expect(screen.getByText('John Doe')).toBeInTheDocument()
		expect(screen.getByText('johndoe')).toBeInTheDocument()
		expect(screen.getByText('john@example.com')).toBeInTheDocument()
		expect(screen.getByText('555-0123')).toBeInTheDocument()
		expect(screen.getByText('johndoe.com')).toBeInTheDocument()

		// Address
		expect(screen.getByText('Address')).toBeInTheDocument()
		expect(screen.getByText('123 Main St, Apt 1')).toBeInTheDocument()
		expect(screen.getByText('New York, 10001')).toBeInTheDocument()

		// Company
		expect(screen.getByText('Company')).toBeInTheDocument()
		expect(screen.getByText('Acme Corp')).toBeInTheDocument()
		expect(screen.getByText('Quality solutions')).toBeInTheDocument()
		expect(screen.getByText('synergistic services')).toBeInTheDocument()
	})

	it('calls onClose when close button is clicked', () => {
		const onClose = vi.fn()
		render(<UserModal {...defaultProps} onClose={onClose} />)

		const closeButton = screen.getByRole('button', { name: /close modal/i })
		fireEvent.click(closeButton)

		expect(onClose).toHaveBeenCalled()
	})

	it('calls onClose when Escape key is pressed', () => {
		const onClose = vi.fn()
		render(<UserModal {...defaultProps} onClose={onClose} />)

		fireEvent.keyDown(document, { key: 'Escape', code: 'Escape' })

		expect(onClose).toHaveBeenCalled()
	})

	it('sets body overflow to hidden on mount', () => {
		render(<UserModal {...defaultProps} />)

		expect(document.body.style.overflow).toBe('hidden')
	})

	it('resets body overflow on unmount', () => {
		const { unmount } = render(<UserModal {...defaultProps} />)

		unmount()

		expect(document.body.style.overflow).toBe('unset')
	})

	it('has proper accessibility attributes', () => {
		render(<UserModal {...defaultProps} />)

		const dialog = screen.getByRole('dialog')
		expect(dialog).toHaveAttribute('aria-modal', 'true')
		expect(dialog).toHaveAttribute('aria-labelledby', 'modal-title')

		const title = screen.getByText('User Details')
		expect(title).toHaveAttribute('id', 'modal-title')

		const closeButton = screen.getByRole('button', { name: /close modal/i })
		expect(closeButton).toHaveAttribute('aria-label', 'Close modal')
		expect(closeButton).toHaveAttribute('title', 'Close')
	})

	it('formats website URL correctly with https prefix', () => {
		const userWithoutHttps = {
			...mockUser,
			website: 'example.com'
		}
		render(<UserModal {...defaultProps} user={userWithoutHttps} />)

		// Find all links and filter by href
		const links = screen.getAllByRole('link')
		const websiteLink = links.find(link => link.getAttribute('href') === 'https://example.com')
		expect(websiteLink).toBeDefined()
		expect(websiteLink).toHaveAttribute('href', 'https://example.com')
	})

	it('formats website URL correctly when already has https', () => {
		const userWithHttps = {
			...mockUser,
			website: 'https://example.com'
		}
		render(<UserModal {...defaultProps} user={userWithHttps} />)

		const websiteLink = screen.getByRole('link', { name: /https:\/\/example.com/i })
		expect(websiteLink).toHaveAttribute('href', 'https://example.com')
	})

	it('creates correct map URL with coordinates', () => {
		render(<UserModal {...defaultProps} />)

		const mapLink = screen.getByRole('link', { name: /view on map/i })
		expect(mapLink).toHaveAttribute(
			'href',
			'https://www.google.com/maps?q=40.7128,-74.0060'
		)
		expect(mapLink).toHaveAttribute('target', '_blank')
		expect(mapLink).toHaveAttribute('rel', 'noopener noreferrer')
	})

	it('has proper external links attributes', () => {
		render(<UserModal {...defaultProps} />)

		const websiteLink = screen.getByRole('link', { name: /johndoe.com/i })
		expect(websiteLink).toHaveAttribute('target', '_blank')
		expect(websiteLink).toHaveAttribute('rel', 'noopener noreferrer')

		const mapLink = screen.getByRole('link', { name: /view on map/i })
		expect(mapLink).toHaveAttribute('target', '_blank')
		expect(mapLink).toHaveAttribute('rel', 'noopener noreferrer')
	})

	it('has correct mailto and tel links', () => {
		render(<UserModal {...defaultProps} />)

		const emailLink = screen.getByRole('link', { name: /john@example.com/i })
		expect(emailLink).toHaveAttribute('href', 'mailto:john@example.com')

		const phoneLink = screen.getByRole('link', { name: /555-0123/i })
		expect(phoneLink).toHaveAttribute('href', 'tel:555-0123')
	})

	it('removes event listeners on unmount', () => {
		const removeEventListenerSpy = vi.spyOn(document, 'removeEventListener')
		const { unmount } = render(<UserModal {...defaultProps} />)

		unmount()

		expect(removeEventListenerSpy).toHaveBeenCalledWith('keydown', expect.any(Function))
		expect(removeEventListenerSpy).toHaveBeenCalledWith('click', expect.any(Function))

		removeEventListenerSpy.mockRestore()
	})
}) 