import Axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import style from "../../pages/styles/LoginPage.module.scss";
const SignUpBody = () => {
  const [name,setName] = useState('')
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  
  const signUpHandler = () => {
    if(name.length < 6) {
      return alert('name을 5자 이상 입력해 주세요')
    }
    if(password.length < 9){
      return alert('password를 8자 이상 입력해 주세요')
    }
    Axios.post('http://localhost:4000/signup',{
      username:name,
      password,
      email
    }).then(res => {
      if(res.status === 201){
        return router.push('/LoginPage')
      }
    }).catch(err => alert('입력이 잘 못되었습니다.'))
  }

  const router = useRouter();
  return (
    <div className={style.LoginBodyContainer}>
      <div className={style.LoginContainer}>
        <p>회원가입</p>
        <form>
          <input type="name" placeholder="Name 5자 이상 입력" onChange={(e) => {
            e.preventDefault()
            setName(e.target.value)
          }} />
          <input type="email" placeholder="Email" onChange={(e) => {
            e.preventDefault()
            setEmail(e.target.value)
          }} />
          <input type="password" placeholder="Password 8자 이상 입력" onChange={(e) => {
            e.preventDefault()
            setPassword(e.target.value)
          }} />
          <button onClick={(e) => {
            e.preventDefault()
            signUpHandler()}} >회원가입</button>
        </form>
        <div>
          <a
            onClick={() => {
              router.push("/LoginPage");
            }}
          >
            회원이 이신가요?
          </a>
          <a
            onClick={() => {
              router.push("/PasswordPage");
            }}
          >
            비밀번호 찾기
          </a>
        </div>
      </div>
    </div>
  );
};

export default SignUpBody;
