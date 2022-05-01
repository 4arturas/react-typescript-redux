import {postAPI} from "../store/services/PostService";
import PostItem from "./PostItem";
import {useEffect, useState} from "react";
import {IPost} from "../store/models/IPost";

const PostContainer = () => {

    const [limit, setLimit] = useState(10);

    const { data: posts, error, isLoading, refetch} = postAPI.useFetchAllPostsQuery(limit
    // , { pollingInterval: 1000 }
    );

    const [createPost, {error: createError, isLoading: isCreateLoading}] = postAPI.useCreatePostMutation();

    const [updatePost, {}] = postAPI.useUpdatePostMutation();
    const [deletePost, {}] = postAPI.useDeletePostMutation();

    useEffect(() => {
        setTimeout(() => {
            setLimit(4);
        }, 3000);
    }, []);

    const handleCreate = async () =>
    {
        const title = prompt();
        await createPost({title, body: title} as IPost)
    }

    const handleRemove = async (post: IPost) =>
    {
        deletePost(post);
    }

    const handleUpdate = async (post: IPost) =>
    {
        updatePost(post);
    }

    return <div>
        <button onClick={handleCreate}>Add Post</button>
        <button onClick={e=>{ setLimit(15); refetch(); }}>Refetch</button>
        {isLoading && <h1 style={{color:"green"}}>Loading...</h1>}
        {error && <h1 style={{color:"red"}}>Error</h1>}
        { posts && posts.map( p=> <PostItem key={p.id} post={p} remove={handleRemove} update={handleUpdate}/> ) }
    </div>
}

export default PostContainer