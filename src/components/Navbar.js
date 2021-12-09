import { NavLink } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';

// styles & images
import './Navbar.css';
import Temple from '../assets/temple.svg';

export default function Navbar() {
	const { logout, isPending } = useLogout();
	const { user } = useAuthContext();

	return (
		<nav className="navbar">
			<ul>
				<li className="logo">
					<img src={Temple} alt="SyncUp logo" />
					<span>
						<NavLink to="/">
							<span className="highlight-1">Sync</span>
							<span className="highlight-2">Up</span>
							{user ? (
								<div className="lil">Manage projects in your team</div>
							) : null}
						</NavLink>
						{/* <Navlink to="/">SyncU</Navlink> */}
					</span>
				</li>

				{user ? (
					<li>
						{isPending ? (
							<button className="btn" disabled>
								Logging out...
							</button>
						) : (
							<button className="btn" onClick={logout}>
								Logout
							</button>
						)}
					</li>
				) : (
					<>
						<li>
							<NavLink to="/login">Login</NavLink>
						</li>
						<li>
							<NavLink to="/signup">Signup</NavLink>
						</li>
					</>
				)}
				{/* <>
					<li>
						<NavLink to="/login">Login</NavLink>
					</li>
					<li>
						<NavLink to="/signup">Signup</NavLink>
					</li>
				</>
				<li>
					{isPending ? (
						<button className="btn" disabled>
							Logging out...
						</button>
					) : (
						<button className="btn" onClick={logout}>
							Logout
						</button>
					)} */}
				{/* </li> */}
			</ul>
		</nav>
	);
}
