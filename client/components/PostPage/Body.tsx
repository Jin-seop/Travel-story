import style from "../../pages/styles/PostPage.module.scss";

const Body = () => {
  return (
    <div className={style.postDetilBodyContainer}>
      <img
        src="https://user-images.githubusercontent.com/58946982/95218769-99197680-082f-11eb-860f-9dea84cdd34f.png"
        alt="#"
      />
      <p>사진을 클릭하시면 추가할 수 있습니다.</p>
      <form>
        <input placeholder="제목" />
        <input placeholder="태그" />
      </form>
      <ul>
        <li>태그</li>
        <li>태그</li>
      </ul>
      <button>글 작성하기</button>
    </div>
  );
};

export default Body;
