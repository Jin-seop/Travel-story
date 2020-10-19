import Head from "next/head";
import { useRouter } from "next/router";
import { Header, EditContent } from "../components/PostPage";

const EditContentPage = () => {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>Travel Story</title>
      </Head>
      <Header />
      <EditContent />
    </>
  );
};

export default EditContentPage;
