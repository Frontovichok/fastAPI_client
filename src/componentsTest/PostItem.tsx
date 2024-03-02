import { FC } from "react";
import { IPost } from "../models/IPost";

interface PostItemProps {
  post: IPost;
}

const PostItem: FC<PostItemProps> = ({ post }) => {
  return (
    <div
      className="post"
      style={{ padding: "5px", border: "1px solid green", margin: "5px" }}
    >
      {post.id}. {post.title}
      <button>Delete</button>
    </div>
  );
};

export default PostItem;
