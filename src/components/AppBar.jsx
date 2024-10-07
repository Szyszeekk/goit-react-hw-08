import { Navigation } from "./Navigation";
import { UserMenu } from "./UserMenu";
import { useSelector } from "react-redux";
import { AuthNav } from "./AuthNav";
import { selectIsLoggedIn } from "../redux/auth/selectors";
import css from "../css/AppBar.module.css";

export const AppBar = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <header className={css.header}>
      <Navigation />
      {isLoggedIn ? <UserMenu /> : <AuthNav />}
    </header>
  );
};
