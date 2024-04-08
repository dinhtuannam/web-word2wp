import { Navigate, Outlet } from 'react-router-dom';

const getCookie = () => {
    const cookies = document.cookie.split(';'); 
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.startsWith('wp_tool_cookie=')) {
        return true;
      }
    }
    return false;
  }

const Auth = () => {
    const user = getCookie();
    console.log(user);
    return <Outlet />;
};

export default Auth;
