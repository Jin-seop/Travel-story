//액션
export const LOGINCHECK = 'logincheck';
export const LOGOUTCHECK = 'logoutcheck';
//액션 생성 함수
export const loginCheck = () => {
	return {
		type: LOGINCHECK
	};
};
export const logoutClick = () => {
	return {
		type: LOGOUTCHECK
	};
};
// 초기 값
const initialStore = { isLogin: false };
// 리듀서 함수
const loginStatus = (state = initialStore, action) => {
	switch (action.type) {
		case LOGINCHECK: {
			return {
				 ...state, 
				 isLogin: true 
				}
			}
		case LOGOUTCHECK: {
			return { 
				...state, 
				isLogin: false 
			}
		}
		default: {
			return state;
		}
	}
};

export default loginStatus;