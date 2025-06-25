import { useEffect } from 'react'
import type { User } from '../types/user'
import styles from './UserModal.module.css'

interface UserModalProps {
	user: User
	onClose: () => void
}

export function UserModal({ user, onClose }: UserModalProps) {
	useEffect(() => {
		const handleEscape = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				onClose()
			}
		}

		const handleClickOutside = (e: MouseEvent) => {
			const target = e.target as HTMLElement
			if (target.classList.contains(styles.overlay)) {
				onClose()
			}
		}

		document.addEventListener('keydown', handleEscape)
		document.addEventListener('click', handleClickOutside)
		document.body.style.overflow = 'hidden'

		return () => {
			document.removeEventListener('keydown', handleEscape)
			document.removeEventListener('click', handleClickOutside)
			document.body.style.overflow = 'unset'
		}
	}, [onClose])

	const getMapUrl = (lat: string, lng: string) => {
		return `https://www.google.com/maps?q=${lat},${lng}`
	}

	const formatWebsite = (website: string) => {
		return website.startsWith('http') ? website : `https://${website}`
	}

	return (
		<div className={styles.overlay} role="dialog" aria-modal="true" aria-labelledby="modal-title">
			<div className={styles.modal}>
				<div className={styles.header}>
					<h2 id="modal-title" className={styles.title}>User Details</h2>
					<button
						onClick={onClose}
						className={styles.closeButton}
						aria-label="Close modal"
						title="Close"
					>
						<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
							<line x1="18" y1="6" x2="6" y2="18"></line>
							<line x1="6" y1="6" x2="18" y2="18"></line>
						</svg>
					</button>
				</div>

				<div className={styles.content}>
					<div className={styles.section}>
						<h3 className={styles.sectionTitle}>Personal Information</h3>
						<div className={styles.infoGrid}>
							<div className={styles.infoItem}>
								<span className={styles.label}>Name:</span>
								<span className={styles.value}>{user.name}</span>
							</div>
							<div className={styles.infoItem}>
								<span className={styles.label}>Username:</span>
								<span className={styles.value}>{user.username}</span>
							</div>
							<div className={styles.infoItem}>
								<span className={styles.label}>Email:</span>
								<a href={`mailto:${user.email}`} className={styles.link}>
									{user.email}
								</a>
							</div>
							<div className={styles.infoItem}>
								<span className={styles.label}>Phone:</span>
								<a href={`tel:${user.phone}`} className={styles.link}>
									{user.phone}
								</a>
							</div>
							<div className={styles.infoItem}>
								<span className={styles.label}>Website:</span>
								<a 
									href={formatWebsite(user.website)}
									target="_blank"
									rel="noopener noreferrer"
									className={styles.link}
								>
									{user.website}
								</a>
							</div>
						</div>
					</div>

					<div className={styles.section}>
						<h3 className={styles.sectionTitle}>Address</h3>
						<div className={styles.addressContainer}>
							<div className={styles.addressText}>
								<p>{user.address.street}, {user.address.suite}</p>
								<p>{user.address.city}, {user.address.zipcode}</p>
							</div>
							<a
								href={getMapUrl(user.address.geo.lat, user.address.geo.lng)}
								target="_blank"
								rel="noopener noreferrer"
								className={styles.mapLink}
								title="View on map"
							>
								<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
									<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
									<circle cx="12" cy="10" r="3"></circle>
								</svg>
								View on map
							</a>
						</div>
					</div>

					<div className={styles.section}>
						<h3 className={styles.sectionTitle}>Company</h3>
						<div className={styles.companyInfo}>
							<div className={styles.infoItem}>
								<span className={styles.label}>Name:</span>
								<span className={styles.value}>{user.company.name}</span>
							</div>
							<div className={styles.infoItem}>
								<span className={styles.label}>Catchphrase:</span>
								<span className={styles.value}>{user.company.catchPhrase}</span>
							</div>
							<div className={styles.infoItem}>
								<span className={styles.label}>Business:</span>
								<span className={styles.value}>{user.company.bs}</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
} 