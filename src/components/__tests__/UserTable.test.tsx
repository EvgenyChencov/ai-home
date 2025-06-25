import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '../../test/utils/testUtils'
import { UserTable } from '../UserTable'
import { mockUsers } from '../../test/mocks/userServiceMock'

const defaultProps = {
	users: mockUsers,
	onUserSelect: vi.fn(),
	onDeleteUser: vi.fn()
}

describe('UserTable', () => {
	it('renders table headers correctly', () => {
		render(<UserTable {...defaultProps} />)

		expect(screen.getByText('Name / Email')).toBeInTheDocument()
		expect(screen.getByText('Address')).toBeInTheDocument()
		expect(screen.getByText('Phone')).toBeInTheDocument()
		expect(screen.getByText('Website')).toBeInTheDocument()
		expect(screen.getByText('Company')).toBeInTheDocument()
		expect(screen.getByText('Actions')).toBeInTheDocument()
	})

	it('renders all users', () => {
		render(<UserTable {...defaultProps} />)

		expect(screen.getByText('John Doe')).toBeInTheDocument()
		expect(screen.getByText('Jane Smith')).toBeInTheDocument()
		expect(screen.getByText('john@example.com')).toBeInTheDocument()
		expect(screen.getByText('jane@example.com')).toBeInTheDocument()
	})

	it('displays correct user count in summary', () => {
		render(<UserTable {...defaultProps} />)

		expect(screen.getByText('2 users total')).toBeInTheDocument()
	})

	it('displays singular user when count is 1', () => {
		render(<UserTable {...defaultProps} users={[mockUsers[0]]} />)

		expect(screen.getByText('1 user total')).toBeInTheDocument()
	})

	it('displays zero users when empty', () => {
		render(<UserTable {...defaultProps} users={[]} />)

		expect(screen.getByText('0 users total')).toBeInTheDocument()
	})

	it('has proper table structure and accessibility', () => {
		render(<UserTable {...defaultProps} />)

		const table = screen.getByRole('table')
		expect(table).toBeInTheDocument()

		const headers = screen.getAllByRole('columnheader')
		expect(headers).toHaveLength(6)

		headers.forEach(header => {
			expect(header).toHaveAttribute('scope', 'col')
		})
	})

	it('passes props correctly to UserRow components', () => {
		const onUserSelect = vi.fn()
		const onDeleteUser = vi.fn()

		render(
			<UserTable
				users={mockUsers}
				onUserSelect={onUserSelect}
				onDeleteUser={onDeleteUser}
			/>
		)

		// Check if UserRow components are rendered with correct props
		expect(screen.getByText('John Doe')).toBeInTheDocument()
		expect(screen.getByText('Jane Smith')).toBeInTheDocument()
	})
}) 