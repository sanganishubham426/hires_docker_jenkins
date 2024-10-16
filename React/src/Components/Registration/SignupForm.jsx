import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { FetchAPI, signupAPI } from "../../api";
import { useNavigate } from "react-router-dom";
import { errorToast, successToast } from "../../store/Slice";

function SignupForm() {
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
  const isTermsChecked = watch("terms");

  const [criteriaMetCount, setCriteriaMetCount] = useState(0);
  const password = watch("recruiter_user_password");

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
    const { confirm_password, terms, ...filteredData } = formData;
    try {
      const { data } = await FetchAPI(signupAPI(), "POST", filteredData);
      // console.log(data);
      if (data?.Status === "success") {
        successToast(data.Message);
        localStorage.setItem("recruiterID", data.Data.recruiter_user_id)
        navigate('/email-verification')
      } else {
        errorToast(data?.Message);
      }
    } catch (error) {
      console.log("Error in sign up API", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="bg-white py-8 rounded-xl px-5 md:px-10 lg:px-20 flex flex-col justify-center items-center">
        <div className="w-full ">
          <h4 className="text-3xl font-bold text-center">Sign Up</h4>

          <form action="" className="mt-8" onSubmit={handleSubmit(formSubmit)}>
            <div>
              <label htmlFor="">First Name</label>
              <input
                type="text"
                name="first_name"
                className="w-full rounded-full border border-gray-300 ps-4 p-2 mt-2 focus:outline-none"
                placeholder="enter first name"
                {...register("first_name", { required: true })}
              />
              {errors.first_name && (
                <p className="text-red-600">First Name is Required.</p>
              )}
            </div>

            <div className="mt-5">
              <label htmlFor="">Last Name</label>
              <input
                type="text"
                name="last_name"
                className="w-full rounded-full border border-gray-300 ps-4 p-2 mt-2 focus:outline-none"
                placeholder="enter last name"
                {...register("last_name", { required: true })}
              />
              {errors.last_name && (
                <p className="text-red-600">Last Name is Required.</p>
              )}
            </div>

            <div className="mt-5">
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

            <div className="mt-5">
              <label htmlFor="">Password</label>
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

            <div className="flex items-center mt-2">
              <Controller
                control={control}
                name="terms"
                defaultValue={false}
                render={({ field }) => (
                  <input
                    type="checkbox"
                    {...field}
                    className="me-2 align-middle cursor-pointer"
                  />
                )}
              />
              <p className="text-black text-sm">Terms & Conditions</p>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-5">
              <button
                type="submit"
                className={clsx(
                  " font-semibold text-white  w-full p-2 rounded-full",
                  isTermsChecked
                    ? "bg-[#8893E0] hover:bg-[#6c77cc] transition"
                    : "bg-[#8892e0cc]  cursor-not-allowed",
                  isLoading ? "bg-[#8892e0cc]  pointer-events-none" : ""
                )}
                disabled={!isTermsChecked}
              >
                {isLoading ? (
                  <>
                    <i className="fa-solid fa-circle-notch fa-spin"></i> Wait{" "}
                  </>
                ) : (
                  "Submit"
                )}
              </button>

              <button
                className=" border border-black  font-semibold w-full p-2 rounded-full"
                onClick={() => navigate("/")}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignupForm;
