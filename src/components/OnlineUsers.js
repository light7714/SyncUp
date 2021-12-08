import { useCollection } from '../hooks/useCollection';

// components
import Avatar from './Avatar';

// styles
import './OnlineUsers.css';

export default function OnlineUsers() {
	const { isPending, error, documents } = useCollection('users');

	return (
		<div className="user-list">
			<h2>All Users</h2>
			{isPending ? <div>Loading users...</div> : null}
			{error ? <div>{error}</div> : null}
			{documents
				? documents.map((user) => (
						// firebase document id = user.id which we added manually (see useCollection)
						<div key={user.id} className="user-list-item">
							{user.online ? (
								<span className="online-user"></span>
							) : (
								<span className="offline-user"></span>
							)}
							<span>{user.displayName}</span>
							<Avatar src={user.photoURL} />
						</div>
				  ))
				: null}
		</div>
	);
}
