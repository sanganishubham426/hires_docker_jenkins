import React, { useEffect, useState } from "react";
import {
  Card,
  List,
  ListItem,
  ListItemPrefix,
  Drawer,
  IconButton,
} from "@material-tailwind/react";
import { useLocation, useNavigate } from "react-router-dom";
import { GoHome } from "react-icons/go";
import { IoBriefcaseOutline } from "react-icons/io5";
import {
  HiOutlineDocumentMagnifyingGlass,
  HiOutlineDocumentText,
} from "react-icons/hi2";
import { RiSettings2Line } from "react-icons/ri";
import { GrDocumentUser } from "react-icons/gr";
import { FaRegWindowClose } from "react-icons/fa";
import clsx from "clsx";
import dashLogo from "../assets/logo.png"
import { FetchAPI, logoutUserAPI } from "../api";
import { errorToast, getRecruiterID, successToast } from "../store/Slice";

function SidebarContent({ onClose }) {
  const navigate = useNavigate();
  const location = useLocation();

  // const recruiterID = localStorage.getItem("recruiterID");
  const recruiterID = getRecruiterID();

  const HandleNavigate = (path) => {
    navigate(path);
    onClose();
  };

  const HandleLogOut = async() => {
    try {
      const { data } = await FetchAPI(logoutUserAPI(), "PATCH",{
          user_id: recruiterID,
        }
      );
      // console.log(data);
      if (data?.Status === "success") {
        successToast(data.Message);
        localStorage.clear();
        navigate("/");
      } else {
        errorToast(data?.Message);
      }
    } catch (error) {
      console.log("Error in logoutUserAPI", error);
    }
  }

  return (
    <Card className="h-full w-full ps-4 py-4 shadow-xl shadow-blue-gray-900/5 bg-gradient-to-t from-[#74AAE5] to-[#9E79DA] rounded-none">
      <div className="my-2 flex justify-between items-center w-full ">
        <div className="mx-auto mt-3">
          <img src={dashLogo} alt="" className="h-[34px] w-auto " />
        </div>
        <IconButton
          variant="text"
          color="blue-gray"
          onClick={onClose}
          className="lg:hidden text-white mt-3"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-5 w-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </IconButton>
      </div>

      <List className="mt-8 text-white sidebar p-0  ">
        <ListItem
          onClick={() => HandleNavigate("/home")}
          className={clsx(
            "sidebar_item",
            location.pathname === "/home" ? "active" : ""
          )}
          ripple={false}
        >
          <ListItemPrefix>
            <GoHome className="h-5 w-5" />
          </ListItemPrefix>
          Home
        </ListItem>

        <ListItem
          onClick={() => HandleNavigate("/jobpost")}
          className={clsx(
            "sidebar_item",
            location.pathname === "/jobpost" ? "active" : ""
          )}
          ripple={false}
        >
          <ListItemPrefix>
            <IoBriefcaseOutline className="h-5 w-5" />
          </ListItemPrefix>
          Job Posts
        </ListItem>

        <ListItem
          onClick={() => HandleNavigate("/viewjobpost")}
          className={clsx(
            "sidebar_item",
            location.pathname === "/viewjobpost" ? "active" : ""
          )}
          ripple={false}
        >
          <ListItemPrefix>
            <HiOutlineDocumentMagnifyingGlass className="h-5 w-5" />
          </ListItemPrefix>
          View Job Posts
        </ListItem>

        <ListItem
          onClick={() => HandleNavigate("/bulk-resumes")}
          className={clsx(
            "sidebar_item",
            location.pathname === "/bulk-resumes" ? "active" : ""
          )}
          ripple={false}
        >
          <ListItemPrefix>
            <HiOutlineDocumentText className="h-5 w-5" />
          </ListItemPrefix>
          Bulk Resumes
        </ListItem>

        <ListItem
          onClick={() => HandleNavigate("/candidate-resumes")}
          className={clsx(
            "sidebar_item",
            location.pathname === "/candidate-resumes" ? "active" : ""
          )}
          ripple={false}
        >
          <ListItemPrefix>
            <GrDocumentUser className="h-4 w-4" />
          </ListItemPrefix>
          Candidates Resumes
        </ListItem>
      </List>

      <List className="mt-16 text-white sidebar p-0">
        <ListItem
          className={clsx(
            "sidebar_item",
            location.pathname === "/setting" ? "active" : ""
          )}
          ripple={false}
          onClick={() => HandleNavigate("/setting")}
        >
          <ListItemPrefix>
            <RiSettings2Line className="h-5 w-5" />
          </ListItemPrefix>
          Settings
        </ListItem>

        <ListItem className="sidebar_item"  ripple={false} onClick={() => HandleLogOut()}>
          <ListItemPrefix>
            <FaRegWindowClose   className="h-5 w-5" />
          </ListItemPrefix>
          Log Out
        </ListItem>
      </List>
    </Card>
  );
}

export function Sidebar() {
  const [showSidebar, setShowSidebar] = useState(true);
  const [open, setOpen] = useState(false);

  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);

  useEffect(() => {
    const handleResize = () => {
      window.innerWidth < 1024 ? setShowSidebar(false) : setShowSidebar(true);
    };

    // Set the initial state based on the current window width
    handleResize();

    window.addEventListener("resize", handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      {showSidebar ? (
        <div className="min-w-[17rem] min-h-screen">
          <SidebarContent />
        </div>
      ) : (
        <div
          className="p-5 shadow-xl shadow-blue-gray-900/5 min-h-screen bg-gradient-to-t from-[#74AAE5] to-[#9E79DA]"
          onClick={openDrawer}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="size-7 text-white mt-4 md:mt-5"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </div>
      )}
      <Drawer open={open} onClose={closeDrawer} size={270}>
        <SidebarContent onClose={closeDrawer} />
      </Drawer>
    </>
  );
}
