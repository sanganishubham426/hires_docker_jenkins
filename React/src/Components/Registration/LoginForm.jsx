import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Link } from "react-router-dom";
import { FetchAPI, generateTokenAPI, loginAPI, resendOTPForEmailVerificationAPI } from "../../api";
import { useNavigate } from "react-router-dom";
import { errorToast, successToast } from "../../store/Slice";
import clsx from "clsx";
import { useDispatch } from "react-redux";

function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const formSubmit = async (formData) => {
    setIsLoading(true);
    try {
      const { data } = await FetchAPI(loginAPI(), "POST", formData);

      if (data?.Status === "success") {
        successToast(data.Message);
        localStorage.setItem("recruiterID", data.Data.recruiter_user_id);
        navigate("/home");
      } else {
        errorToast(data?.Message);
      }

      if (data?.Message === "Account is not verified") {
        localStorage.setItem("recruiterID", data.Data.recruiter_user_id);
        const res = await FetchAPI(resendOTPForEmailVerificationAPI(), "POST", {
          id: data.Data.recruiter_user_id
        });
        successToast("Verification code is sent to your email. Kindly check it out");
        navigate("/email-verification");
      }

      const token = await FetchAPI(generateTokenAPI(), "POST", {
        username: formData.email.split('@')[0],
        password: formData.password
      });
      if(token?.res?.status === 200){
        localStorage.setItem("refreshToken", token.res.data.refresh)
      }

    } catch (error) {
      console.log("Error in Login API", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="bg-white h-[70vh] lg:h-[calc(100vh-5rem)] rounded-xl px-5 md:px-10 lg:px-20 flex flex-col justify-center items-center">
        <div className="w-full ">
          <h4 className="text-3xl font-bold text-center">Log In</h4>
          <div className="mt-8 text-center p-3 text-[#8893E0] capitalize bg-[#8893E0]/10 rounded-full w-full">
            welcome to <span className="font-bold"> HIRES! </span> enter your
            credentials to login.
          </div>
          <form action="" className="mt-8" onSubmit={handleSubmit(formSubmit)}>
            <div>
              <label htmlFor="">Email</label>
              <input
                type="email"
                name="email"
                className="w-full rounded-full border border-gray-300 ps-4 p-2 mt-2 focus:outline-none"
                placeholder="enter your email"
                {...register("email", { required: true })}
              />
              {errors.email && (
                <p className="text-red-600">Email is Required.</p>
              )}
            </div>
            <div className="mt-8">
              <label htmlFor="">Password</label>
              <input
                type="password"
                name="password"
                className="w-full rounded-full border border-gray-300 ps-4 p-2 mt-2 focus:outline-none"
                placeholder="enter your password"
                {...register("password", { required: true })}
              />
              {errors.password && (
                <p className="text-red-600">Password is Required.</p>
              )}
            </div>

            <div className="text-right mt-2">
              <Link
                to="/forgot-password"
                className="text-[#8893E0] cursor-pointer hover:text-[#6c77cc] transition"
              >
                Forgot Password ?
              </Link>
            </div>

            <div className="mt-8">
              <button
                type="submit"
                className={clsx(
                  " font-semibold text-white  w-full p-2 rounded-full bg-[#8893E0] hover:bg-[#6c77cc] transition",
                  isLoading ? "bg-[#8892e0cc]  pointer-events-none" : ""
                )}
              >
                {isLoading ? (
                  <>
                    <i className="fa-solid fa-circle-notch fa-spin"></i> Wait{" "}
                  </>
                ) : (
                  "Continue"
                )}
              </button>
              <div className="mt-5 text-center capitalize text-[#9A9A9A]">
                not a member yet?{" "}
                <Link
                  to="/signup"
                  className="text-[#8893E0] cursor-pointer hover:text-[#6c77cc] transition"
                >
                  sign up
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
