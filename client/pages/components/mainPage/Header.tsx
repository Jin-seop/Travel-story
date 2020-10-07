import styles from "../../styles/Main.module.scss";
import { useRouter } from "next/router";

const Header = () => {
  const router = useRouter();
  return (
    <div className={styles.Header}>
      <img src="/TravelStoryicon.png" alt="logo" />
      <div className={styles.ulContainer}>
        <ul>
          <li
            onClick={() => {
              router.push("/LoginPage");
            }}
          >
            로그인
          </li>
          <li
            onClick={() => {
              router.push("/SignUpPage");
            }}
          >
            회원가입
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
