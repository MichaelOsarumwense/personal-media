import PostItem from './postItem';

function PostLists(props) {
	return (
		<div>
			{props.posts.map((post) => (
				<PostItem
					owner={post.owner}
					createdAt={post.createdAt}
					description={post.description}
				/>
			))}
		</div>
	);
}

export default PostLists;
