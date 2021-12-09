const filterList = [
	'all',
	'mine',
	'development',
	'design',
	'marketing',
	'sales',
];

export default function ProjectFilter({ currentFilter, changeFilter }) {
	//putting this currentFilter state in dashboard, as dashboard needs to pass which projects to show thru props using the state of the filter
	// const [currentFilter, setCurrentFilter] = useState('all');

	const handleClick = (newFilter) => {
		// setCurrentFilter(newFilter);	cant update this here, its in dashboard now
		changeFilter(newFilter);
	};

	return (
		<div className="project-filter">
			<nav>
				<p>Filter by:</p>
				{filterList.map((f) => (
					<button
						key={f}
						onClick={() => {
							handleClick(f);
						}}
						className={currentFilter === f ? 'active' : ''}
					>
						{f}
					</button>
				))}
			</nav>
		</div>
	);
}
