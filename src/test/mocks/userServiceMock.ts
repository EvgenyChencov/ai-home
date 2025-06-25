import type { User } from '../../types/user'

export const mockUsers: User[] = [
	{
		id: 1,
		name: 'John Doe',
		username: 'johndoe',
		email: 'john@example.com',
		address: {
			street: '123 Main St',
			suite: 'Apt 1',
			city: 'New York',
			zipcode: '10001',
			geo: {
				lat: '40.7128',
				lng: '-74.0060'
			}
		},
		phone: '555-0123',
		website: 'johndoe.com',
		company: {
			name: 'Acme Corp',
			catchPhrase: 'Quality solutions',
			bs: 'synergistic services'
		}
	},
	{
		id: 2,
		name: 'Jane Smith',
		username: 'janesmith',
		email: 'jane@example.com',
		address: {
			street: '456 Oak Ave',
			suite: 'Suite 200',
			city: 'Los Angeles',
			zipcode: '90210',
			geo: {
				lat: '34.0522',
				lng: '-118.2437'
			}
		},
		phone: '555-0456',
		website: 'janesmith.com',
		company: {
			name: 'Tech Solutions Inc',
			catchPhrase: 'Innovation first',
			bs: 'cutting-edge technology'
		}
	}
]

export const fetchUsersMock = vi.fn().mockResolvedValue(mockUsers) 