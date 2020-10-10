import Head from "next/head";
import { useRouter } from "next/router";
import { Header } from "../components/PostPage";
import style from "./styles/PostDetailPage.module.scss";


const PostDetailPage = (props) => {
  const router = useRouter();
  console.log(router.query)
  return (
    <div>
      <Head>
        <title>Travel Story</title>
      </Head>
      <Header />
      
    <div className={style.bodyContainer}>
      <div className={style.textContainer}>
        <form>
          <a
            onClick={() => {
              router.push("/PostPage");
            }}
          >
            수정하기
          </a>
          <a
            onClick={() => {
              router.push("/");
            }}
          >
            삭제하기
          </a>
        </form>
        <div>
          <p>{router.query.title}</p>
          <p>게시자</p>
        </div>
        <div className={style.imgContainer}>
          <img
            src="https://user-images.githubusercontent.com/58946982/95218769-99197680-082f-11eb-860f-9dea84cdd34f.png"
            alt="img"
          />
        </div>
        <ul>
          <li>태그</li>
          <li>태그</li>
        </ul>
      </div>

      <div className={style.chatContainer}>
        <div className={style.chatArea} />
        <form>
          <input placeholder="대화를 입력해주세요" />
        </form>
      </div>
    </div>
    </div>
  );
};

export default PostDetailPage;
