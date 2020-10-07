import Head from "next/head";
import { useRouter } from "next/router";

const PostDetailPage = () => {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>Travel Story</title>
      </Head>
      <div>PostDetailPage</div>
    </>
  );
};

export default PostDetailPage;
