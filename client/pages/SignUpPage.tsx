import Head from "next/head";
import { useRouter } from "next/router";
import { Header, SignUpBody } from "./components/LoginPage";

const SignUpPage = () => {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>Travel Story</title>
      </Head>
      <Header />
      <SignUpBody />
      <div>SignUpPage</div>
    </>
  );
};

export default SignUpPage;
