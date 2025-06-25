import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '../test/utils/testUtils'
import App from '../App'
import { fetchUsers } from '../services/userService'
import { mockUsers } from '../test/mocks/userServiceMock'

// Mock the userService
vi.mock('../services/userService')

const mockFetchUsers = vi.mocked(fetchUsers)

describe('App Integration Tests', () => {
	beforeEach(() => {
		vi.clearAllMocks()
	})

	it('renders app title and subtitle', async () => {
		mockFetchUsers.mockResolvedValue(mockUsers)
		render(<App />)

		expect(screen.getByText('User Management System')).toBeInTheDocument()
		expect(screen.getByText('Manage and view user information')).toBeInTheDocument()
	})

	it('shows loading state initially', async () => {
		mockFetchUsers.mockResolvedValue(mockUsers)
		render(<App />)

		expect(screen.getByText('Loading users...')).toBeInTheDocument()
	})

	it('displays users after successful fetch', async () => {
		mockFetchUsers.mockResolvedValue(mockUsers)
		render(<App />)

		await waitFor(() => {
			expect(screen.getByText('John Doe')).toBeInTheDocument()
			expect(screen.getByText('Jane Smith')).toBeInTheDocument()
		})

		expect(screen.getByText('2 users total')).toBeInTheDocument()
	})

	it('handles API error gracefully', async () => {
		const errorMessage = 'Failed to fetch users. Please try again later.'
		mockFetchUsers.mockRejectedValue(new Error(errorMessage))
		render(<App />)

		await waitFor(() => {
			expect(screen.getByText('Error')).toBeInTheDocument()
			expect(screen.getByText(errorMessage)).toBeInTheDocument()
		})

		expect(screen.getByRole('button', { name: /retry/i })).toBeInTheDocument()
	})

	it('shows empty state when no users', async () => {
		mockFetchUsers.mockResolvedValue([])
		render(<App />)

		await waitFor(() => {
			expect(screen.getByText('No users found')).toBeInTheDocument()
			expect(screen.getByText('There are no users to display at the moment.')).toBeInTheDocument()
		})
	})

	it('opens user modal when user is clicked', async () => {
		mockFetchUsers.mockResolvedValue(mockUsers)
		render(<App />)

		await waitFor(() => {
			expect(screen.getByText('John Doe')).toBeInTheDocument()
		})

		const userRow = screen.getByRole('button', { name: /view details for john doe/i })
		fireEvent.click(userRow)

		await waitFor(() => {
			expect(screen.getByText('User Details')).toBeInTheDocument()
			expect(screen.getByText('Personal Information')).toBeInTheDocument()
		})
	})

	it('closes modal when close button is clicked', async () => {
		mockFetchUsers.mockResolvedValue(mockUsers)
		render(<App />)

		await waitFor(() => {
			expect(screen.getByText('John Doe')).toBeInTheDocument()
		})

		// Open modal
		const userRow = screen.getByRole('button', { name: /view details for john doe/i })
		fireEvent.click(userRow)

		await waitFor(() => {
			expect(screen.getByText('User Details')).toBeInTheDocument()
		})

		// Close modal
		const closeButton = screen.getByRole('button', { name: /close modal/i })
		fireEvent.click(closeButton)

		await waitFor(() => {
			expect(screen.queryByText('User Details')).not.toBeInTheDocument()
		})
	})

	it('deletes user when delete button is clicked and confirmed', async () => {
		mockFetchUsers.mockResolvedValue(mockUsers)
		window.confirm = vi.fn(() => true)
		render(<App />)

		await waitFor(() => {
			expect(screen.getByText('John Doe')).toBeInTheDocument()
			expect(screen.getByText('2 users total')).toBeInTheDocument()
		})

		const deleteButton = screen.getByRole('button', { name: /delete john doe/i })
		fireEvent.click(deleteButton)

		await waitFor(() => {
			expect(screen.queryByText('John Doe')).not.toBeInTheDocument()
			expect(screen.getByText('1 user total')).toBeInTheDocument()
		})

		expect(window.confirm).toHaveBeenCalledWith('Are you sure you want to delete John Doe?')
	})

	it('does not delete user when deletion is not confirmed', async () => {
		mockFetchUsers.mockResolvedValue(mockUsers)
		window.confirm = vi.fn(() => false)
		render(<App />)

		await waitFor(() => {
			expect(screen.getByText('John Doe')).toBeInTheDocument()
			expect(screen.getByText('2 users total')).toBeInTheDocument()
		})

		const deleteButton = screen.getByRole('button', { name: /delete john doe/i })
		fireEvent.click(deleteButton)

		// User should still be there
		expect(screen.getByText('John Doe')).toBeInTheDocument()
		expect(screen.getByText('2 users total')).toBeInTheDocument()
	})

	it('closes modal when deleting the currently viewed user', async () => {
		mockFetchUsers.mockResolvedValue(mockUsers)
		window.confirm = vi.fn(() => true)
		render(<App />)

		await waitFor(() => {
			expect(screen.getByText('John Doe')).toBeInTheDocument()
		})

		// Open modal for John Doe
		const userRow = screen.getByRole('button', { name: /view details for john doe/i })
		fireEvent.click(userRow)

		await waitFor(() => {
			expect(screen.getByText('User Details')).toBeInTheDocument()
		})

		// Delete John Doe
		const deleteButton = screen.getByRole('button', { name: /delete john doe/i })
		fireEvent.click(deleteButton)

		await waitFor(() => {
			expect(screen.queryByText('User Details')).not.toBeInTheDocument()
			expect(screen.queryByText('John Doe')).not.toBeInTheDocument()
		})
	})

	it('reloads page when retry button is clicked', async () => {
		mockFetchUsers.mockRejectedValue(new Error('Network error'))
		
		// Mock window.location.reload
		const reloadMock = vi.fn()
		Object.defineProperty(window, 'location', {
			writable: true,
			value: { reload: reloadMock }
		})

		render(<App />)

		await waitFor(() => {
			expect(screen.getByText('Error')).toBeInTheDocument()
		})

		const retryButton = screen.getByRole('button', { name: /retry/i })
		fireEvent.click(retryButton)

		expect(reloadMock).toHaveBeenCalled()
	})
}) 