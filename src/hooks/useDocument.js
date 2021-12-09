//real time document data

import { useEffect, useState } from 'react';
import { projectFirestore } from '../firebase/config';

export const useDocument = (collection, id) => {
	const [document, setDocument] = useState(null);
	const [error, setError] = useState(null);

	// realtime data for the document
	useEffect(() => {
		// ref to document with id
		const ref = projectFirestore.collection(collection).doc(id);

		const unsub = ref.onSnapshot(
			(snapshot) => {
				// if we have data, then update states. we can receive empty obj as well when id is wrong
				if (snapshot.data()) {
					// console.log(snapshot.data());
					setDocument({ ...snapshot.data(), id: snapshot.id });
					setError(null);
				} else {
					setError('No such documents exists!');
				}
			},
			(err) => {
				console.log('Err in onSnapshot in useDocument:', err.message);
				setError('Failed to get document');
			}
		);

		return () => {
			unsub();
		};
	}, [collection, id]);

	return { document, error };
};
