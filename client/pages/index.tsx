import { useRouter } from "next/router";
import Head from "next/head";
import { Header, Body } from "./components/mainPage/";
import style from "./styles/Main.module.scss";

const Home = () => {
  const router = useRouter();
  return (
    <div>
      <Head>
        <title>Travel Story</title>
      </Head>
      <Header />
      <div className={style.serchContainer}>
        <h1>$명의 여행객들이 기록을 남겼습니다!</h1>
        <h2>로그인을 하고 기록을 남겨보세요!</h2>
        <form>
          <button>제목</button>
          <input />
        </form>
      </div>
      <Body />
    </div>
  );
};

export default Home;
