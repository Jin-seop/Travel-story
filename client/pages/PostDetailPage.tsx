import Head from "next/head";
import { useRouter } from "next/router";
import { Header, DetailBody } from "./components/PostPage";

const PostDetailPage = () => {
  const router = useRouter();
  return (
    <div>
      <Head>
        <title>Travel Story</title>
      </Head>
      <Header />
      <DetailBody />
    </div>
  );
};

export default PostDetailPage;
