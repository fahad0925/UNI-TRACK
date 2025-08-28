import React from "react";
import { dowInfo, nedInfo, univerisities } from "../constants/constant";

const page = () => {
  return (
    <>
      <div className="">
        <div className="bg-gradient-to-r  p-3  sm:p-10  from-red-800 via-red-950 to-black mb-4 ">
          <div className="justify-evenly flex gap-13 sm:gap-0 flex-col  lg:flex-row">
            <div className=" w-[100%] lg:w-[40%] flex justify-center items-center">
              <h1 className=" text-4xl sm:text-6xl mt-15 sm:mt-0 w-[100%] lg:w-[65%] ">
                {univerisities[0].name}
              </h1>
            </div>
            <div>
              <img
                className="border-4 border-black rounded-xl"
                src={univerisities[0].img}
                alt="DOW"
              />
            </div>
          </div>

          <div className="border border-gray-200 p-4 my-[10vh] rounded-2xl">
            <h1 className="text-4xl font-bold text-slate-100 text-center mb-4 tracking-wide">
              🩺 Why Choose Dow University of Health Sciences (DUHS)?
            </h1>
            <h1 className="text-2xl font-bold text-slate-100 mb-4 tracking-tighter">
              NED University is one of the oldest and most prestigious
              engineering institutions in Pakistan, recognized for producing
              highly skilled engineers who excel both nationally and
              internationally. With a strong emphasis on practical learning,
              modern laboratories, and industry-focused curricula, NED equips
              students with the technical expertise needed in today’s
              competitive job market. Its affordable fee structure, wide range
              of engineering disciplines, and strong alumni network make it an
              excellent choice for aspiring engineers who want quality education
              with real-world impact.
            </h1>
          </div>
        </div>
        {/* test information */}
        {/* purple end */}

        <div className="bg-gradient-to-b sm:p-10 from-red-900 via-red-950 to-black">
          <div className="border border-gray-200 p-4 my-[10vh] rounded-2xl">
            <div>
              <h1 className="text-4xl font-bold text-slate-100 text-center mb-4 tracking-wide">
                Test Information
              </h1>
              <h1 className="text-3xl font-bold text-slate-100 mb-4 tracking-tighter">
                Total Duration: {univerisities[0].time}
              </h1>
              <h1 className="text-3xl font-bold text-slate-100 mb-4 tracking-tighter">
                Question: {univerisities[0].questions}
              </h1>
              <h1 className="text-3xl font-bold text-slate-100 mb-4 tracking-tighter">
                Negative: {univerisities[0].negative}
              </h1>
              <h1 className="text-3xl font-bold text-slate-100 mb-4 tracking-tighter">
                Calculator: {univerisities[0].calculator}
              </h1>
              <h1 className="text-3xl font-bold text-slate-100 mb-4 tracking-tighter">
                Sections: {univerisities[0].sections}
              </h1>
              <h1 className="text-3xl font-bold text-slate-100 mb-4 tracking-tighter">
                Note: {univerisities[0].note}
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
                  {nedInfo.map((data, i) => (
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
            <button className="px-20 py-5 rounded-3xl border-2 border-red-600 text-red-600 font-semibold hover:bg-purple-600 hover:text-white transition duration-300">
              Try Admission Test
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
