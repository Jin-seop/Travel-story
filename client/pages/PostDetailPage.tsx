
import Axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Header } from "../components/PostPage";
import style from "./styles/PostDetailPage.module.scss";
import { useSelector } from "react-redux";
import io from 'socket.io-client'



const PostDetailPage = () => {
  const router = useRouter();
  const [userName, setUserName] = useState<String>('')
  const [image, setImage] = useState<Object>()
  const [title, setTitle] = useState<String>('')
  const [tag, setTag] = useState<Object>()
  const [created, setCreated] = useState<String>('');
  const username = useSelector((state) => state.userName);

  // 게시글 상세 정보를 불러오는 함수
  const postHandler = () => {
    Axios.post('http://localhost:4000/post', {
      id: router.query.id
    }).then(res => {
      console.log(res);
      if (res.status === 200) {
        setUserName(res.data.username)
        setTitle(res.data.contents[0].title)
        setImage(res.data.contents[0].images)
        setTag(res.data.contents[0].tags)
        setCreated(res.data.contents[0].created_at);
      }
    })
  }

  // 태그를 불러오는 함수
  const tagHandler = () => {
    if (tag) {
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
  }

  //게시글을 삭제하는 함수
  const deleteContent = () => {
    Axios.post("http://localhost:4000/post", {
      title: title,
      created_at: created
    })
      .then(res => {
        console.log(res)
        router.push("/");
      })
      .catch(err => { console.log(err) })
  }

  useEffect(() => postHandler(), [router.query.id])
  //채팅 하는 함수

  const chatHandler = () => {

    var socket = io('http://localhost:4000', {
      path: '/socket.io', // 서버 사이드의 path 설정과 동일해야 한다
      transports: ['websocket'] // websocket만을 사용하도록 설정
    });
    socket.emit('message-all', '공지')
  }

  useEffect(() => postHandler(), [])

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
                  onClick={deleteContent}
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
          <form className={style.inputArea}>
            <input placeholder="대화를 입력해주세요" />
            <button onClick={e => {
              e.preventDefault()
              chatHandler()
            }} >Send</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PostDetailPage;
