// interface PostContainerProps {

import { postAPI } from "../store/services/post";
import PostItem from "./PostItem";

// }

const PostContainer2 = () => {
  const { data: posts, error, isLoading } = postAPI.useFetchAllPostsQuery(5);
  return (
    <div className="post__list">
      {isLoading && <h1>Идет загрузка</h1>}
      {error && <h1>Не ругайся мана</h1>}
      {/* {posts && posts.map((post) => <PostItem key={post.id} post={post} />)} */}
    </div>
  );
};

export default PostContainer2;
