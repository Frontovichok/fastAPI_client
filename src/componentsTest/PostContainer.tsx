// interface PostContainerProps {

import { useEffect, useState } from "react";
import { postAPI } from "../store/services/post";
import PostItem from "./PostItem";
import { IPost } from "../models/IPost";

// }

const PostContainer = () => {
  const [limit, setLimit] = useState(15);
  const {
    data: posts,
    error,
    isLoading,
    refetch,
  } = postAPI.useFetchAllPostsQuery(limit);
  // , { pollingInterval: 2000 }
  const [createPost, { error: createError, isLoading: isCreateLoading }] =
    postAPI.useCreatePostMutation();

  const handleCreate = async () => {
    const title = prompt();
    await createPost({ title, body: title } as IPost);
  };

  const [updatePost, {}] = postAPI.useUpdatePostMutation();
  const [deletePost, {}] = postAPI.useDeletePostMutation();

  const handleUpdate = (post: IPost) => {
    updatePost(post);
  };

  const handleDelete = (post: IPost) => {
    deletePost(post);
  };

  // useEffect(() => {
  //   setTimeout(() => {
  //     setLimit(2);
  //   }, 2000);
  // }, []);

  return (
    <div className="post__list flex flex-col">
      {/* <button onClick={() => refetch()}>REFETCH</button> */}
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <button onClick={handleCreate}>Add new post</button>
      {isLoading && <h1>Идет загрузка</h1>}
      {error && <h1>Не ругайся мана</h1>}
      {posts &&
        posts.map((post) => (
          <PostItem
            key={post.id}
            post={post}
            updatePost={handleUpdate}
            deletePost={handleDelete}
          />
        ))}
    </div>
  );
};

export default PostContainer;
