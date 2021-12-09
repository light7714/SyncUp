import { useState } from 'react';
import Avatar from '../../components/Avatar';
import { timestamp } from '../../firebase/config';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useFirestore } from '../../hooks/useFirestore';

import formatDistanceToNow from 'date-fns/formatDistanceToNow';

export default function ProjectComments({ project }) {
	const { updateDocument, response } = useFirestore('projects');
	const [newComment, setNewComment] = useState('');
	const { user } = useAuthContext();

	const handleSubmit = async (e) => {
		e.preventDefault();

		//createdAt field here as we are not adding a new document (Add a new document adds createdAt field in useFireStore hook), we're updating a doc (comments array)
		// for keys: https://codeburst.io/how-to-not-react-common-anti-patterns-and-gotchas-in-react-40141fe0dcd#76bd
		// math.random will generate new random no. each time so comp will be rendered again each time, so its not ideal
		const commentToAdd = {
			displayName: user.displayName,
			photoURL: user.photoURL,
			content: newComment,
			createdAt: timestamp.fromDate(new Date()),
			id: Math.random(),
		};
		// console.log(commentToAdd);

		await updateDocument(project.id, {
			comments: [...project.comments, commentToAdd],
		});

		if (!response.error) {
			setNewComment('');
		}
	};

	return (
		// project collection has real time listener set to it, so when new comment is added, we get new project collection (see Project -> useDocument)
		<div className="project-comments">
			<h4>Project Comments</h4>

			<ul>
				{project.comments.length > 0 ? (
					project.comments.map((comment) => (
						<li key={comment.id}>
							<div className="comment-author">
								<Avatar src={comment.photoURL} />
								<p>{comment.displayName}</p>
							</div>
							<div className="comment-date">
								{/* 1st arg is date obj, from where we wanna calc distance to now, 2nd arg is options */}
								{/* addsuffix adds a word at end (2 days -> 2 days ago) */}
								<p>
									{formatDistanceToNow(
										comment.createdAt.toDate(),
										{
											addSuffix: true,
										}
									)}
								</p>
							</div>
							<div className="comment-content">
								<p>{comment.content}</p>
							</div>
						</li>
					))
				) : (
					<p>No comments here</p>
				)}
			</ul>

			<form className="add-comment" onSubmit={handleSubmit}>
				<label>
					<span>Add new comment:</span>
					<textarea
						required
						onChange={(e) => {
							setNewComment(e.target.value);
						}}
						value={newComment}
					></textarea>
				</label>
				<button className="btn">Add Comment</button>
			</form>
		</div>
	);
}
