import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  ACCOUNT_DELETED,
} from '../actions/types';

const initialState = {
  // ? Tương tự như cookie, HTML5 hỗ trợ LocalStorage
  // ? là một loại lưu trữ web cho phép các trang web và ứng dụng Javascript lưu trữ và truy cập dữ liệu ngay trong trình duyệt
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  loading: true,
  user: null,
};

const authReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case USER_LOADED:
      return {
        // ? state is immutable so we have to include any other state that's already there
        // ? => using ...state
        // ? and return it as the new initialState with isAuthenticated,loading,user changed
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload,
      };
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem('token', payload.token);
      return {
        // ? state is immutable so we have to include any other state that's already there
        // ? => using ...state
        // ? and return it as the new initialState with isAuthenticated,loading,user changed
        ...state,
        ...payload,
        // ? or token: payload.token,
        isAuthenticated: true,
        loading: false,
      };
    // ? AUTH_ERROR and REGISTER_FAIL have the same
    case AUTH_ERROR:
    case REGISTER_FAIL:
    case LOGIN_FAIL:
    case LOGOUT:
    case ACCOUNT_DELETED:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
      };
    default:
      return state;
  }
};

export default authReducer;
