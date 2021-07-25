/* eslint-disable no-else-return */
/* eslint-disable import/prefer-default-export */
export const getAuth = () => {
  let results = '';
  let isSession = '';
  let authData = '';
  try {
    isSession = sessionStorage.getItem('__token __');
    authData = localStorage.getItem('__token__');
    if (isSession) {
      results = isSession;
      return {
        state: true,
        token: results
      };
    } else
    if (authData) {
      const data = authData;
      sessionStorage.setItem('__token__', data);
      results = sessionStorage.getItem('__token__');
      return {
        state: true,
        token: results
      };
    }
    return {
      state: false,
      token: ''
    };
  } catch (error) {
    return {
      state: false,
      token: ''
    };
  }
};
