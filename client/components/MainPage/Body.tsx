import style from "../../pages/styles/Main.module.scss";
import { useRouter } from "next/router";
import Axios from "axios";
import { useEffect, useState } from "react";

const Body  = () => {
  const router = useRouter();
  const [data,setData] = useState([])
  const newPostHandler = () => {
    Axios.get('http://localhost:4000/NewPost')
    .then(res => {
      setData(res.data)
    })
  }

  const newPostRenderHandler = () => {
    return data.map((post :any,index :number) => {
      return (
        <li
            onClick={() => {
              router.push("/PostDetailPage");
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
useEffect(newPostHandler,[])
  return (
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
  );
};

export default Body;
