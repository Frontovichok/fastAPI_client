import { useSelector } from "react-redux";
import "./App.css";
import { useAppDispatch, useAppSelector } from "./hooks/redux";
import { userSlice } from "./store/reducers/UserSlice";
import { useEffect } from "react";
import { fetchUsers } from "./store/reducers/ActionCreators";
import PostContainer from "./componentsTest/PostContainer";
import PostContainer2 from "./componentsTest/PostContainer2";

function AppTest() {
  // const dispatch = useAppDispatch();
  // const { users, isLoading, error } = useAppSelector(
  //   (state) => state.userReducer
  // );

  // useEffect(() => {
  //   dispatch(fetchUsers());
  // }, []);

  return (
    <div className="App">
      {/* {isLoading && <h1>Идет загрузка</h1>}
      {error && <h1>{error}</h1>}
      {JSON.stringify(users, null, 2)} */}
      <div style={{ display: "flex" }}>
        <PostContainer />
        <PostContainer2 />
      </div>
    </div>
  );
}

export default AppTest;
