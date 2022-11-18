import PostItem from './postItem';

function PostLists(props) {
	return (
		<div>
			{props.posts.map((post) => (
				<PostItem
					owner={post.owner}
					updatedAt={post.updatedAt}
					description={post.description}
					postId={post._id}
					key={post.id}
					name={props.name}
					getPost={props.getPostFunction}
				/>
			))}
		</div>
	);
}

export default PostLists;
