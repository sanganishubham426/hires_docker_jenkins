import React from "react";
import DashboardText from "../DashboardText";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import { IoSearchOutline, IoClose } from "react-icons/io5";
import ViewAll from "./ViewAll";
import ByTopCandidate from "./ByTopCandidate";
import ByNationality from "./ByNationality";
import ByExperience from "./ByExperience";
import ByGender from "./ByGender";
import { useDispatch, useSelector } from "react-redux";
import { setActiveTab, setInputSearch, setClearInputSearch } from "../../store/Slice";

const data = [
  {
    label: "View All",
    value: "viewAll",
  },
  {
    label: "By Top Candidate",
    value: "byTopCandidate",
  },
  {
    label: "By Nationality",
    value: "byNationality",
  },
  {
    label: "By Experience",
    value: "byExperience",
  },
  {
    label: "By Gender",
    value: "byGender",
  },
];

function CandidateResumes() {
  // const [activeTab, setActiveTab] = React.useState("viewAll");
  const { activeTab, inputSearch } = useSelector(state => state.hires)
  const dispatch = useDispatch()

  return (
    <div>
      <DashboardText level1={"Job Description"} level2={"Candidate Resumes"} />

      <div className="mt-8">
        <h2 className="text-lg md:text-xl font-bold">Candidates Resumes</h2>
        <p className="text-gray-500"> the candidates's resumes</p>
      </div>

      <Tabs value={activeTab} className="candidate_tabs">
        <div className="mt-4 grid grid-cols-12 gap-5">
          <div className="col-span-12 xl:col-span-9">
            <TabsHeader
              className="rounded-none border-b border-blue-gray-50 bg-transparent p-0 overflow-auto"
              indicatorProps={{
                className:
                  "bg-transparent border-b-2 border-gray-900 shadow-none rounded-none",
              }}
            >
              {data.map(({ label, value }) => (
                <Tab
                  key={value}
                  value={value}
                  onClick={() => dispatch(setActiveTab(value))}
                  className={
                    activeTab === value ? "text-gray-900 font-medium" : ""
                  }
                >
                  {label}
                </Tab>
              ))}
            </TabsHeader>
          </div>

          {/* SearchBar */}
          <div className="col-span-12 xl:col-span-3">
            <div className="ms-auto md:w-[50%] xl:w-full relative">
              <input
                type="text"
                className="h-8 w-full rounded-full border border-[#BBBBBB]/50 focus:outline-none ps-4"
                placeholder="Search By Job Post"
                value={inputSearch}
                onChange={(e) => dispatch(setInputSearch(e.target.value))}
              />
              <div className="absolute top-[5px] right-3">
                {inputSearch ? <IoClose className="text-xl text-[#9c9c9c] cursor-pointer" onClick={() => dispatch(setClearInputSearch())} /> : <IoSearchOutline className="text-xl text-[#BBBBBB]/50" />}
              </div>
            </div>
          </div>
        </div>

        <TabsBody>
          <TabPanel value="viewAll" className="p-0">
            <ViewAll />
          </TabPanel>
          <TabPanel value="byTopCandidate" className="p-0">
            <ByTopCandidate />
          </TabPanel>
          <TabPanel value="byNationality" className="p-0">
            <ByNationality />
          </TabPanel>
          <TabPanel value="byExperience" className="p-0">
            <ByExperience />
          </TabPanel>
          <TabPanel value="byGender" className="p-0">
            <ByGender />
          </TabPanel>
        </TabsBody>
      </Tabs>
    </div>
  );
}

export default CandidateResumes;
