import { useState } from 'react';
import { useLogin } from '../../hooks/useLogin';

// styles
import './Login.css';

export default function Login() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const { login, error, isPending } = useLogin();

	const handleSubmit = (e) => {
		e.preventDefault();
		login(email, password);
	};

	return (
		//class auth-form is defined in signup.css, but these are not css modules, so styles will still apply (global)
		<form onSubmit={handleSubmit} className="auth-form">
			<h2>Login</h2>
			<label>
				<span>Email:</span>
				<input
					required
					type="email"
					onChange={(e) => setEmail(e.target.value)}
					value={email}
				/>
			</label>
			<label>
				<span>Password:</span>
				<input
					required
					type="password"
					onChange={(e) => setPassword(e.target.value)}
					value={password}
				/>
			</label>

			{isPending ? (
				<button disabled className="btn">
					Loading...
				</button>
			) : (
				<button className="btn">Login</button>
			)}
			{error ? <div className="error">{error}</div> : null}
		</form>
	);
}
