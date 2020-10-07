import Head from "next/head";
import { useRouter } from "next/router";

const SignUpPage = () => {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>Travel Story</title>
      </Head>
      <div>SignUpPage</div>
    </>
  );
};

export default SignUpPage;
