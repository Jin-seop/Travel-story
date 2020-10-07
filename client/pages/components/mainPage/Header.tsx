import styles from "../../styles/Main.module.scss";

const Header = () => {
  return (
    <div className={styles.Header}>
      <img src="/TravelStoryicon.png" alt="logo" />
      <div className={styles.ulContainer}>
        <ul>
          <li>로그인</li>
          <li>회원가입</li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
