"use client";

import React from "react";
import { dowInfo, univerisities } from "../constants/constant";
import Link from "next/link";
import { useLocalUniSubject } from "../constants/UseLocalUniSubject";

const page = () => {
  const [uniSubject, setUniSubject] = useLocalUniSubject();
  return (
    <>
      <div className="">
        <div className="bg-gradient-to-r  p-3  sm:p-10  from-cyan-700 via-cyan-800 to-cyan-950 sm:mb-0.5 ">
          <div className="justify-evenly flex gap-13 sm:gap-0 flex-col  lg:flex-row">
            <div className=" w-full xl:w-[40%] flex justify-center items-center">
              <h1 className=" text-4xl sm:text-4xl  font-bold lg:text-5xl xl:text-6xl mt-15 sm:mt-0 w-full xl:w-[65%] ">
                {univerisities[2].name}
              </h1>
            </div>
            <div className="sm:mt-10">
              <img
                className="border-4 border-black rounded-xl w-[90vh]"
                src={univerisities[2].img}
                alt="DOW"
              />
            </div>
          </div>

          <div className="border border-gray-200 p-4 my-[10vh] rounded-2xl">
            <h1 className="text-4xl font-bold text-slate-100 text-center mb-4 tracking-wide">
              🩺 Why Choose Dow University of Health Sciences (DUHS)?
            </h1>
            <h1 className="text-2xl font-stretch-50%  text-slate-100 mb-4 tracking-tighter">
              Dow University stands as a leading medical institution in
              Pakistan, known for its commitment to excellence in healthcare
              education, research, and clinical training. With state-of-the-art
              medical facilities, teaching hospitals, and internationally
              recognized programs, DUHS provides students with hands-on
              experience in real healthcare environments. Its focus on producing
              compassionate, skilled, and ethical healthcare professionals makes
              it the top choice for students who aspire to contribute to
              Pakistan’s medical and healthcare sector at the highest level.
            </h1>
          </div>
        </div>
        {/* test information */}
        {/* purple end */}

        <div className="bg-gradient-to-b p-2 sm:p-10 from-cyan-700 via-cyan-950 to-black">
          <div className="border border-gray-200 p-4 sm:my-[10vh] rounded-2xl">
            <div>
              <h1 className="text-4xl font-bold text-slate-100 text-center mb-4 tracking-wide">
                Test Information
              </h1>
              <h1 className="  text-2xl font-stretch-50% text-slate-100 mb-4 tracking-tighter">
                <span className="font-semibold text-2xl  md:text-3xl">
                  {" "}
                  Total Duration:
                </span>{" "}
                {univerisities[2].time}
              </h1>
              <h1 className="text-2xl font-stretch-50% text-slate-100 mb-4 tracking-tighter">
                <span className="font-semibold text-2xl  md:text-3xl ">
                  {" "}
                  Question:{" "}
                </span>{" "}
                {univerisities[2].questions}
              </h1>
              <h1 className="text-2xl font-stretch-50% text-slate-100 mb-4 tracking-tighter">
                <span className="font-semibold text-2xl  md:text-3xl ">
                  {" "}
                  Negative:{" "}
                </span>{" "}
                {univerisities[2].negative}
              </h1>
              <h1 className="text-2xl font-stretch-50% text-slate-100 mb-4 tracking-tighter">
                <span className="font-semibold text-2xl  md:text-3xl ">
                  {" "}
                  Calculator:
                </span>{" "}
                {univerisities[2].calculator}
              </h1>
              <h1 className="text-2xl font-stretch-50% text-slate-100 mb-4 tracking-tighter">
                <span className="font-semibold  text-2xl  md:text-3xl">
                  {" "}
                  Sections:{" "}
                </span>{" "}
                {univerisities[2].sections}
              </h1>
              <h1 className="text-2xl font-stretch-50% text-slate-100 mb-4 tracking-tighter">
                <span className="font-semibold  text-2xl  md:text-3xl">
                  {" "}
                  Note:
                </span>{" "}
                {univerisities[2].note}
              </h1>
            </div>
          </div>

          {/* section-wise */}
          <h1 className="text-4xl font-bold text-slate-100 text-center  mt-20 sm:mt-0 mb-4 pb-10 tracking-wide">
            Section-wise breakdown
          </h1>
          <div className="overflow-x-auto">
            <div className="p-4  rounded-2xl">
              <table className="table-auto border-collapse border border-gray-400 w-full text-center min-w-full  ">
                <thead>
                  <tr>
                    <th className="border-2 border-gray-400 sm:px-4 sm:py-2 px-2">
                      Section
                    </th>
                    <th className="border-2 border-gray-400 px-1 sm:px-4 sm:py-2">
                      Questions
                    </th>
                    <th className="border-2 border-gray-400 px-1 sm:px-4 sm:py-2">
                      TIME
                    </th>
                    <th className="border-2 border-gray-400 px-1 sm:px-4 sm:py-2">
                      Weightage
                    </th>
                    <th className="border-2 border-gray-400 px-1 sm:px-4 sm:py-2">
                      Negative
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {dowInfo.map((data, i) => (
                    <tr key={i}>
                      <td className="border border-gray-400 px-1 sm:px-4 sm:py-2">
                        {data.name}
                      </td>
                      <td className="border border-gray-400 px-1 sm:px-4 sm:py-2">
                        {data.questions}
                      </td>
                      <td className="border border-gray-400 px-1 sm:px-4 sm:py-2">
                        {data.time}
                      </td>
                      <td className="border border-gray-400 px-1 sm:px-4 sm:py-2">
                        {data.weightage}
                      </td>
                      <td className="border border-gray-400 px-1 sm:px-4 sm:py-2">
                        {data.negative}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="flex justify-center py-20">
            <Link href="/FAST/QUIZ">
              <button
                onClick={() => setUniSubject(2)}
                className="sm:px-20 sm:py-5 px-15 py-4 rounded-3xl border-2 border-cyan-600 text-cyan-600 font-semibold hover:bg-cyan-600 hover:text-white transition duration-300"
              >
                Take the Intellect Trial🧠
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
