import classes from "./style.module.scss";

const Header = ({ children }) => <h1 className={classes.Header}>{children}</h1>;

export default Header;
