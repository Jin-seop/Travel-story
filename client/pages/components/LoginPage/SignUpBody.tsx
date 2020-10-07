import { useRouter } from "next/router";
import style from "../../styles/LoginPage.module.scss";

const SignUpBody = () => {
  const router = useRouter();
  return (
    <div className={style.LoginBodyContainer}>
      <div className={style.LoginContainer}>
        <p>회원가입</p>
        <form>
          <input type="name" placeholder="Name" />
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <button>회원가입</button>
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
