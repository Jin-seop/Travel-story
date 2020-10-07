import Head from "next/head";
import { useRouter } from "next/router";
import { Header, Body } from "./components/PostPage";

const PostPage = () => {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>Travel Story</title>
      </Head>
      <Header />
      <Body />
    </>
  );
};

export default PostPage;
