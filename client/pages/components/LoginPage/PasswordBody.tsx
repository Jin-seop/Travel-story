import { useRouter } from "next/router";
import style from "../../styles/LoginPage.module.scss";

const PasswordBody = () => {
  const router = useRouter();
  return (
    <div className={style.LoginBodyContainer}>
      <div className={style.LoginContainer}>
        <p>비밀번호 찾기</p>
        <h4>이메일을 입력해주시면 초기화된 비밀번호가 발송됩니다.</h4>
        <form>
          <input placeholder="Email" type="email" />
          <button>비밀번호 초기화</button>
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
