import style from "../../pages/styles/PostPage.module.scss";
import Axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { useRouter } from "next/router";

const EditContent = () => {
  const [title, setTitle] = useState("");
  const [newTag, setNewTag] = useState("");
  const [newTags, setNewTags] = useState([]);
  const [token, setToken] = useState("")
  const [img, setImg] = useState("");
  const username = useSelector((state) => {
    return state.userName
  });
  const router = useRouter();
  const [data, setData] = useState([])
  const [isLogin, setIsLogin] = useState('')
  const storeLogin = useSelector((state) => state.isLogin);
  console.log(storeLogin);
  console.log(data);

  const newPostHandler = () => {
    Axios.get('http://localhost:4000/NewPost')
      .then(res => {
        setData(res.data);
        setIsLogin(storeLogin);
      })
      .catch(err => {console.log(err)});
  }

  //태그 추가
  const handleTitle = (e) => {
    setTitle(e.target.value);
  }
  const handleNewTag = (e) => {
    setNewTag(e.target.value);
    e.target.value = "";
  }

  const handleNewTags = (e) => {
    if (e.key === "Enter") {
      setNewTags(() => {
        newTags.push(newTag);
        return newTags;
      });
      setNewTag("");
    }
  }

  //태그 삭제
  const handleTagList = (index) => {
    setNewTags(newTags.filter((x, i) => index !== i));
  };

  //새로운 글 작성
  const postContent = () => {
    Axios.post("http://localhost:4000/addPost", {
      token: token,
      username: username,
      title: title,
      tagName: newTags,
      imgName: img
    })
      .then(res => {
        alert('글 작성이 완료되었습니다')
        router.push('/');
      })
      .catch(err => console.log(err))
  }

  const handleImg = (e) => {
    setImg(e.target.files[0]);
  }

  useEffect(newPostHandler, [])
  useEffect(() => {
    setToken(localStorage.getItem('token'))
  }, [])

  return (
    <div className={style.postDetilBodyContainer}>
      <img
        src="https://user-images.githubusercontent.com/58946982/95218769-99197680-082f-11eb-860f-9dea84cdd34f.png"
        alt="#"
      />
      <p>사진을 클릭하시면 추가할 수 있습니다.</p>
      <input type="file" onChange={handleImg}></input>
      <form>
        <input
          placeholder="제목을 입력해주세요"
          type="text"
          onChange={handleTitle} />
        <input
          placeholder="태그 입력 후 'Enter'를 쳐주세요"
          type="text"
          value={newTag}
          onChange={handleNewTag}
          onKeyPress={handleNewTags} />
      </form>
      <ul>
        <div>추가된 태그 : </div>
        {newTags.map((list, index) => list === '' ?
          ('')
          : (
            <li key={index} onClick={() => {
              handleTagList(index);
            }}>{`#${list} `}
            </li>
          )
        )}
      </ul>
      <button onClick={postContent}>글 수정하기</button>
    </div>
  );
};

export default EditContent;

