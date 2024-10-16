import React, { useState } from "react";
import logo from "../assets/logo.png";
import logoDull from "../assets/logo_dull.png";
import logoVector from "../assets/login_bgvector.png";
import logoVector2 from "../assets/login_bgvector2.png";
import logoVector3 from "../assets/login_bgvector3.png";
import logoVector4 from "../assets/login_bgvector4.png";
import LoginForm from "../Components/Registration/LoginForm";
import { useLocation } from "react-router-dom";
import SignupForm from "../Components/Registration/SignupForm";
import EmailVerification from "../Components/Registration/EmailVerification";
import ForgotPassword from "../Components/Registration/ForgotPassword";
import CreatePassword from "../Components/Registration/CreatePassword";

function RegistrationPage() {
  const location = useLocation();

  return (
    <div>
      <div className="bg-gradient-to-r from-[#9E79DA] to-[#74AAE5] min-h-screen p-6 md:p-10 relative">
        <div className="grid grid-cols-12 gap-4">
          {/* ================ login left part ================ */}
          <div className="col-span-12 lg:col-span-4 relative ">
            <div className="flex flex-col h-full">
              <div className="">
                <img src={logo} alt="" className="h-[66px] mx-auto lg:mx-0" />

                <div className="text-white  mt-10 hidden lg:block">
                  <h6 className=" text-[33px] font-syne font-medium capitalize tracking-wide">
                    Innovation in
                  </h6>
                  <h6 className=" text-[33px] font-syne mt-1 font-medium capitalize tracking-wide">
                    artificial intelligence
                  </h6>
                  <h6 className=" text-[33px] font-syne mt-1 font-medium capitalize tracking-wide">
                    in talent
                  </h6>
                  <h6 className=" text-[33px] font-syne mt-1 font-medium capitalize tracking-wide">
                    recruitment
                  </h6>
                </div>
              </div>
              <div className="mt-auto hidden lg:block">
                <img src={logoDull} alt="" className="h-[40px]" />
              </div>
            </div>
          </div>

          {/* ================ Background vector ================ */}
          <div className="absolute -top-20 -left-10">
            <img src={logoVector4} alt="" className="h-[380px] w-auto" />
          </div>
          <div className="absolute left-0 bottom-20">
            <img src={logoVector} alt="" className="h-[380px] w-auto" />
          </div>
          <div className="absolute top-0 right-0">
            <img src={logoVector2} alt="" className="h-[380px] w-auto" />
          </div>
          <div className="absolute bottom-0 right-0 ">
            <img src={logoVector3} alt="" className="h-[380px] w-auto" />
          </div>

          {/* ================ login or signup form ================ */}
          <div className="col-span-12 lg:col-span-8 relative z-10">
            {location.pathname === "/" && <LoginForm />}
            {location.pathname === "/signup" && <SignupForm />}
            {location.pathname === "/email-verification" && <EmailVerification />}
            {location.pathname === "/forgot-password" && <ForgotPassword />}
            {location.pathname === "/create-password" && <CreatePassword />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegistrationPage;
