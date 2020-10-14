import styles from "../../pages/styles/PostPage.module.scss";
import { useRouter } from "next/router";
import { Link } from "react-router-dom";

const Header = () => {
  const router = useRouter();
  return (
    <div className={styles.Header}>
      <Link to="/">
      <img src="/TravelStoryicon.png" alt="logo" />
      </Link>
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
              router.push("/");
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
