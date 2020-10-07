import style from "../../styles/LoginPage.module.scss";

const LoginBody = () => {
  return (
    <div className={style.LoginBodyContainer}>
      <div className={style.LoginContainer}>
        <p>로그인</p>
        <form>
          <input placeholder="Email" type="email" />
          <input placeholder="Password" type="password" />
          <button>로그인</button>
        </form>
        <img
          src="https://developers.google.com/identity/images/btn_google_signin_dark_normal_web.png?hl=ko"
          alt="GoogleLogin"
        />
      </div>
    </div>
  );
};

export default LoginBody;
