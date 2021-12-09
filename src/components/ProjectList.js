import { Link } from 'react-router-dom';
import Avatar from '../components/Avatar';

// styles
import './ProjectList.css';

export default function ProjectList({ projects }) {
	return (
		<div className="project-list">
			{projects.length === 0 ? (
				<p>No projects yet!</p>
			) : (
				projects.map((project) => (
					// firebase doc id
					// still need key prop
					<Link to={`/projects/${project.id}`} key={project.id}>
						<h4>{project.name}</h4>
						{/* dueDate was a firebase timestamp obj */}
						<p>Due by {project.dueDate.toDate().toDateString()}</p>

						<div className="assigned-to">
							<ul>
								{project.assignedUsersList.map((user) => (
									<li key={user.photoURL}>
										<Avatar src={user.photoURL} />
										<h5>{user.displayName}</h5>
									</li>
								))}
							</ul>
						</div>
					</Link>
				))
			)}
		</div>
	);
}
