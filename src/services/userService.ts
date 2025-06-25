import type { User } from '../types/user'

const API_BASE_URL = 'https://jsonplaceholder.typicode.com'

export const fetchUsers = async (): Promise<User[]> => {
	try {
		const response = await fetch(`${API_BASE_URL}/users`)
		
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`)
		}
		
		const users: User[] = await response.json()
		return users
	} catch (error) {
		console.error('Failed to fetch users:', error)
		throw new Error('Failed to fetch users. Please try again later.')
	}
} 