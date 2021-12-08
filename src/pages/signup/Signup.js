import { useState } from 'react';
import { useSignup } from '../../hooks/useSignup';

// styles
import './Signup.css';

export default function Signup() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [displayName, setDisplayName] = useState('');
	const [thumbnail, setThumbnail] = useState(null);
	const [thumbnalError, setThumbnailError] = useState(null);
	const { signup, isPending, error } = useSignup();

	const handleSubmit = (e) => {
		e.preventDefault();
		// console.log(email, password, displayName, thumbnail);
		signup(email, password, displayName, thumbnail);
	};

	const handleFileChange = (e) => {
		setThumbnail(null);

		// array of files, but mul files not allowed, so 1st ele
		// when no file selected and cancel clicked, it is undefined
		let selected = e.target.files[0];
		console.log(selected);

		if (!selected) {
			setThumbnail('Please select a file');
			return;
		}
		// if the type property doesnt include image
		if (!selected.type.includes('image')) {
			setThumbnailError('Selected file must be an image!');
			return;
		}
		if (selected.size > 100000) {
			setThumbnailError('Image file size must be less than 100kb');
			return;
		}

		setThumbnailError(null);
		setThumbnail(selected);
		console.log('Thumbnail updated');
	};

	return (
		<form onSubmit={handleSubmit} className="auth-form">
			<h2>Sign up</h2>
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
			<label>
				<span>Display Name:</span>
				<input
					required
					type="text"
					onChange={(e) => setDisplayName(e.target.value)}
					value={displayName}
				/>
			</label>
			<label>
				<span>Profile thumbnail:</span>
				<input required type="file" onChange={handleFileChange} />
			</label>
      
			{thumbnalError ? (
				<div className="error">{thumbnalError}</div>
			) : null}
			{isPending ? (
				<button disabled className="btn">
					Loading...
				</button>
			) : (
				<button className="btn">Sign up</button>
			)}
			{error ? <div className="error">{error}</div> : null}
		</form>
	);
}
