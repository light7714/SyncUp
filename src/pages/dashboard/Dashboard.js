import { useState } from 'react';
import { useCollection } from '../../hooks/useCollection';
import { useAuthContext } from '../../hooks/useAuthContext';

// components
import ProjectList from '../../components/ProjectList';
import ProjectFilter from './ProjectFilter';

// styles
import './Dashboard.css';

export default function Dashboard() {
	const { user } = useAuthContext();
	const [currentFilter, setCurrentFilter] = useState('all');
	const { documents, error } = useCollection('projects');

	//will recv newFilter from ProjectFilter comp
	const changeFilter = (newFilter) => {
		setCurrentFilter(newFilter);
	};

	// if fn inside filter returns true, we keep that item, else remove it (for each ele)
	//this switch case runs for each ele
	// for 1st render, documents will be null while fetching, thats why added ternary check
	const projects = documents
		? documents.filter((document) => {
				switch (currentFilter) {
					case 'all':
						return true;
					// this case means the proj must have an a user in assignedUsersList thats equal to the logged in user
					case 'mine':
						let assignedToME = false;
						document.assignedUsersList.forEach((u) => {
							if (user.uid === u.id) {
								assignedToME = true;
							}
						});
						return assignedToME;

					case 'development':
					case 'design':
					case 'sales':
					case 'marketing':
						// console.log(document.category, currentFilter);
						return document.category === currentFilter;

					default:
						return true;
				}
		  })
		: null;

	return (
		<div>
			<h2 className="page-title">Dashboard</h2>
			{error ? <p className="error">{error}</p> : null}
			{documents ? (
				<ProjectFilter
					currentFilter={currentFilter}
					changeFilter={changeFilter}
				/>
			) : null}
			{projects ? <ProjectList projects={projects} /> : null}
		</div>
	);
}
