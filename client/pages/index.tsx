import Header from "~/components/header";
import classes from "./style.module.scss";
import Head from "next/head";

const HomePage = () => {
  return (
    <div className={classes.HomePage}>
      <Head>
        <title>Travel Story</title>
        <link rel="icon" type="image/x-icon" href="../static/favicon.ico" />
      </Head>
      <Header> Next App </Header>
      Welcome!
    </div>
  );
};

export default HomePage;
