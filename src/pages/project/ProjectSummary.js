import Avatar from '../../components/Avatar';
import { useFirestore } from '../../hooks/useFirestore';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useHistory } from 'react-router-dom';

export default function ProjectSummary({ project }) {
	const { deleteDocument } = useFirestore('projects');
	const { user } = useAuthContext();
	const history = useHistory();

	const handleClick = (e) => {
		deleteDocument(project.id);

		// redirecting before doc is deleted, it doesnt matter here rn
		history.push('/');
	};

	return (
		<div>
			<div className="project-summary">
				<h2 className="page-title">{project.name}</h2>
				<p>By {project.createdBy.displayName} </p>
				<p className="due-date">
					Project due by {project.dueDate.toDate().toDateString()}
				</p>
				<p className="details">{project.details}</p>
				<h4>Project is assigned to:</h4>
				<div className="assigned-users">
					{project.assignedUsersList.map((user) => (
						<div key={user.id}>
							<Avatar src={user.photoURL} />
							<h5>{user.displayName}</h5>
						</div>
					))}
				</div>
			</div>
			{/* shud do this check on backend as well to make it secure */}
			{user.uid === project.createdBy.id ? (
				<button className="btn" onClick={handleClick}>
					Mark as Complete (Delete)
				</button>
			) : null}
		</div>
	);
}
