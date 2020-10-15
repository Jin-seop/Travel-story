import style from "../../pages/styles/LoginPage.module.scss";
import { useRouter } from "next/router";
// import Router from 'next/router'

const Header = () => {
  const router = useRouter();
  return (
    <div className={style.Header}>
      <img src="/TravelStoryicon.png" alt="logo" onClick={() => router.push('/')} />
    </div>
  );
};

export default Header;
