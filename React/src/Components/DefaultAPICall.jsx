import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getJobLevel,
  getJobPosition,
  getJobPost,
  getUserProfile,
} from "../store/APISlice";
import { useLocation } from "react-router-dom";

function DefaultAPICall() {
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch(getJobLevel());
    dispatch(getJobPosition());
    dispatch(getUserProfile());
    dispatch(getJobPost());
  }, []);

  useEffect(() => {
    if (location.pathname === "/home") {
      dispatch(getUserProfile());
      dispatch(getJobPost());
    }
  }, [location.pathname, dispatch]);

  useEffect(() => {
    if (location.pathname === "/viewjobpost") {
      dispatch(getJobPost());
    }
  }, [location.pathname, dispatch]);

  return null;
}

export default DefaultAPICall;
