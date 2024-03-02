// interface PostContainerProps {

import { useEffect, useState } from "react";
import { postAPI } from "../services/PostService";
import PostItem from "./PostItem";

// }

const PostContainer = () => {
  const [limit, setLimit] = useState(10);
  const {
    data: posts,
    error,
    isLoading,
    refetch,
  } = postAPI.useFetchAllPostsQuery(limit, { pollingInterval: 1000 });

  // useEffect(() => {
  //   setTimeout(() => {
  //     setLimit(2);
  //   }, 2000);
  // }, []);

  return (
    <div className="post__list">
      {/* <button onClick={() => refetch()}>REFETCH</button> */}
      {isLoading && <h1>Идет загрузка</h1>}
      {error && <h1>Не ругайся мана</h1>}
      {posts && posts.map((post) => <PostItem key={post.id} post={post} />)}
    </div>
  );
};

export default PostContainer;
