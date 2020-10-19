import Head from "next/head";
import { useRouter } from "next/router";
import { Header, MypageBody } from "../components/LoginPage";
const Mypage = () => {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>Travel Story Login</title>
      </Head>
      <Header />
      <MypageBody />
    </>
  );
};

export default Mypage;
