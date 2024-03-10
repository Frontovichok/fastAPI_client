import { useSelector } from "react-redux";
import { selectCurrentUser } from "../auth/AuthSlice";

const ProfilePage = () => {
  let [user] = useSelector(selectCurrentUser);
  return (
    <div>
      <div>Профиль</div>
      <div>ГЫЫЫыыыыыууууууъъъ</div>
      <p>{user.username}</p>
      <p>{user.email}</p>
      <p>{user.first_name}</p>
      <p>{user.birthdate}</p>
      <p>{user.registered_at}</p>
    </div>
  );
};

export default ProfilePage;
