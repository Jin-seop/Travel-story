import styles from "../../styles/PostPage.module.scss";
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
            내 글보기
          </li>
          <li
            onClick={() => {
              router.push("/SignUpPage");
            }}
          >
            마이페이지
          </li>
          <li
            onClick={() => {
              router.push("/SignUpPage");
            }}
          >
            로그아웃
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
