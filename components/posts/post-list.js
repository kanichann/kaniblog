import PostItem from "./posts-item";
function PostList(props) {
    return (
        // <ul className='flex justify-around mb-12 gap-12'>
        //     {props.posts.map((post) => (
        //         <PostItem key={post.slug} post={post}/>
        //     ))}
        // </ul>
        <ul className='grid grid-cols-3 mb-12 gap-x-12 gap-y-8 md:grid-cols-1 '>
            {props.posts.map((post) => (
                <PostItem key={post.slug} post={post}/>
            ))}
        </ul>
    )

}
export default PostList;