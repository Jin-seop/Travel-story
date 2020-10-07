import Head from "next/head";
import { useRouter } from "next/router";

const LoginPage = () => {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>Travel Story Login</title>
      </Head>
      <div>Login</div>
    </>
  );
};

export default LoginPage;
