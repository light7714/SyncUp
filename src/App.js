import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';

// styles
import './App.css';

// pages & components
import Dashboard from './pages/dashboard/Dashboard';
import Create from './pages/create/Create';
import Login from './pages/login/Login';
import Signup from './pages/signup/Signup';
import Project from './pages/project/Project';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import OnlineUsers from './components/OnlineUsers';

/*
pages we need

  dashboard
  login
  signup
  create projects page
  project (project details)
 */

function App() {
	const { user, authIsReady } = useAuthContext();

	return (
		<div className="App">
			{authIsReady ? (
				<BrowserRouter>
					{user ? <Sidebar /> : null}
					<div className="container">
						<Navbar />
						<Switch>
							<Route exact path="/">
								{user ? (
									<Dashboard />
								) : (
									<Redirect to="/login" />
								)}
							</Route>

							<Route path="/create">
								{user ? <Create /> : <Redirect to="/login" />}
							</Route>

							<Route path="/projects/:id">
								{user ? <Project /> : <Redirect to="/login" />}
							</Route>

							<Route path="/login">
								{!user ? <Login /> : <Redirect to="/" />}
							</Route>

							<Route path="/signup">
								{!user ? <Signup /> : <Redirect to="/" />}
							</Route>
						</Switch>
					</div>

					{user ? <OnlineUsers /> : null}
				</BrowserRouter>
			) : null}
		</div>
	);
}
export default App;
