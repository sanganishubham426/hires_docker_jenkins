import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Link } from "react-router-dom";
import { FetchAPI, forgetPasswordUserAPI } from "../../api";
import { useNavigate } from "react-router-dom";
import { errorToast, successToast } from "../../store/Slice";
import clsx from "clsx";

function ForgotPassword() {
  const navigate = useNavigate();

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
      const { data } = await FetchAPI(forgetPasswordUserAPI(), "POST", formData);
      console.log(data);
      
      if (data?.Status === "success") {
        successToast(data.Message);
        localStorage.setItem("emailID", data.Data.user_id);
        navigate("/create-password");
      } else {
        errorToast(data?.Message);
      }

    } catch (error) {
      console.log("Error in forgetPasswordUser API", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="bg-white h-[70vh] lg:h-[calc(100vh-5rem)] rounded-xl px-5 md:px-10 lg:px-20 flex flex-col justify-center items-center">
        <div className="w-full ">
          <h4 className="text-3xl font-bold text-center">Forgot Password</h4>

          <form action="" className="mt-12" onSubmit={handleSubmit(formSubmit)}>
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
                <p className="text-red-600 mt-1">Email is Required.</p>
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
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
