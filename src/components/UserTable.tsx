import type { User } from '../types/user'
import { UserRow } from './UserRow'
import styles from './UserTable.module.css'

interface UserTableProps {
	users: User[]
	onUserSelect: (user: User) => void
	onDeleteUser: (userId: number) => void
}

export function UserTable({ users, onUserSelect, onDeleteUser }: UserTableProps) {
	return (
		<div className={styles.tableContainer}>
			<div className={styles.tableWrapper}>
				<table className={styles.table} role="table">
					<thead className={styles.tableHead}>
						<tr>
							<th scope="col" className={styles.tableHeader}>Name / Email</th>
							<th scope="col" className={styles.tableHeader}>Address</th>
							<th scope="col" className={styles.tableHeader}>Phone</th>
							<th scope="col" className={styles.tableHeader}>Website</th>
							<th scope="col" className={styles.tableHeader}>Company</th>
							<th scope="col" className={styles.tableHeader}>Actions</th>
						</tr>
					</thead>
					<tbody className={styles.tableBody}>
						{users.map((user) => (
							<UserRow
								key={user.id}
								user={user}
								onUserSelect={onUserSelect}
								onDeleteUser={onDeleteUser}
							/>
						))}
					</tbody>
				</table>
			</div>
			
			<div className={styles.summary}>
				<p>{users.length} user{users.length !== 1 ? 's' : ''} total</p>
			</div>
		</div>
	)
} 