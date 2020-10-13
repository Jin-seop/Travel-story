import ReactDOM from 'react-dom';
import Axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import GoogleLogin from 'react-google-login';
import googleClient from '../../pages/config/google.json'
import style from "../../pages/styles/LoginPage.module.scss";

const LoginBody = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter();

  // 일반 로그인 함수
  const loginHandler = () => {
    if (!email) {
      return alert('email을 입력해주세요')
    }
    if (!password) {
      return alert('password를 입력해주세요')
    }
    Axios.post('http://localhost:4000/login', {
      email,
      password
    }).then(res => {
      if (res.status === 200) {
        alert('로그인 되었습니다.')
        return router.push({
          pathname: '/', query: {
            isLogin: true
          }
        })
      }
    })
      .catch(err => alert('입력이 잘 못되었습니다'))
  }


  // 구글 로그인 함수
  const responseGoogle = (user) => {
    Axios.post('http://localhost:4000/googleLogin', {
      email: user.ot.Xt,
      username: user.ot.Ad,
    }).then(res => {
      localStorage.setItem('token', res.data)
      if (res.status === 200) {
        alert('로그인 되었습니다.')
        return router.push({
          pathname: '/', query: {
            isLogin: true
          }
        })
      }
    })
  }



  return (
    <div className={style.LoginBodyContainer}>
      <div className={style.LoginContainer}>
        <p>로그인</p>
        <form>
          <input placeholder="Email" type="email" onChange={(e) => {
            e.preventDefault()
            setEmail(e.target.value)
          }} />
          <input placeholder="Password" type="password" onChange={(e) => {
            e.preventDefault()
            setPassword(e.target.value)
          }} />
          <button onClick={e => {
            e.preventDefault()
            loginHandler()
          }} >로그인</button>
        </form>
        <GoogleLogin
          clientId={googleClient.web.client_id}
          buttonText="Google Login"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={'single_host_origin'}
        />

        <div>
          <a
            onClick={() => {
              router.push("/SignUpPage");
            }}
          >
            회원이 아니신가요?
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

export default LoginBody;
