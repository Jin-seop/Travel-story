import classes from "./style.module.scss";
import { useRouter } from "next/router";
import Head from "next/head";

const Home = () => {
  const router = useRouter();
  return (
    <div className={classes.Home}>
      <Head>
        <title>Travel Story</title>
      </Head>
      mainPage
    </div>
  );
};

export default Home;
