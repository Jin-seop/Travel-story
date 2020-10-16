import Axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Header } from "../components/PostPage";
import style from "./styles/PostDetailPage.module.scss";
import {useSelector} from "react-redux";

const PostDetailPage = () => {
  const router = useRouter();
  const [userName, setUserName] = useState<String>('')
  const [image, setImage] = useState<Object>()
  const [title, setTitle] = useState<String>('')
  const [tag, setTag] = useState<Object>()
  const username = useSelector((state) => state.userName);

  // 게시글 상세 정보를 불러오는 함수
  const postHandler = () => {
    Axios.post('http://localhost:4000/post', {
      id: router.query.id
    }).then(res => {
      if (res.status === 200) {
        setUserName(res.data.username)
        setTitle(res.data.contents[0].title)
        setImage(res.data.contents[0].images)
        setTag(res.data.contents[0].tags)
      }
    })
  }

  // 태그를 불러오는 함수
  const tagHandler = () => {
    let result = []
    for (let key in tag) {
      result.push([tag[key].id, tag[key].tagName])
    }
    return result.map(tag => {
      return (
        <li key={tag[0]}>{tag[1]}</li>
      )
    })
  }

  useEffect(() => postHandler(), [router.query.id])

  return (
    <div>
      <Head>
        <title>Travel Story</title>
      </Head>
      <Header />

      <div className={style.bodyContainer}>
        <div className={style.textContainer}>

          <form>
           {userName === username ? (
             <>
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
          </>
          )
        :
        ("")} 
         
          </form>
          <div>
            <p>제목 : {title}</p>
            <p>게시자 : {userName}</p>
          </div>
          <div className={style.imgContainer}>
            <img
              src="https://user-images.githubusercontent.com/58946982/95218769-99197680-082f-11eb-860f-9dea84cdd34f.png"
              alt="img"
            />
          </div>
          <ul>
            {tag ? tagHandler() : null}
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
