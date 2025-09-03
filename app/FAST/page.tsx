import React from "react";
import { dowInfo, fastInfo, univerisities } from "../constants/constant";
import Link from "next/link";

const page = () => {
  return (
    <>
      <div className="">
        <div className="bg-gradient-to-r  p-3  sm:p-10  from-cyan-700 via-cyan-950 to-black mb-4 ">
          <div className="justify-evenly flex gap-13 sm:gap-0 flex-col  lg:flex-row">
            <div className=" w-[100%] lg:w-[40%] flex justify-center items-center">
              <h1 className=" text-4xl sm:text-6xl mt-15 sm:mt-0 w-[100%] lg:w-[65%] ">
                {univerisities[1].name}
              </h1>
            </div>
            <div>
              <img
                className="border-4 border-black rounded-xl"
                src={univerisities[1].img}
                alt="FAST"
              />
            </div>
          </div>

          <div className="border border-gray-200 p-4 my-[10vh] rounded-2xl">
            <h1 className="text-4xl font-bold text-slate-100 text-center mb-4 tracking-wide">
              💻 Why Choose FAST National University of Computer & Emerging
              Sciences?
            </h1>
            <h1 className="text-2xl font-bold text-slate-100 mb-4 tracking-tighter">
              FAST University is regarded as one of the top institutions for
              computer science, software engineering, and emerging technologies
              in Pakistan. Known for its rigorous academic standards and highly
              qualified faculty, FAST equips students with strong programming,
              analytical, and problem-solving skills. The university has close
              links with the tech industry, offering students opportunities for
              internships, research, and placements in leading software
              companies. Its reputation for excellence in IT education, along
              with its modern campuses and research-driven environment, makes
              FAST the first choice for students passionate about technology and
              innovation.
            </h1>
          </div>
        </div>
        {/* test information */}
        {/* purple end */}

        <div className="bg-gradient-to-b sm:p-10 rom-cyan-700 via-cyan-950 to-black">
          <div className="border border-gray-200 p-4 my-[10vh] rounded-2xl">
            <div>
              <h1 className="text-4xl font-bold text-slate-100 text-center mb-4 tracking-wide">
                Test Information
              </h1>
              <h1 className="text-3xl font-bold text-slate-100 mb-4 tracking-tighter">
                Total Duration: {univerisities[1].time}
              </h1>
              <h1 className="text-3xl font-bold text-slate-100 mb-4 tracking-tighter">
                Question: {univerisities[1].questions}
              </h1>
              <h1 className="text-3xl font-bold text-slate-100 mb-4 tracking-tighter">
                Negative: {univerisities[1].negative}
              </h1>
              <h1 className="text-3xl font-bold text-slate-100 mb-4 tracking-tighter">
                Calculator: {univerisities[1].calculator}
              </h1>
              <h1 className="text-3xl font-bold text-slate-100 mb-4 tracking-tighter">
                Sections: {univerisities[1].sections}
              </h1>
              <h1 className="text-3xl font-bold text-slate-100 mb-4 tracking-tighter">
                Note: {univerisities[1].note}
              </h1>
            </div>
          </div>

          {/* section-wise */}
          <div>
            <div className="p-4  rounded-2xl">
              <h1 className="text-4xl font-bold text-slate-100 text-center mb-4 pb-10 tracking-wide">
                Section-wise breakdown
              </h1>

              <table className="table-auto border-collapse border border-gray-400 w-full text-center">
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
                  {fastInfo.map((data, i) => (
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
              <button className="px-20 py-5 rounded-3xl border-2 border-cyan-600 text-cyan-600 font-semibold hover:bg-cyan-600 hover:text-white transition duration-300">
                Try Admission Test
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
