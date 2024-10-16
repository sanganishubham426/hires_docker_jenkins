import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Link } from "react-router-dom";
import { emailVerificationCompletionAPI, FetchAPI, resendOTPForEmailVerificationAPI } from "../../api";
import { useNavigate } from "react-router-dom";
import { errorToast, successToast } from "../../store/Slice";

function EmailVerification() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [validateOTP, setValidateOTP] = useState(true);
  const [resendOTP, setResendOTP] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const recruiterID = localStorage.getItem("recruiterID");

  const formSubmit = async (formData) => {
    setIsLoading(true);
    try {
      const { data } = await FetchAPI(
        emailVerificationCompletionAPI(),
        "PATCH",
        {
          user_id: recruiterID,
          OTP_code: formData.OTP_code,
        }
      );
      // console.log(data);
      if (data?.Status === "success") {
        successToast(data.Message);
        // localStorage.setItem("recruiterID", data.Data.recruiter_user_id);
        navigate("/");
      } else {
        errorToast(data?.Message);
      }
    } catch (error) {
      console.log("Error in emailVerificationCompletion API", error);
    } finally {
      setIsLoading(false);
    }
  };

  const resendOTPHandler = async () => {
    setResendLoading(true);
    try {
      const { data } = await FetchAPI(resendOTPForEmailVerificationAPI(), "POST", {
        id: recruiterID,
      });
      // console.log(data);
      if (data?.Status === "success") {
        successToast(data.Message);
      } else {
        errorToast(data?.Message);
      }
      setResendOTP(false);
      setTimeLeft(60)
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
      <div className="bg-white h-[70vh] lg:h-[calc(100vh-5rem)] rounded-xl px-5 md:px-10 lg:px-20 flex flex-col justify-center items-center">
        <div className="w-full ">
          <h4 className="text-3xl font-bold text-center">Email Verification</h4>

          <form action="" className="mt-12" onSubmit={handleSubmit(formSubmit)}>
            <div>
              <label htmlFor="" className="font-medium">
                OTP
              </label>
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

export default EmailVerification;
