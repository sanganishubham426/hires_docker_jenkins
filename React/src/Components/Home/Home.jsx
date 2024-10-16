import React from "react";
import { Sidebar } from "../Sidebar";
import DashboardText from "../DashboardText";
import { Avatar, Card } from "@material-tailwind/react";
import { FaRegUser } from "react-icons/fa";
import { IoIosMale, IoIosFemale } from "react-icons/io";
import { PiMedal } from "react-icons/pi";
import Chart from "./Chart";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setActiveTab } from "../../store/Slice";
import { IoLocationOutline } from "react-icons/io5";

const Candidates = [
  {
    avtar: "https://flagpedia.net/data/flags/w580/ca.webp",
    name: "John Smith",
  },
  {
    avtar: "https://flagpedia.net/data/flags/w580/sa.webp",
    name: "Mohamed Naif",
  },
  {
    avtar: "https://flagpedia.net/data/flags/w580/jo.webp",
    name: "kathryn murphy",
  },
  {
    avtar: "https://flagpedia.net/data/flags/w580/in.webp",
    name: "arlene McCoy",
  },
  {
    avtar: "https://flagpedia.net/data/flags/w580/sa.webp",
    name: "Hanan abdulaha",
  },
];
const Nationalism = [
  {
    avtar: "https://flagpedia.net/data/flags/w580/sa.webp",
    name: "ahmad ali",
  },
  {
    avtar: "https://flagpedia.net/data/flags/w580/sa.webp",
    name: "Mohamed Naif",
  },
  {
    avtar: "https://flagpedia.net/data/flags/w580/sa.webp",
    name: "reema saady",
  },
  {
    avtar: "https://flagpedia.net/data/flags/w580/sa.webp",
    name: "kholod jabeer",
  },
  {
    avtar: "https://flagpedia.net/data/flags/w580/sa.webp",
    name: "hanan abdulaha",
  },
];
const Females = [
  {
    name: "kathryn murphy",
  },
  {
    name: "arlene McCoy",
  },
  {
    name: "Hanan abdulaha",
  },
  {
    name: "reema saady",
  }
];
const Males = [
  {
    name: "John Smith",
  },
  {
    name: "Mohamed Naif",
  },
  {
    name: "ali samy",
  },
  {
    name: "robert fox",
  }
];
const Country = [
  {
    avtar: "https://flagpedia.net/data/flags/w580/sa.webp",
    name: "Saudi Arabia",
  },
  {
    avtar: "https://flagpedia.net/data/flags/w580/jo.webp",
    name: "Jordan",
  },
  {
    avtar: "https://flagpedia.net/data/flags/w580/in.webp",
    name: "India",
  },
  {
    avtar: "https://flagpedia.net/data/flags/w580/eg.webp",
    name: "Egypt",
  },
];

const Numbers = [20, 15, 9, 7];

