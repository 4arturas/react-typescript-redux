import {postAPI} from "../store/services/PostService";
import PostItem from "./PostItem";
import {IPost} from "../store/models/IPost";

const PostContainer2 = () => {

    const { data: posts, error, isLoading} = postAPI.useFetchAllPostsQuery(10);

    const [updatePost, {}] = postAPI.useUpdatePostMutation();
    const [deletePost, {}] = postAPI.useDeletePostMutation();

    const handleRemove = async (post: IPost) =>
    {
        deletePost(post);
    }

    const handleUpdate = async (post: IPost) =>
    {
        updatePost(post);
    }

    return <div>
        {isLoading && <h1 style={{color:"green"}}>Loading...</h1>}
        {error && <h1 style={{color:"red"}}>Error</h1>}
        { posts && posts.map( p=> <PostItem key={p.id} post={p} remove={handleRemove} update={handleUpdate}/> ) }
    </div>
}

export default PostContainer2