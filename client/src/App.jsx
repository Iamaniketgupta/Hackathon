import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import axiosInstance from './axiosConfig/axiosConfig';
import { useDispatch } from 'react-redux';
import { login } from './store/authSlice';

function App() {
  const token = localStorage.getItem('accessToken');
  const dispatch = useDispatch();

  const findUser = async () => {
    try {
      const res = await axiosInstance("/user/v/getCurrentUser");
      if (res) {
        return res?.data?.data;
      }
    } catch (error) {
      console.log("Error fetching user:", error);
      return null;
    }
  };

  const findRag = async () => {
    try {
      const res = await axiosInstance("/rp/get");
      if (res) {
        return res?.data?.data;
      }
      return null;
    } catch (error) {
      console.log("Error fetching ragpicker:", error);
      return null;
    }
  };

  const func = async () => {
    if (token) {
      const user = await findUser();
      const rag = await findRag();
      if (user) {
        const obj = {
          user: user,
          type: "user"
        };
        dispatch(login(obj));
      } else if (rag) {
        const obj = {
          user: rag,
          type: "ragpicker"
        };
        dispatch(login(obj));
      } else {
        console.log("No user or ragpicker found");
      }
    }
  };



  useEffect(() => {
    func();
  }, [token]); // Add token as a dependency

  return (
    <>
      <Outlet />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
