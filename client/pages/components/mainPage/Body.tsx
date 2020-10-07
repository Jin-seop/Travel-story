import style from "../../styles/Main.module.scss";
import { useRouter } from "next/router";

const Body = () => {
  const router = useRouter();
  return (
    <div>
      <div className={style.bodyContainer}>
        <div className={style.textContainer}>
          <p>최신글</p>
          <div />
          <p>채팅 많은 글</p>
        </div>
      </div>
      <div className={style.bodyContentContainer}>
        <ul>
          <li
            onClick={() => {
              router.push("/PostDetailPage");
            }}
          >
            <div className={style.contentContainer}>
              <img src="#" alt="#" />
              <div className={style.writeContainer}>
                <p>-제목- alskmdasdasdsad</p>
                <p>-작성자- asdasdasdasd</p>
              </div>
              <p>채팅인원: %%</p>
            </div>
          </li>
          <li>
            <div className={style.contentContainer}>
              <img src="#" alt="#" />
              <div className={style.writeContainer}>
                <p>-제목- alskmdasdasdsad</p>
                <p>-작성자- asdasdasdasd</p>
              </div>
              <p>채팅인원: %%</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Body;
