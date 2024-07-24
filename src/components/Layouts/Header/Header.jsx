import { useDispatch } from "react-redux";
import "./Header.css";
import { resetStore, resetUsername } from "../../../store/store";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onClickHandler = () => {
    dispatch(resetStore());
    dispatch(resetUsername());
    navigate("/");
  };
  
  return (
    <header className="header__container">
      <h1 onClick={onClickHandler}>Github API</h1>
    </header>
  );
};

export default Header;