import React, { useEffect, useState } from "react";
import DashboardText from "../DashboardText";
import clsx from "clsx";
import {
  IconButton,
  ButtonGroup,
  Spinner,
  Tooltip,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Button,
} from "@material-tailwind/react";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import { MdOutlineChevronLeft, MdOutlineChevronRight } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  FetchAPI,
  jobDescriptionDeleteAPI,
  jobDescriptionUpdateAPI,
  TokenbasedAPI,
} from "../../api";
import { errorToast, successToast } from "../../store/Slice";
import { getJobPost } from "../../store/APISlice";
import { GrDocumentUser } from "react-icons/gr";

// Import the main component
import { Viewer } from "@react-pdf-viewer/core";
// Import the styles
import "@react-pdf-viewer/core/lib/styles/index.css";

function ViewJobPost() {
  const dispatch = useDispatch();
  const { jobPostData, jobLevelData, jobPositionData, loading } = useSelector(
    (state) => state.API
  );
  const { mediaBaseURL } = useSelector((state) => state.hires);
  const [deleteIndex, setDeleteIndex] = useState(null);

  const [selectedJobPosition, setSelectedJobPosition] = useState(null);

  const [jobLevelID, setJobLevelID] = useState("");

  const [active, setActive] = useState(1);

  const recruiterID = localStorage.getItem("recruiterID");
  const [isLoading, setIsLoading] = useState(false);

  const [jobPostValue, setJobPostValue] = useState({});
  const [file, setFile] = useState(null);
  const [existingFileName, setExistingFileName] = useState("");

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);

  const [jobPostID, setJobPostID] = useState("");
  const [jobPostIndex, setJobPostIndex] = useState("");
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const handleOpenDeleteModal = (jobPostID, index) => {
    setJobPostID(jobPostID);
    setJobPostIndex(index);
    setOpenDeleteModal(!openDeleteModal);
  };

  const [pdfID, setPdfID] = useState("");
  const [openPdf, setOpenPdf] = useState(false);
  const handleOpenPdf = (pdf) => {
    setPdfID(pdf);
    setOpenPdf(!openPdf);
  };

  const {
    register,
    control,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  //Edit JobPost
  const editJobPost = async (item) => {
    handleOpen();
    setJobPostValue(item);
  };

  useEffect(() => {
    if (jobPostValue) {
      Object.keys(jobPostValue).forEach((key) => {
        setValue(key, jobPostValue[key]);
      });
      setJobLevelID(jobPostValue.job_level_id);
      setSelectedJobPosition({
        value: jobPostValue.job_position_id,
        label: jobPostValue.job_position_name,
      });
      setExistingFileName(
        jobPostValue.job_description_upload_file?.split("/").pop()
      );
    }
  }, [jobPostValue, setValue]);

  const formSubmit = async (formData) => {
    setIsLoading(true);
    try {
      const form = new FormData();
      form.append("job_description_id", formData.job_description_id);
      form.append("job_tilte", formData.job_tilte);
      form.append("job_level_id", jobLevelID);
      form.append("job_position_id", selectedJobPosition.value);
      form.append("user_id", recruiterID);
      form.append("job_description_action", "active");

      if (file) {
        form.append("job_description_upload_file", file);
      }

      const { data } = await TokenbasedAPI(jobDescriptionUpdateAPI(), "PATCH", form);
      // console.log(data);
      if (data?.Status === "success") {
        successToast(data.Message);
        reset();
        setFile(null);
        dispatch(getJobPost());
        handleOpen();
      } else {
        errorToast(data?.Message);
      }
    } catch (error) {
      console.log("Error in jobDescriptionUpdateAPI", error);
    } finally {
      setIsLoading(false);
    }
  };

  const validateFile = (value) => {
    if (value.length === 0 && !existingFileName) {
      return "Job Description File is Required.";
    }
    if (value.length > 0) {
      const allowedTypes = ["application/pdf"];
      if (!allowedTypes.includes(value[0].type)) {
        return "Only PDF files are allowed.";
      }
      const maxSize = 5 * 1024 * 1024; // 5MB
      if (value[0].size > maxSize) {
        return "File size should not exceed 5MB.";
      }
    }
    return true;
  };

  const onFileChange = (event) => {
    const uploadedFile = event.target.files[0];
    if (uploadedFile) {
      setFile(uploadedFile);
      // setFile(URL.createObjectURL(uploadedFile));
    }
  };

  //Delete Job Post
  const deleteJobPost = async () => {
    try {
      setDeleteIndex(jobPostIndex);
      const { data } = await TokenbasedAPI(jobDescriptionDeleteAPI(), "DELETE", {
        user_id: recruiterID,
        job_description_id: jobPostID,
      });
      // console.log(data);
      if (data?.Status === "success") {
        successToast(data.Message);
        dispatch(getJobPost());
        handleOpenDeleteModal();
      } else {
        errorToast(data?.Message);
      }
    } catch (error) {
      console.log("Error in jobDescriptionDeleteAPI", error);
    } finally {
      setDeleteIndex(null);
    }
  };

  //Pagination
  let totalItems = jobPostData?.length;

  let itemsPerPage = 5;

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const indexOfLastItem = active * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = jobPostData?.slice(indexOfFirstItem, indexOfLastItem);

  const getItemProps = (index) => ({
    className:
      active === index
        ? "bg-[#8893E0]/10 text-[#8893E0] border-[#C8C0CF]/50 focus:shadow-none text-sm"
        : "border-[#C8C0CF]/50 text-[#C8C0CF] text-sm",
    onClick: () => setActive(index),
  });

  const next = () => {
    if (active === totalPages) return;
    setActive(active + 1);
  };

  const prev = () => {
    if (active === 1) return;
    setActive(active - 1);
  };

  const renderPageButtons = () => {
    const buttons = [];
    for (let i = 1; i <= totalPages; i++) {
      buttons.push(
        <IconButton key={i} {...getItemProps(i)}>
          {i}
        </IconButton>
      );
    }
    return buttons;
  };

  return (
    <div>
      <DashboardText level1={"Job Description"} level2={"View Job Posts"} />

      <div className="mt-8">
        <h2 className="text-lg md:text-xl font-bold">Job Active</h2>
        <p className="text-gray-500">here the active job posts</p>
      </div>

      <div className="mt-8 overflow-x-auto min-h-[calc(100vh-330px)]">
        {loading === "pending" ? (
          <div className="flex justify-center items-center min-h-[20rem]">
            <Spinner className="h-8 w-8" color="indigo" />
          </div>
        ) : (
          <table className="w-full table-auto overflow-hidden border-spacing-0 border-separate border border-[#c8c0cf80] rounded-[10px]">
            <thead className="text-left shadow-custom">
              <tr>
                <th className="border-b border-e  border-[#c8c0cf80] p-3 ps-6 xl:ps-20">
                  Job Post
                </th>
                <th className="border-b border-e  border-[#c8c0cf80] p-3 xl:ps-10">
                  Job Position
                </th>
                <th className="border-b border-e border-[#c8c0cf80] p-3 xl:ps-10">
                  Job Level
                </th>
                <th className="border-b border-e border-[#c8c0cf80] p-3 xl:ps-10">
                  Job Post File
                </th>
                <th className="border-b border-[#c8c0cf80] p-3 text-center">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {jobPostData?.length > 0 ? (
                currentItems?.map((item, index) => {
                  const isLast = index === currentItems.length - 1;
                  const classes = isLast
                    ? "p-5"
                    : "p-5 border-b border-[#c8c0cf80]";
                  return (
                    <tr key={index}>
                      <td
                        className={clsx(
                          classes,
                          "border-e border-[#c8c0cf80] xl:ps-20 capitalize"
                        )}
                      >
                        {item.job_tilte}
                      </td>
                      <td
                        className={clsx(
                          classes,
                          "border-e border-[#c8c0cf80] xl:ps-10 capitalize"
                        )}
                      >
                        {item.job_position_name}
                      </td>
                      <td
                        className={clsx(
                          classes,
                          "border-e border-[#c8c0cf80] xl:ps-10 capitalize"
                        )}
                      >
                        {item.job_level_name}
                      </td>

                      <td
                        className={clsx(
                          classes,
                          "border-e border-[#c8c0cf80] "
                        )}
                      >
                        <div className="bg-[#8893E0]/10 w-10 h-10 rounded-full flex items-center justify-center mx-auto cursor-pointer">
                          <GrDocumentUser
                            className="text-[#8893E0] text-xl"
                            onClick={() =>
                              handleOpenPdf(item.job_description_upload_file)
                            }
                          />
                        </div>
                      </td>

                      <td className={clsx(classes, "")}>
                        <div className=" flex justify-center gap-4">
                          <Tooltip content="Edit" placement="bottom">
                            <div>
                              <MdEdit
                                className="text-2xl text-blue-700 cursor-pointer"
                                onClick={() => editJobPost(item)}
                              />
                            </div>
                          </Tooltip>

                          {deleteIndex === index ? ( //For loading icon
                            <i className="fa-solid fa-circle-notch fa-spin text-xl"></i>
                          ) : (
                            <Tooltip content="Delete" placement="bottom">
                              <div>
                                <MdDeleteForever
                                  className="text-2xl text-red-700 cursor-pointer"
                                  onClick={() =>
                                    handleOpenDeleteModal(
                                      item.job_description_id,
                                      index
                                    )
                                  }
                                />
                              </div>
                            </Tooltip>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="4" className="text-center p-8">
                    No job posts found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {jobPostData?.length > 0 && (
        <div className="mt-8 flex justify-end">
          <ButtonGroup variant="outlined">
            <IconButton className={clsx("border-[#C8C0CF]/50 text-sm text-[#C8C0CF] focus:shadow-none", active === 1 ? 'cursor-not-allowed' : '')}>
              <MdOutlineChevronLeft
                className="h-4 w-4"
                onClick={prev}
                disabled={active === 1}
              />
            </IconButton>
            {renderPageButtons()}
            <IconButton className={clsx("border-[#C8C0CF]/50 text-sm text-[#C8C0CF] focus:shadow-none", active === totalPages ? 'cursor-not-allowed' : '')}>
              <MdOutlineChevronRight
                className="h-4 w-4"
                onClick={next}
                disabled={active === totalPages}
              />
            </IconButton>
          </ButtonGroup>
        </div>
      )}

      {/* Edit job post model */}
      <Dialog open={open} handler={handleOpen} size="lg">
        <DialogHeader className="ps-8">Update Job Post</DialogHeader>
        <div>
          <DialogBody className="overflow-y-auto h-[32rem] ">
            <form
              action=""
              onSubmit={handleSubmit(formSubmit)}
              className="px-4"
            >
              <div className="grid grid-cols-12 md:gap-5 text-black">
                {/* Job Title */}
                <div className="col-span-12 md:col-span-3">
                  <h6 className="font-medium">Job Title</h6>
                  <p className="text-gray-500">enter title name</p>
                </div>

                <div className="col-span-12 md:col-span-9">
                  <input
                    type="text"
                    name="job_tilte"
                    className="w-full p-2 rounded-md border-gray-300 border mt-1 focus:outline-none "
                    placeholder="e.g. senior engineering"
                    {...register("job_tilte", { required: true })}
                  />
                  {errors.job_tilte && (
                    <p className="text-red-600">Job Title is Required.</p>
                  )}
                </div>

                {/* Job Position */}
                <div className="col-span-12 md:col-span-3 mt-4">
                  <h6 className=" font-medium">Job Position</h6>
                  <p className="text-gray-500">select the position</p>
                </div>

                <div className="col-span-12 md:col-span-9 md:mt-4">
                  <Controller
                    name="job_position_id"
                    control={control}
                    defaultValue={selectedJobPosition}
                    rules={{ required: "Job position is required" }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        className="capitalize"
                        onChange={(selectedOption) => {
                          setSelectedJobPosition(selectedOption);
                          field.onChange(
                            selectedOption ? selectedOption.value : null
                          );
                        }}
                        options={jobPositionData?.map((position) => ({
                          value: position.job_position_id,
                          label: position.job_position_name,
                        }))}
                        value={selectedJobPosition}
                        isClearable
                        isSearchable
                        styles={{
                          placeholder: (baseStyle, state) => ({
                            ...baseStyle,
                            color: "rgb(189 189 189)",
                          }),
                          control: (baseStyles, state) => ({
                            ...baseStyles,
                            boxShadow: "none",
                            borderColor: "#cccccc",
                            "&:hover": {
                              borderColor: "#cccccc",
                            },
                          }),
                          option: (baseStyles, state) => ({
                            ...baseStyles,
                            backgroundColor: state.isSelected
                              ? "#8893E0"
                              : baseStyles.backgroundColor,
                            // color: state.isSelected ? 'black' : baseStyles.color,
                            // "&:hover": {
                            //   backgroundColor: 'lightgray'
                            // }
                          }),
                        }}
                      />
                    )}
                  />
                  {errors.job_position_id && (
                    <p className="text-red-600">
                      {errors.job_position_id.message}
                    </p>
                  )}
                </div>

                {/* Job Level */}
                <div className="col-span-12 md:col-span-3 mt-4">
                  <h6 className=" font-medium">Job Level</h6>
                  <p className="text-gray-500">select the level</p>
                </div>

                <div className="col-span-12 md:col-span-9 md:mt-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
                    {jobLevelData?.map((item, index) => {
                      return (
                        <div
                          key={index}
                          className={clsx(
                            "p-2 shadow-custom rounded text-center cursor-pointer capitalize",
                            jobLevelID === item.job_level_id &&
                              "bg-[#8893E0] text-white"
                          )}
                          onClick={() => {
                            setValue("job_level_id", item.job_level_id, {
                              shouldValidate: true,
                            }); // Validate after setting the value
                            setJobLevelID(item.job_level_id);
                          }}
                        >
                          {item.job_level_name}
                        </div>
                      );
                    })}
                  </div>

                  {errors.job_level_id && (
                    <p className="text-red-600">
                      {errors.job_level_id.message}
                    </p>
                  )}

                  {/* Hidden input field to include jobLevel in form data */}
                  <input type="hidden" {...register("job_level_id")} />
                </div>

                {/* Job Description */}
                <div className="col-span-12 md:col-span-3 mt-4">
                  <h6 className=" font-medium">Job Description File</h6>
                  <p className="text-gray-500">choose the file</p>
                </div>

                <div className="col-span-12 md:col-span-9 md:mt-4 relative">
                  {file
                    ? null
                    : existingFileName && (
                        <p className="text-gray-500 mb-2">
                          Current file:&nbsp;
                          <a
                            href={`${mediaBaseURL}job_descriptions/${existingFileName}`}
                            target="_blank"
                            className="hover:text-[#8893E0] transition-all"
                          >
                            {existingFileName}
                          </a>
                        </p>
                      )}
                  <input
                    type="file"
                    name="job_description_upload_file"
                    className="w-full h-11 rounded-md border-gray-300 border mt-1 focus:outline-none 
            file:bg-white file:border file:border-gray-300 file:h-full file:text-gray-500 file:rounded"
                    placeholder="e.g. senior engineering"
                    {...register("job_description_upload_file")}
                    onChange={onFileChange}
                  />
                  {errors.job_description_upload_file && (
                    <p className="text-red-600">
                      {errors.job_description_upload_file.message}
                    </p>
                  )}

                  {/* {file && (
                    <div className="absolute top-[45px] right-2 cursor-pointer">
                      <svg
                        width="30"
                        height="30"
                        viewBox="0 0 62 62"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        onClick={handleOpen}
                      >
                        <path
                          d="M15.5 0C13.3687 0 11.625 1.74375 11.625 3.875V58.125C11.625 60.2562 13.3687 62 15.5 62H54.25C56.3812 62 58.125 60.2562 58.125 58.125V15.5L42.625 0H15.5Z"
                          fill="#E2E5E7"
                        />
                        <path
                          d="M46.5 15.5H58.125L42.625 0V11.625C42.625 13.7563 44.3687 15.5 46.5 15.5Z"
                          fill="#B0B7BD"
                        />
                        <path
                          d="M58.125 27.125L46.5 15.5H58.125V27.125Z"
                          fill="#CAD1D8"
                        />
                        <path
                          d="M50.375 50.375C50.375 51.4406 49.5031 52.3125 48.4375 52.3125H5.8125C4.74687 52.3125 3.875 51.4406 3.875 50.375V31C3.875 29.9344 4.74687 29.0625 5.8125 29.0625H48.4375C49.5031 29.0625 50.375 29.9344 50.375 31V50.375Z"
                          fill="#F15642"
                        />
                        <path
                          d="M12.3203 36.7099C12.3203 36.1984 12.7233 35.6404 13.3724 35.6404H16.9509C18.9659 35.6404 20.7794 36.9889 20.7794 39.5735C20.7794 42.0225 18.9659 43.3865 16.9509 43.3865H14.3644V45.4325C14.3644 46.1145 13.9304 46.5001 13.3724 46.5001C12.8609 46.5001 12.3203 46.1145 12.3203 45.4325V36.7099ZM14.3644 37.5914V41.4509H16.9509C17.9894 41.4509 18.8109 40.5345 18.8109 39.5735C18.8109 38.4904 17.9894 37.5914 16.9509 37.5914H14.3644Z"
                          fill="white"
                        />
                        <path
                          d="M23.8136 46.5C23.3021 46.5 22.7441 46.221 22.7441 45.5409V36.7408C22.7441 36.1847 23.3021 35.7798 23.8136 35.7798H27.3612C34.4408 35.7798 34.2858 46.5 27.5007 46.5H23.8136ZM24.7901 37.6708V44.6109H27.3612C31.5443 44.6109 31.7303 37.6708 27.3612 37.6708H24.7901Z"
                          fill="white"
                        />
                        <path
                          d="M36.7966 37.7948V40.2573H40.7472C41.3052 40.2573 41.8632 40.8153 41.8632 41.3559C41.8632 41.8674 41.3052 42.2859 40.7472 42.2859H36.7966V45.539C36.7966 46.0815 36.4111 46.498 35.8686 46.498C35.1866 46.498 34.77 46.0815 34.77 45.539V36.7388C34.77 36.1828 35.1885 35.7778 35.8686 35.7778H41.3071C41.9891 35.7778 42.3921 36.1828 42.3921 36.7388C42.3921 37.2348 41.9891 37.7928 41.3071 37.7928H36.7966V37.7948Z"
                          fill="white"
                        />
                        <path
                          d="M48.4375 52.3125H11.625V54.25H48.4375C49.5031 54.25 50.375 53.3781 50.375 52.3125V50.375C50.375 51.4406 49.5031 52.3125 48.4375 52.3125Z"
                          fill="#CAD1D8"
                        />
                      </svg>
                    </div>
                  )} */}
                </div>
              </div>

              {/* Submit  */}
              <div className="text-right mt-16">
                <button
                  type="submit"
                  className={clsx(
                    " hover:bg-[#7581da] transition bg-[#8893E0] font-medium border border-[#8893E0] text-white px-12 py-2 rounded",
                    isLoading ? "bg-[#8892e0cc]  pointer-events-none" : ""
                  )}
                >
                  {isLoading ? (
                    <>
                      <i className="fa-solid fa-circle-notch fa-spin"></i> Wait{" "}
                    </>
                  ) : (
                    "Update"
                  )}
                </button>
                <button
                  type="button"
                  className="border border-[#8893E0] px-12 py-2 rounded font-medium ms-4 text-black"
                  onClick={() => handleOpen()}
                >
                  Cancel
                </button>
              </div>
            </form>
          </DialogBody>
        </div>
      </Dialog>

      {/* Delete job post model */}
      <Dialog open={openDeleteModal} handler={handleOpenDeleteModal} size="md">
        <DialogHeader className="m-2">
          Are you sure want to delete job post?
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="outlined"
            color="black"
            onClick={handleOpenDeleteModal}
            className="mr-2"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="red" onClick={deleteJobPost}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>

      {/* pdf file preview */}
      <Dialog open={openPdf} handler={handleOpenPdf} size="lg">
        <DialogHeader>PDF Preview</DialogHeader>
        <div>
          <DialogBody className="overflow-y-scroll h-[32rem] ">
            {pdfID && (
              <div>
                <Viewer fileUrl={`${mediaBaseURL}${pdfID}`} />
              </div>
            )}
          </DialogBody>
        </div>
      </Dialog>
    </div>
  );
}

export default ViewJobPost;
