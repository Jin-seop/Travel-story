import { useRouter } from "next/router";
import { useState } from "react";
import style from "../../pages/styles/LoginPage.module.scss";
import Axios from "axios";

// 비밀번호 찾는 컴포넌트
const PasswordBody = () => {
  const router = useRouter();
  const [searchEmail, setSearchEmail] = useState("");

  const handleEmail = (e) => {
    setSearchEmail(e.target.value);
  }

  const resetPassword = (e) => {
    e.preventDefault();
    Axios.put("http://localhost:4000/forgetPassword", {
      email: searchEmail
    })
    .then(res => {
      alert("임시 비밀번호를 전송했습니다!")
    })
    .catch(err => console.log(err));
  }

   return (
    <div className={style.LoginBodyContainer}>
      <div className={style.LoginContainer}>
        <p>비밀번호 찾기</p>
        <h4>이메일을 입력해주시면 초기화된 비밀번호가 발송됩니다.</h4>
        <form>
          <input placeholder="Email" value={searchEmail} onChange={handleEmail} />
          <button onClick={resetPassword}>비밀번호 초기화</button>
        </form>
        <div>
          <a
            onClick={() => {
              router.push("/LoginPage");
            }}
          >
            이미 회원이 이신가요?
          </a>
          <a
            onClick={() => {
              router.push("/SignUpPage");
            }}
          >
            회원이 아니신가요?
          </a>
        </div>
      </div>
    </div>
  );
};

export default PasswordBody;
