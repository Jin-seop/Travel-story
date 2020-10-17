import { useRouter } from "next/router";
import Head from "next/head";
import style from "./styles/Main.module.scss";
import { useEffect, useState } from "react";
import Axios from "axios";
import { useSelector, useDispatch } from 'react-redux';
import { logoutClick, loginCheck } from "../modules/store/store"

const Home = () => {
  const [tagSerch, setTagSerch] = useState(false)
  const [data, setData] = useState([])
  const [isLogin, setIsLogin] = useState('')
  const router = useRouter();
  const dispatch = useDispatch();
  const storeLogin = useSelector((state) => state.isLogin);
  console.log(storeLogin);

  // 처음 화면 킬 때,최신글 받아오는 함수 
  const newPostHandler = () => {
    Axios.get('http://localhost:4000/NewPost')
      .then(res => {
        setData(res.data)
        setIsLogin(storeLogin);
      })
  }
  // 최신글을 화면에 뿌려주는 함수
  const newPostRenderHandler = () => {
    return data.map((post: any, index: number) => {
      return (
        <li
          onClick={() => {
            if (!isLogin) {
              return alert('로그인을 해주세요')
            }
            router.push({ pathname: '/PostDetailPage', query: { id: post.id, title: post.title, created_at: post.create_time } });
          }}
          key={post.id}
        >
          <div className={style.contentContainer}>
            <img
              src={post.images.length !== 0 ? post.images[0] : null}
              alt="#"
            />
            <div className={style.writeContainer}>
              <p>{post.title}</p>
            </div>
            <p>채팅인원: %%</p>
          </div>
        </li>
      )
    })
  }

  // 로그아웃 함수
  const logOutHandler = () => {
    localStorage.clear()
    dispatch(logoutClick());
  }

  // 화면을 처음 킬때 componetdidMount하는 함수
  useEffect(newPostHandler, [])
  useEffect(() => {
    if (router.query && router.query.isLogin) {
      dispatch(loginCheck());
    }
  }, [router.query.isLogin])

  return (
    <div>
      <Head>
        <title>Travel Story</title>
      </Head>
      <div className={style.Header}>
        <img src="/TravelStoryicon.png" alt="logo" />
        <div className={style.ulContainer}>
          {storeLogin ? <ul>
            <li
              onClick={() => {
                router.push("/PostPage");
              }}
            >
              새로운 글쓰기
          </li>
            <li
              onClick={() => {
                router.push("/LoginPage");
              }}
            >
              내 글 보기
          </li>
            <li
              onClick={() => {
                router.push("/SignUpPage");
              }}
            >
              정보수정
          </li>
            <li
              onClick={() => {
                logOutHandler()
              }}
            >
              로그아웃
          </li>

          </ul> : <ul>
              <li
                onClick={() => {
                  router.push("/LoginPage");
                }}
              >
                로그인
          </li>
              <li
                onClick={() => {
                  router.push("/SignUpPage");
                }}
              >
                회원가입
          </li>
            </ul>}

        </div>
      </div>
      <div className={style.serchContainer}>
        <h1>{data.length}명의 여행객들이 기록을 남겼습니다!</h1>
        <h2>로그인을 하고 기록을 남겨보세요!</h2>
        <form>
          <button onClick={(e) => {
            e.preventDefault()
            setTagSerch(!tagSerch)
          }} >{tagSerch ? "태그" : "제목"
            }
          </button>
          <input />
        </form>
      </div>
      <div>
        <div className={style.bodyContainer}>
          <div className={style.textContainer}>
            <p onClick={newPostHandler} >최신글</p>
            <div />
            <p  >채팅 많은 글</p>
          </div>
        </div>
        <div className={style.bodyContentContainer}>
          <ul>
            {data.length !== 0 ? newPostRenderHandler() : null}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Home;
