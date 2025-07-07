import { useEffect, useState } from 'react'
import type { User } from './types/user'
import { fetchUsers } from './services/userService'
import { UserTable } from './components/UserTable'
import { UserModal } from './components/UserModal'
import styles from './App.module.css'

function App() {
	const [users, setUsers] = useState<User[]>([])
	const [selectedUser, setSelectedUser] = useState<User | null>(null)
	const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)
	

	useEffect(() => {
		const loadUsers = async () => {
			try {
				setIsLoading(true)
				setError(null)
				const fetchedUsers = await fetchUsers()
				setUsers(fetchedUsers)
			} catch (err) {
				setError(err instanceof Error ? err.message : 'An unexpected error occurred')
			} finally {
				setIsLoading(false)
			}
		}

		loadUsers()
	}, [])

	const handleUserSelect = (user: User) => {
		setSelectedUser(user)
	}

	const handleCloseModal = () => {
		setSelectedUser(null)
	}

	const handleDeleteUser = (userId: number) => {
		setUsers(prevUsers => prevUsers.filter(user => user.id !== userId))
		if (selectedUser && selectedUser.id === userId) {
			setSelectedUser(null)
		}
	}

	return (
		<div className={styles.app}>
			<header className={styles.header}>
				<h1 className={styles.title}>User Management System</h1>
				<p className={styles.subtitle}>Manage and view user information</p>
			</header>

			<main className={styles.main}>
				{isLoading && (
					<div className={styles.loading}>
						<div className={styles.spinner}></div>
						<p>Loading users...</p>
					</div>
				)}

				{error && (
					<div className={styles.error}>
						<h2>Error</h2>
						<p>{error}</p>
						<button
							onClick={() => window.location.reload()}
							className={styles.retryButton}
						>
							Retry
						</button>
					</div>
				)}

				{!isLoading && !error && users.length > 0 && (
					<UserTable
						users={users}
						onUserSelect={handleUserSelect}
						onDeleteUser={handleDeleteUser}
					/>
				)}

				{!isLoading && !error && users.length === 0 && (
					<div className={styles.empty}>
						<h2>No users found</h2>
						<p>There are no users to display at the moment.</p>
					</div>
				)}
			</main>

			{selectedUser && (
				<UserModal
					user={selectedUser}
					onClose={handleCloseModal}
				/>
			)}
		</div>
	)
}

export default App
