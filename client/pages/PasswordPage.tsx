import Head from "next/head";
import { useRouter } from "next/router";
import { Header } from "./components/LoginPage";

const PasswordPage = () => {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>Travel Story</title>
      </Head>
      <Header />
      <div>PasswordPage</div>
    </>
  );
};

export default PasswordPage;
