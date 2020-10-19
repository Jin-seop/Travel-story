import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import style from "../../pages/styles/LoginPage.module.scss";
import Axios from "axios";
import {useSelector} from "react-redux";

const MypageBody = () => {
  const route = useRouter();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const username = useSelector((state) => state.userName);

  const handleMyInfo = (e) => {
    e.preventDefault();
    Axios.put("http://localhost:4000/editUser", {
      email: email,
      password: password
    })
      .then(() => {
        alert('수정이 완료되었습니다')
        route.push('/')
      })
      .catch((err) => { console.log(err) })
  }

  return (
    <div className={style.LoginBodyContainer}>
    <div className={style.LoginContainer}>
      <p>{`${username}님 정보를 입력해 주세요 :)`}</p>
      <form>
        <div>현재 이메일 주소를 입력해 주세요</div>
        <input placeholder="Email" type="email" onChange={(e) => {
          e.preventDefault()
          setEmail(e.target.value)
        }} />
        <div>새로운 비밀번호를 입력해 주세요</div>
        <input placeholder="Password" type="password" onChange={(e) => {
          e.preventDefault()
          setPassword(e.target.value)
        }} />
        <button onClick={handleMyInfo}>정보 수정</button>
      </form>
    </div>
  </div>
  )
}

export default MypageBody;
