import Axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import style from "../../pages/styles/LoginPage.module.scss";

const LoginBody = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter();

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
        return router.push({ pathname: '/', query: { isLogin: true } })
      }
    })
      .catch(err => alert('입력이 잘 못되었습니다.'))
  }

  const googleLogin = () => {
    Axios.get('http://localhost:4000/auth/google', {
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    })
      .then(res => console.log(res)).catch(err => console.error(err))
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
        <img
          src="https://developers.google.com/identity/images/btn_google_signin_dark_normal_web.png?hl=ko"
          alt="GoogleLogin"
          onClick={googleLogin}
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
