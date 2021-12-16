import PostItem from './postItem';

function PostLists(props) {
	return (
		<div>
			{props.posts.map((post) => (
				<PostItem
					owner={post.owner}
					createdAt={post.createdAt}
					description={post.description}
					index={post.id}
					postId={post._id}
					key={post.id}
				/>
			))}
			{props.children}
		</div>
	);
}

export default PostLists;
