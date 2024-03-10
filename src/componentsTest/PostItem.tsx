import React, { FC } from "react";
import { IPost } from "../models/IPost";

interface PostItemProps {
  post: IPost;
  updatePost: (post: IPost) => void;
  deletePost: (post: IPost) => void;
}

const PostItem: FC<PostItemProps> = ({ post, updatePost, deletePost }) => {
  const handleUpdate = (event: React.MouseEvent) => {
    // event.preventDefault();
    let title = prompt() || "empty";
    updatePost({ ...post, title: title });
  };
  const handleDelete = (event: React.MouseEvent) => {
    event.stopPropagation();
    deletePost(post);
  };

  return (
    <div
      className="post"
      style={{ padding: "5px", border: "1px solid green", margin: "5px" }}
      onClick={handleUpdate}
    >
      {post.id}. {post.title}
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default PostItem;
