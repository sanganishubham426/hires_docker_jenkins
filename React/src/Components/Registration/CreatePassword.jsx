import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { FetchAPI, forgetPasswordUserChangedAPI, resendOTPForEmailVerificationAPI } from "../../api";
import { errorToast, successToast } from "../../store/Slice";

function CreatePassword() {
  const navigate = useNavigate();

  const {
    register,
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  const [isLoading, setIsLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);

  const [validateOTP, setValidateOTP] = useState(true);
  const [resendOTP, setResendOTP] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);

  const [criteriaMetCount, setCriteriaMetCount] = useState(0);
  const password = watch("recruiter_user_new_password");

  const recruiterID = localStorage.getItem("recruiterID");
  const emailID = localStorage.getItem("emailID");

  useEffect(() => {
    const handlePasswordChange = () => {
      const value = password;
      const criteria = [
        /[A-Z]/.test(value), // Upper case
        /[a-z]/.test(value), // Lower case
        /\d/.test(value), // Number
        /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(value), // Special char
        value?.length >= 8, // Min length
      ];
      setCriteriaMetCount(criteria.filter(Boolean).length);
    };

    handlePasswordChange();
  }, [password]);

  const formSubmit = async (formData) => {
    setIsLoading(true);
    try {
      const { data } = await FetchAPI(
        forgetPasswordUserChangedAPI(),
        "POST",
        {
          email: emailID,
          password: formData.password,
          OTP_code: formData.OTP_code
        }
      );
      // console.log(data);
      if (data?.Status === "success") {
        successToast(data.Message);
        navigate('/')
      } else {
        errorToast(data?.Message);
      }
    } catch (error) {
      console.log("Error in forgetPasswordUserChangedAPI", error);
    } finally {
      setIsLoading(false);
    }
  };

  const resendOTPHandler = async () => {
    setResendLoading(true);
    try {
      const { data } = await FetchAPI(
        resendOTPForEmailVerificationAPI(),
        "POST",
        {
          recruiter_user_id: recruiterID,
        }
      );
      // console.log(data);
      if (data?.Status === "success") {
        successToast(data.Message);
      } else {
        errorToast(data?.Message);
      }
      setResendOTP(false);
      setTimeLeft(60);
    } catch (error) {
      console.log("Error in resendOTPForEmailVerificationAPI", error);
    } finally {
      setResendLoading(false);
    }
  };

  const startTimer = () => {
    setTimeout(() => {
      if (timeLeft > 0) {
        setTimeLeft((prevTime) => prevTime - 1);
      } else {
        setResendOTP(true);
      }
    }, 1000);
  };
  useEffect(() => {
    if (validateOTP) {
      startTimer();
    }
  }, [timeLeft]);

  return (
    <div>
      <div className="bg-white py-8 rounded-xl px-5 md:px-10 lg:px-20 flex flex-col justify-center items-center">
        <div className="w-full ">
          <h4 className="text-3xl font-bold text-center">
            Create New Passowrd
          </h4>

          <form action="" className="mt-8" onSubmit={handleSubmit(formSubmit)}>
            <div className="mt-5">
              <label htmlFor="">New Password</label>
              <input
                type="password"
                name="password"
                className="w-full rounded-full border border-gray-300 ps-4 p-2 mt-2 focus:outline-none"
                placeholder="enter your password"
                {...register("password", {
                  required: "Password is Required.",
                  pattern: {
                    value:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                  },
                })}
              />

              <div className="grid grid-cols-5 gap-4 mt-2 px-3">
                {[...Array(5)].map((_, index) => (
                  <span
                    key={index}
                    className={clsx(
                      "h-[2px] rounded",
                      index < criteriaMetCount
                        ? "bg-[#8893E0]"
                        : "bg-[#D9D9D9]/50"
                    )}
                  ></span>
                ))}
              </div>
              <p className="text-[#9A9A9A] mt-1">
                use 8 or more charecters with a mix of letters, numbers &
                symbols.
              </p>
              {errors.password && (
                <p className="text-red-600">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="mt-5">
              <label htmlFor="">Confirm Password</label>
              <input
                type="password"
                name="confirm_password"
                className="w-full rounded-full border border-gray-300 ps-4 p-2 mt-2 focus:outline-none"
                placeholder="password confirmation"
                {...register("confirm_password", {
                  required: "Confirm Password is Required.",
                  validate: (value) => {
                    if (watch("password") != value) {
                      return "The passwords do not match.";
                    }
                  },
                })}
              />
              {errors.confirm_password && (
                <p className="text-red-600">
                  {errors.confirm_password.message}
                </p>
              )}
            </div>

            <div className="mt-5">
              <label htmlFor="">OTP</label>
              <input
                type="text"
                name="OTP_code"
                className="w-full rounded-full border border-gray-300 ps-4 p-2 mt-2 focus:outline-none"
                placeholder="enter your OTP"
                {...register("OTP_code", { required: true })}
              />
              {errors.OTP_code && (
                <p className="text-red-600 mt-1">OTP is Required.</p>
              )}
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
                  "Submit"
                )}
              </button>
            </div>
          </form>

          <p className="pt-8 text-center text-gray-500">
            Didn't Receive the OTP?&nbsp;
            {resendOTP ? (
              <span
                className={clsx(
                  "text-[#6c77cc]",
                  "font-semibold",
                  "cursor-pointer hover:text-[#4d5cce] transition",
                  resendLoading ? "text-[#6c77cc] pointer-events-none" : ""
                )}
                onClick={() => resendOTPHandler()}
              >
                {/* Resend OTP */}
                {resendLoading ? (
                  <>
                    Resend OTP{" "}
                    <i className="fa-solid fa-circle-notch fa-spin"></i>
                  </>
                ) : (
                  " Resend OTP"
                )}
              </span>
            ) : (
              <span className="text-[#8893E0] font-semibold cursor-not-allowed">
                Resend OTP
              </span>
            )}
          </p>
          {timeLeft > 0 && (
            <p className="text-sm text-gray-600 mt-3 text-center">
              Resend OTP in ({timeLeft > 0 ? timeLeft : 0}s)
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default CreatePassword;
