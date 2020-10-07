import Head from "next/head";
import { useRouter } from "next/router";
import { Header, PasswordBody } from "./components/LoginPage";

const PasswordPage = () => {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>Travel Story</title>
      </Head>
      <Header />
      <PasswordBody />
    </>
  );
};

export default PasswordPage;
