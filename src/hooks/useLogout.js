import { useEffect, useState } from 'react';
import { projectAuth, projectFirestore } from '../firebase/config';
import { useAuthContext } from './useAuthContext';

export const useLogout = () => {
	const [isCancelled, setIsCancelled] = useState(false);
	const [error, setError] = useState(null);
	const [isPending, setIsPending] = useState(false);
	const { dispatch, user } = useAuthContext();

	const logout = async () => {
		setError(null);
		setIsPending(true);

		try {
			//update online status

			// doing this before signing out as only current user can access their own document
			//can also get uid using projectAuth.currentUser
			//each user has uid property, so destructuring it from user
			const { uid } = user;
			// id of doc == uid
			await projectFirestore
				.collection('users')
				.doc(uid)
				.update({ online: false });

			// sign the user out
			await projectAuth.signOut();

			// dispatch logout action
			dispatch({ type: 'LOGOUT' });

			// update state
			if (!isCancelled) {
				setIsPending(false);
				setError(null);
			}
		} catch (err) {
			if (!isCancelled) {
				setError(err.message);
				setIsPending(false);
			}
		}
	};

	useEffect(() => {
		return () => setIsCancelled(true);
	}, []);

	return { logout, error, isPending };
};
