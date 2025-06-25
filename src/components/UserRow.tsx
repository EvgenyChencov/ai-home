import React from 'react'
import type { User } from '../types/user'
import styles from './UserRow.module.css'

interface UserRowProps {
	user: User
	onUserSelect: (user: User) => void
	onDeleteUser: (userId: number) => void
}

export function UserRow({ user, onUserSelect, onDeleteUser }: UserRowProps) {
	const handleRowClick = () => {
		onUserSelect(user)
	}

	const handleDeleteClick = (e: React.MouseEvent) => {
		e.stopPropagation()
		if (window.confirm(`Are you sure you want to delete ${user.name}?`)) {
			onDeleteUser(user.id)
		}
	}

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === 'Enter' || e.key === ' ') {
			e.preventDefault()
			handleRowClick()
		}
	}

	const formatAddress = (address: User['address']) => {
		return `${address.street}, ${address.city}`
	}

	const formatWebsite = (website: string) => {
		return website.startsWith('http') ? website : `https://${website}`
	}

	return (
		<tr 
			className={styles.row}
			onClick={handleRowClick}
			onKeyDown={handleKeyDown}
			tabIndex={0}
			role="button"
			aria-label={`View details for ${user.name}`}
		>
			<td className={styles.nameCell}>
				<div className={styles.nameContainer}>
					<div className={styles.name}>{user.name}</div>
					<div className={styles.email}>{user.email}</div>
				</div>
			</td>
			
			<td className={styles.cell}>
				<div className={styles.address}>
					{formatAddress(user.address)}
				</div>
			</td>
			
			<td className={styles.cell}>
				<a 
					href={`tel:${user.phone}`} 
					className={styles.phoneLink}
					onClick={(e) => e.stopPropagation()}
				>
					{user.phone}
				</a>
			</td>
			
			<td className={styles.cell}>
				<a 
					href={formatWebsite(user.website)}
					target="_blank"
					rel="noopener noreferrer"
					className={styles.websiteLink}
					onClick={(e) => e.stopPropagation()}
				>
					{user.website}
				</a>
			</td>
			
			<td className={styles.cell}>
				<div className={styles.company}>
					{user.company.name}
				</div>
			</td>
			
			<td className={styles.actionsCell}>
				<button
					onClick={handleDeleteClick}
					className={styles.deleteButton}
					aria-label={`Delete ${user.name}`}
					title="Delete user"
				>
					<svg 
						width="16" 
						height="16" 
						viewBox="0 0 24 24" 
						fill="none" 
						stroke="currentColor" 
						strokeWidth="2"
					>
						<path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6h14ZM10 11v6M14 11v6" />
					</svg>
				</button>
			</td>
		</tr>
	)
} 