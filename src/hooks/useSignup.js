import { useState, useEffect } from 'react';
import {
	projectAuth,
	projectStorage,
	projectFirestore,
} from '../firebase/config';
import { useAuthContext } from './useAuthContext';

export const useSignup = () => {
	const [isCancelled, setIsCancelled] = useState(false);
	const [error, setError] = useState(null);
	const [isPending, setIsPending] = useState(false);
	const { dispatch } = useAuthContext();

	const signup = async (email, password, displayName, thumbnail) => {
		setError(null);
		setIsPending(true);

		try {
			// signup
			const res = await projectAuth.createUserWithEmailAndPassword(
				email,
				password
			);

			//network err
			if (!res) {
				throw new Error('Could not complete signup');
			}

			// upload user thumbnail

			//if folder doesnt exist on firebase storage, automatically creates one
			//every user has their own folder, named after their uid. The file stored there will be named after its own name (thumbnail.name) (its not folder name at end)
			const uploadPath = `thumbnails/${res.user.uid}/${thumbnail.name}`;
			// ref() takes reference to where we wanna store our file, i.e, the path. we pass the file to put there in put()
			const img = await projectStorage.ref(uploadPath).put(thumbnail);

			// the img we uploaded gets a url assigned to it for our use
			// img.ref gets us reference to that img in storage
			const imgUrl = await img.ref.getDownloadURL();

			// add display name and profile photo to user (supported by firebase)
			await res.user.updateProfile({ displayName, photoURL: imgUrl });

			// create a user document (to display all user statuses)

			//not using add() as it creates id automatically, but here we want id of doc == uid (of this user). doc() takes id of a doc, and we're passing uid, so it'll create reference to that doc with id = uid
			// projectFirestore.collection('users').doc(res.user.uid) makes the reference, set(), sets the properties of the doc (and thus create it)
			await projectFirestore.collection('users').doc(res.user.uid).set({
				online: true,
				displayName: displayName,
				photoURL: imgUrl,
			});

			// dispatch login action
			dispatch({ type: 'LOGIN', payload: res.user });

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

	return { signup, error, isPending };
};
