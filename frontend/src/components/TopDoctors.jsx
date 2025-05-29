import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { motion } from "framer-motion";

const TopDoctors = () => {
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);

  return (
    <div className="relative min-h-[53vh] flex flex-col items-center gap-4 my-16 text-[#262626] md:mx-10 overflow-hidden">

      {/* Content Section */}
      <div className="relative z-10 flex flex-col items-center p-10 bg-gray-50 rounded-lg shadow-md w-full max-w-10xl mx-auto">
        <h1 className="text-3xl font-medium">Top Doctors to Book</h1>
        <p className="sm:w-1/3 text-center text-sm">
          Simply browse through our extensive list of trusted doctors.
        </p>

        <div className="w-full overflow-hidden relative">
          <motion.div
            className="flex gap-4 pt-5 px-3 sm:px-0"
            animate={{ x: ["0%", "-100%"] }}
            transition={{ ease: "linear", duration: 15, repeat: Infinity }}
          >
            {doctors.slice(0, 10).map((item, index) => (
              <div
                key={index}
                onClick={() => {
                  navigate(`/appointment/${item._id}`);
                  scrollTo(0, 0);
                }}
                className="border border-[#C9D8FF] rounded-xl overflow-hidden cursor-pointer hover:scale-105 transition-all duration-500 min-w-[250px] bg-white bg-opacity-80"
              >
                <img className="bg-[#EAEFFF]" src={item.image} alt="" />
                <div className="p-4">
                  <div
                    className={`flex items-center gap-2 text-sm text-center ${
                      item.available ? "text-green-500" : "text-gray-500"
                    }`}
                  >
                    <p
                      className={`w-2 h-2 rounded-full ${
                        item.available ? "bg-green-500" : "bg-gray-500"
                      }`}
                    ></p>
                    <p>{item.available ? "Available" : "Not Available"}</p>
                  </div>
                  <p className="text-[#262626] text-lg font-medium">
                    {item.name}
                  </p>
                  <p className="text-[#5C5C5C] text-sm">{item.speciality}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        <button
          onClick={() => {
            navigate("/doctors");
            scrollTo(0, 0);
          }}
          className="bg-[#EAEFFF] text-gray-600 px-12 py-3 rounded-full mt-10"
        >
          more
        </button>
      </div>
    </div>
  );
};

export default TopDoctors;
