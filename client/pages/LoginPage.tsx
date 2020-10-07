import Head from "next/head";
import { useRouter } from "next/router";
import { Header, LoginBody } from "./components/LoginPage";
const LoginPage = () => {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>Travel Story Login</title>
      </Head>
      <Header />
      <LoginBody />
    </>
  );
};

export default LoginPage;
