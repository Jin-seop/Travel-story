import Header from "~/components/header";
import classes from "./style.module.scss";

const HomePage = () => {
  return (
    <div className={classes.HomePage}>
      <Header> Next App </Header>
      Welcome!
    </div>
  );
};

export default HomePage;
