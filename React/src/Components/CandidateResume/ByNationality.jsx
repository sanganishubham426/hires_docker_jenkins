import React, { useState } from "react";
import pdfBG from "../../assets/pdf_bg.jpg";
import pdfImg from "../../assets/pdfImg.png";
import { IoBookmark, IoBookmarkOutline } from "react-icons/io5";
import clsx from "clsx";
import { IconButton, ButtonGroup } from "@material-tailwind/react";
import { MdOutlineChevronLeft, MdOutlineChevronRight } from "react-icons/md";
import { GrDocumentUser } from "react-icons/gr";

const Candidates = [
  {
    name: "Ahmed Ali",
    flag: "https://flagpedia.net/data/flags/w580/sa.webp",
  },
  {
    name: "Mohamed Naif",
    flag: "https://flagpedia.net/data/flags/w580/sa.webp",
  },
  {
    name: "Kholod Jammer",
    flag: "https://flagpedia.net/data/flags/w580/sa.webp",
  },
  {
    name: "Reema Saddy",
    flag: "https://flagpedia.net/data/flags/w580/sa.webp",
  },
  {
    name: "John Smith",
    flag: "https://flagpedia.net/data/flags/w580/eg.webp",
  },
  {
    name: "Hanan Abstract",
    flag: "https://flagpedia.net/data/flags/w580/eg.webp",
  },
  {
    name: "Kathmand",
    flag: "https://flagpedia.net/data/flags/w580/in.webp",
  },
  {
    name: "Arizona",
    flag: "https://flagpedia.net/data/flags/w580/jo.webp",
  },
];

function ByNationality() {
  const [active, setActive] = useState(1);
  const [favorites, setFavorites] = useState(
    Array(Candidates.length).fill(false)
  );

  const handleFavorites = (index) => {
    const newFavorites = [...favorites];
    newFavorites[index] = !newFavorites[index];
    setFavorites(newFavorites);
  };

  const getItemProps = (index) => ({
    className:
      active === index
        ? "bg-[#8893E0]/10 text-[#8893E0] border-[#C8C0CF]/50 focus:shadow-none text-sm"
        : "border-[#C8C0CF]/50 text-[#C8C0CF] text-sm",
    onClick: () => setActive(index),
  });

  const next = () => {
    if (active === 4) return;

    setActive(active + 1);
  };

  const prev = () => {
    if (active === 1) return;

    setActive(active - 1);
  };

  return (
    <div>
      <div className="mt-6">
        <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-5">
          {Candidates?.map((item, index) => {
            return (
              <div key={index} className="shadow-md resume_box">
                <div className="relative overflow-hidden">
                  <img src={pdfBG} alt="" className="h-[190px] w-full" />
                  <div className="pdf_img absolute top-6 ">
                    <img
                      src={pdfImg}
                      alt=""
                      className="w-[190px] md:w-[162px] xl:w-[190px]"
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 text-black">
                  <div className="flex items-center">
                    <img src={item.flag} alt="" className="h-5 w-8" />
                    <h4 className="font-medium ps-2">{item.name}</h4>
                  </div>
                  <div>
                    {favorites[index] ? (
                      <IoBookmark
                        className="text-xl cursor-pointer"
                        onClick={() => handleFavorites(index)}
                      />
                    ) : (
                      <IoBookmarkOutline
                        className="text-xl cursor-pointer"
                        onClick={() => handleFavorites(index)}
                      />
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-8 flex justify-end">
        <ButtonGroup variant="outlined">
          <IconButton className="border-[#C8C0CF]/50 text-sm text-[#C8C0CF] focus:shadow-none">
            <MdOutlineChevronLeft className="h-4 w-4" onClick={prev} />
          </IconButton>
          <IconButton {...getItemProps(1)}>1</IconButton>
          <IconButton {...getItemProps(2)}>2</IconButton>
          <IconButton {...getItemProps(3)}>3</IconButton>
          <IconButton {...getItemProps(4)}>4</IconButton>
          <IconButton className="border-[#C8C0CF]/50 text-sm text-[#C8C0CF] focus:shadow-none">
            <MdOutlineChevronRight className="h-4 w-4" onClick={next} />
          </IconButton>
        </ButtonGroup>
      </div>
    </div>
  );
}

export default ByNationality;
