import React, { useEffect, useState } from "react";
import DashboardText from "../DashboardText";
import clsx from "clsx";
import { useForm, Controller } from "react-hook-form";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { changePasswordUserAPI, FetchAPI } from "../../api";
import { errorToast, getRecruiterID, successToast } from "../../store/Slice";
import { useSelector } from "react-redux";

function Setting() {
  const [isLoading, setIsLoading] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const {
    register,
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();
  const [criteriaMetCount, setCriteriaMetCount] = useState(0);
  const newPassword = watch("user_new_password");

  const { userData } = useSelector((state) => state.API);
  // const recruiterID = localStorage.getItem("recruiterID");
  const recruiterID = getRecruiterID();

  useEffect(() => {
    const handlePasswordChange = () => {
      const value = newPassword;
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
  }, [newPassword]);

  const toggleCurrentPassword = () => {
    setShowCurrentPassword(!showCurrentPassword);
  };
  const toggleNewPassword = () => {
    setShowNewPassword(!showNewPassword);
  };
  const toggleConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const formSubmit = async (formData) => {
    setIsLoading(true);
    try {
      const { data } = await FetchAPI(changePasswordUserAPI(), "PATCH", {
        user_id: recruiterID,
        email: userData.email,
        password: formData.password,
        user_new_password: formData.user_new_password,
      });
      // console.log(data);
      if (data?.Status === "success") {
        successToast(data.Message);
        reset();
      } else {
        errorToast(data?.Message);
      }
    } catch (error) {
      console.log("Error in change password API", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <DashboardText level1={"Home"} level2={"Settings"} />

      <div className="mt-8">
        <h2 className="text-lg md:text-xl font-bold">Change Password</h2>
        <p className="text-gray-500">here the change password</p>
      </div>

      <form
        action=""
        onSubmit={handleSubmit(formSubmit)}
        className="xl:w-[84%]"
      >
        <div className="grid grid-cols-12 md:gap-5 mt-8">
          <div className="col-span-12 md:col-span-4 xl:col-span-3">
            <h6 className="font-medium">Current Password</h6>
            <p className="text-gray-500">enter current password</p>
          </div>

          <div className="col-span-12 md:col-span-8 xl:col-span-9 ">
            <div className="relative">
              <input
                type={showCurrentPassword ? "text" : "password"}
                name="password"
                className="w-full p-2 rounded-md border-gray-300 border mt-1 focus:outline-none "
                placeholder="current password"
                {...register("password", { required: true })}
              />
              {showCurrentPassword ? (
                <div
                  className="absolute top-3 right-3"
                  onClick={toggleCurrentPassword}
                >
                  <i className="fa-solid fa-eye text-[#8893E0]"></i>
                </div>
              ) : (
                <div
                  className="absolute top-3 right-3"
                  onClick={toggleCurrentPassword}
                >
                  <i className="fa-solid fa-eye-slash text-[#8893E0]"></i>
                </div>
              )}
            </div>
            {errors.password && (
              <p className="text-red-600">Current Password is Required.</p>
            )}
          </div>

          <div className="col-span-12 md:col-span-4 xl:col-span-3 mt-5">
            <h6 className="font-medium">New Password</h6>
            <p className="text-gray-500">enter new password</p>
          </div>

          <div className="col-span-12 md:col-span-8 xl:col-span-9 md:mt-5">
            <div className="relative">
              <input
                type={showNewPassword ? "text" : "password"}
                name="user_new_password"
                className="w-full p-2 rounded-md border-gray-300 border mt-1 focus:outline-none "
                placeholder="new password"
                {...register("user_new_password", {
                  required: "New Password is Required.",
                  pattern: {
                    value:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                  },
                })}
              />
              {showNewPassword ? (
                <div
                  className="absolute top-3 right-3"
                  onClick={toggleNewPassword}
                >
                  <i className="fa-solid fa-eye text-[#8893E0]"></i>
                </div>
              ) : (
                <div
                  className="absolute top-3 right-3"
                  onClick={toggleNewPassword}
                >
                  <i className="fa-solid fa-eye-slash text-[#8893E0]"></i>
                </div>
              )}
            </div>
            <div className="grid grid-cols-5 gap-4 mt-2">
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
              use 8 or more charecters with a mix of letters, numbers & symbols.
            </p>

            {errors.user_new_password && (
              <p className="text-red-600">New Password is Required.</p>
            )}
          </div>

          <div className="col-span-12 md:col-span-4 xl:col-span-3 mt-5">
            <h6 className="font-medium">Confirm Password</h6>
            <p className="text-gray-500">enter confirm password</p>
          </div>

          <div className="col-span-12 md:col-span-8 xl:col-span-9 md:mt-5">
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirm_password"
                className="w-full p-2 rounded-md border-gray-300 border mt-1 focus:outline-none "
                placeholder="confirm password"
                {...register("confirm_password", {
                  required: "Confirm Password is Required.",
                  validate: (value) => {
                    if (watch("user_new_password") != value) {
                      return "The passwords do not match.";
                    }
                  },
                })}
              />
              {showConfirmPassword ? (
                <div
                  className="absolute top-3 right-3"
                  onClick={toggleConfirmPassword}
                >
                  <i className="fa-solid fa-eye text-[#8893E0]"></i>
                </div>
              ) : (
                <div
                  className="absolute top-3 right-3"
                  onClick={toggleConfirmPassword}
                >
                  <i className="fa-solid fa-eye-slash text-[#8893E0]"></i>
                </div>
              )}
            </div>
            {errors.confirm_password && (
              <p className="text-red-600">{errors.confirm_password.message}</p>
            )}
          </div>
        </div>

        <div className="text-right mt-16">
          <button
            type="submit"
            className={clsx(
              " hover:bg-[#7581da] transition bg-[#8893E0] text-white px-12 py-2 rounded",
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
  );
}

export default Setting;
