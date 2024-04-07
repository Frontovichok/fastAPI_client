import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../features/auth/AuthSlice";
import "./Logo.scss";
import { Link } from "react-router-dom";

function Logo() {
  let [user] = useSelector(selectCurrentUser);
  return (
    <div className="content">
      <Link className="link" to="/">
        <p className="text">ЛСПО</p>
        {/* <p className="text_slogan">АНО "Институт инженерной физики"</p> */}
      </Link>
    </div>
  );
}

export default Logo;
