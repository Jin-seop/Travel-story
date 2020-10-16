import style from "../../pages/styles/PostPage.module.scss";
import Axios from "axios";
import {useState} from "react";
import { useSelector } from 'react-redux';
import { useRouter } from "next/router";

const Body = () => {
const [title, setTitle] = useState("");
const token = localStorage.getItem('token');
const username = useSelector((state) => state.userName);
const router = useRouter();

  const handleTitle = (e) => {
    setTitle(e.target.value);
  }

  const postContent = () => {
    Axios.post("http://localhost:4000/addPost", {
      token : token,
      username : username,
      title: title
    })
    .then(res => {
      alert('글 작성이 완료되었습니다')
      router.push('/');
    })
    .catch(err => console.log(err))
  } 

  return (
    <div className={style.postDetilBodyContainer}>
      <img
        src="https://user-images.githubusercontent.com/58946982/95218769-99197680-082f-11eb-860f-9dea84cdd34f.png"
        alt="#"
      />
      <p>사진을 클릭하시면 추가할 수 있습니다.</p>
      <form>
        <input placeholder="제목" onChange={handleTitle}/>
        <input placeholder="태그" />
      </form>
      <ul>
        <li>태그</li>
        <li>태그</li>
      </ul>
      <button onClick={postContent}>글 작성하기</button>
    </div>
  );
};

export default Body;