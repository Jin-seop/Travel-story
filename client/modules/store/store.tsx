import { useMemo } from 'react';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

//액션
export const LOGINCHECK = 'logincheck';
export const LOGOUTCHECK = 'logoutcheck';
export const USERINFO = 'USERINFO';
export const USEREMAIL = 'USEREMAIL';

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
export const setUserInfo = (data) => {
	return {
    type: USERINFO,
    data: data
	};
};

let store

//초기값
const initialState = { 
  isLogin: false,
  email: null,
  userName: null,
 };

//리듀서 함수
const loginStatus = (state = initialState, action) => {
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
    case USERINFO:
			return {
        userName: action.data.username,
        email: action.data.email
      }
    default: {
      return state;
    }
  }
};

//스토어 생성
function initStore(preloadedState = initialState) {
  return createStore(
    loginStatus,
    preloadedState,
    composeWithDevTools(applyMiddleware())
  )
}

export const initializeStore = (preloadedState) => {
  let _store = store ?? initStore(preloadedState)
  if (preloadedState && store) {
    _store = initStore({
      ...store.getState(),
      ...preloadedState,
    })
    store = undefined
  }

  if (typeof window === 'undefined') return _store
  if (!store) store = _store

  return _store
}

export function useStore(initialState) {
  const store = useMemo(() => initializeStore(initialState), [initialState])
  return store
}