function Home() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  return (
    <div>
      <DashboardText level1={"Home"} level2={"Dashboard"} />

      <div className="grid grid-cols-12 gap-6 mt-5">
        {/* Top Candidate */}
        <div className="col-span-12 md:col-span-6 xl:col-span-4 order-1">
          <Card className="h-full w-full p-4">
            <div className="flex justify-between items-center">
              <h3 className="uppercase font-bold text-lg text-black">
                top candidates
              </h3>
              <span className="bg-gray-200 p-1 rounded-full">
                <FaRegUser />
              </span>
            </div>

            <div className="text-black mt-2">
              {Candidates.map((item, index) => {
                const isLast = index === Candidates?.length - 1;
                return (
                  <>
                    <div
                      key={index}
                      className="flex justify-between items-center gap-3 my-2"
                    >
                      <span className="ps-2 capitalize">
                        {index + 1}. {item.name}
                      </span>
                      <img
                        src={item.avtar}
                        alt={item.name}
                        className="h-5 w-8"
                      />
                    </div>
                    {isLast ? "" : <hr />}
                  </>
                );
              })}
            </div>

            <div className="mt-3">
              <button className="w-full bg-gray-200 p-2 rounded-md text-black"
              onClick={() => {
                navigate('/candidate-resumes')
                dispatch(setActiveTab('byTopCandidate'))
                }}>
                View All Names
              </button>
            </div>
          </Card>
        </div>

        {/* Nationalism */}
        <div className="col-span-12 md:col-span-6 xl:col-span-4 order-2">
          <Card className="h-full w-full p-4">
            <div className="flex justify-between items-center">
              <h3 className="uppercase font-bold text-lg text-black">
                Nationalism
              </h3>
              <span className="bg-gray-200 p-1 rounded-full">
                <IoLocationOutline  />
              </span>
            </div>

            <div className="text-black mt-2">
              {Nationalism?.map((item, index) => {
                const isLast = index === Candidates?.length - 1;
                return (
                  <>
                    <div
                      key={index}
                      className="flex justify-between items-center gap-3 my-2"
                    >
                      <span className="ps-2 capitalize">
                        {" "}
                        {index + 1}. {item.name}
                      </span>
                      <img
                        src={item.avtar}
                        alt={item.name}
                        className="h-5 w-8"
                      />
                    </div>
                    {isLast ? "" : <hr />}
                  </>
                );
              })}
            </div>

            <div className="mt-3">
              <button className="w-full bg-gray-200 p-2 rounded-md text-black"
             >
                View All Names
              </button>
            </div>
          </Card>
        </div>

        {/* Candidates gender */}
        <div className="col-span-12 md:col-span-6 xl:col-span-4 order-3">
          <Card className="h-full w-full p-4">
            <div className="flex justify-between items-center">
              <h3 className="uppercase font-bold text-lg text-black">
                Candidates gender
              </h3>
              <span className="text-sm cursor-pointer"
              onClick={() => {
                navigate('/candidate-resumes')
                dispatch(setActiveTab('byGender'))
                }}>View All</span>
            </div>

            <div className="flex border rounded-lg mt-2">
              {/* Female */}
              <div className="w-[55%]">
              <table className="text-black w-full table-fixed">
                <thead>
                  <tr>
                    <td className="border-b border-e py-3 flex justify-center items-center">
                      <IoIosFemale className="me-2" /> Female
                    </td>
                  </tr>
                </thead>
                <tbody>
                  {Females.slice(0, 4).map((item, index) => {
                    return (
                      <>
                        <tr key={index} className="flex items-center ">
                          <td className="border-b border-e ps-2 w-full flex items-center min-h-[3.5rem]">
                            <span className=" ps-2 me-2 capitalize">
                              {index + 1}. {item.name}
                            </span>
                          </td>
                        </tr>
                      </>
                    );
                  })}
                </tbody>
              </table>
              </div>
              {/* Male */}
              <div className="w-[45%]">
              <table className="text-black w-full table-fixed">
                <thead>
                  <tr>
                    <td className="border-b py-3 flex justify-center items-center">
                      <IoIosMale className="me-2" /> Male
                    </td>
                  </tr>
                </thead>
                <tbody>
                  {Males.slice(0, 4).map((item, index) => {
                    return (
                      <>
                        <tr key={index} className="flex items-center">
                          <td className="border-b ps-2 w-full flex items-center  min-h-[3.5rem]">
                            <div className=" ps-2 capitalize">
                              {item.name}
                            </div>
                          </td>
                        </tr>
                      </>
                    );
                  })}
                </tbody>
              </table>
              </div>
            </div>
          </Card>
        </div>

        {/* Chart */}
        <div className="col-span-12 md:col-span-12 xl:col-span-8 order-5 xl:order-4">
          <Card className="h-full w-full p-3">
            <div className="flex justify-between items-center mb-4">
              <h3 className="uppercase font-bold text-lg text-black">
                Candidates by years of experience
              </h3>
              <span className="text-sm cursor-pointer"
              onClick={() => {
                navigate('/candidate-resumes')
                dispatch(setActiveTab('byExperience'))
                }}>View All Details</span>
            </div>

            <div>
              <Chart />
            </div>
          </Card>
        </div>

        {/* Candidates Nationality */}
        <div className="col-span-12 md:col-span-6 xl:col-span-4 order-4 xl:order-5">
          <Card className="h-full w-full p-3">
            <div className="flex justify-between items-center">
              <h3 className="uppercase font-bold text-lg text-black">
                Candidates Nationality
              </h3>
              <span className="text-sm cursor-pointer"
              onClick={() => {
                navigate('/candidate-resumes')
                dispatch(setActiveTab('byNationality'))
                }}>View All</span>
            </div>
            <div className="flex border rounded-lg mt-2">
              <table className="flex-grow text-black">
                <thead>
                  <tr>
                    <td className="border-b border-e py-3 text-center">
                      Candidate's Country
                    </td>
                  </tr>
                </thead>
                <tbody>
                  {Country.map((item, index) => {
                    return (
                      <>
                        <tr key={index} className="">
                          <td className="border-b border-e py-3 w-full flex items-center">
                            <img
                              src={item.avtar}
                              alt={item.name}
                              className="ms-3 h-5 w-8"
                            />
                            <span className=" ps-3 me-2">{item.name}</span>
                          </td>
                        </tr>
                      </>
                    );
                  })}
                </tbody>
              </table>

              <table className="min-w-[6rem] text-black">
                <thead>
                  <tr>
                    <td className="border-b py-3 text-center">
                      Numbers
                    </td>
                  </tr>
                </thead>
                <tbody>
                  {Numbers.map((item, index) => {
                    const finalItem = item.toString().padStart(2, '0');
                    return (
                      <>
                        <tr key={index} className="">
                          <td className="border-b py-3 text-center">
                            <span className="">{finalItem}</span>
                          </td>
                        </tr>
                      </>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Home;
