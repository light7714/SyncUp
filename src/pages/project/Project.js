import { useParams } from 'react-router-dom';
import { useDocument } from '../../hooks/useDocument';
import ProjectSummary from './ProjectSummary';

// styles
import './Project.css';
import ProjectComments from './ProjectComments';

export default function Project() {
	const { id } = useParams();
	// there is a real time listener or the projects collection, so whenever the document updates (comment added), we get the new doc 
	const { error, document } = useDocument('projects', id);

	//just a different way of showing error and loading
	if (error) {
		return <div className="error">{error}</div>;
	}
	if (!document) {
		return <div className="loading">Loading...</div>;
	}

	return (
		<div className="project-details">
			<ProjectSummary project={document} />
			<ProjectComments project={document} />
		</div>
	);
}
