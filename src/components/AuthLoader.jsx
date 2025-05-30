// src/components/AuthLoader.jsx
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { listenToAuthChanges } from "../reducer/LogingReducer"; // path as per structure

const AuthLoader = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listenToAuthChanges());
  }, [dispatch]);

  return null;
};

export default AuthLoader;
