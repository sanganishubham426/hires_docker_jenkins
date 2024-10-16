import React from "react";
import { Breadcrumbs } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { Avatar } from "@material-tailwind/react";
import { useSelector } from "react-redux";

function DashboardText({ level1, level2 }) {
  const { userData } = useSelector((state) => state.API);

  return (
    <div>
      <div className="flex flex-wrap justify-between items-center">
        <div>
          <h1 className="font-extrabold text-3xl md:text-4xl">Dashboard</h1>
          <Breadcrumbs className="bg-transparent ps-0 bread">
            <span className="opacity-60 ">{level1}</span>
            <Link to="">{level2}</Link>
          </Breadcrumbs>
        </div>

        <div className="flex items-center mt-4 md:mt-0">
          <div className="pe-3">
            {userData && (
              <h3 className="font-medium capitalize">
                {userData?.recruiter_user_firstname}{" "}
                {userData?.recruiter_user_lastname}
              </h3>
            )}
            <span className="text-gray-600 text-sm">Welcome Back</span>
          </div>
          <Avatar
            src={`https://avatar.iran.liara.run/username?username=${userData?.recruiter_user_firstname}+${userData?.recruiter_user_lastname}`}
            alt="avatar"
          />
        </div>
      </div>
    </div>
  );
}

export default DashboardText;
