"use client";

import React from "react";
import { motion } from "framer-motion";
import { nedInfo, univerisities } from "../constants/constant";
import Link from "next/link";
import { useLocalUniSubject } from "../constants/UseLocalUniSubject";

const Page = () => {
  const [uniSubject, setUniSubject] = useLocalUniSubject();
  const uni = univerisities[0]; // NED

  return (
    <div className="min-h-screen w-full bg-[#050510] text-[#E0E7FF] overflow-hidden flex flex-col items-center">
      {/* ================= HERO SECTION ================= */}
      <section className="relative w-[95%] sm:w-[90%] xl:w-[80%] h-[70vh] overflow-hidden mt-10 rounded-3xl border-[3px] border-[#3B82F6]/50 shadow-[0_0_60px_rgba(99,102,241,0.25)]">
        {/* Glowing Ellipses */}
        <div className="absolute inset-0">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.5, scale: 1 }}
            transition={{ duration: 2 }}
            className="absolute w-[600px] h-[600px] bg-[#6366F1]/40 blur-[160px] top-[-100px] left-[-150px]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.3, scale: 1 }}
            transition={{ duration: 2.3 }}
            className="absolute w-[800px] h-[800px] bg-[#8B5CF6]/30 blur-[200px] bottom-[-200px] right-[-200px]"
          />
        </div>

        {/* Background Image */}
        <motion.img
          src={uni.img}
          alt={uni.name[0]}
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.4 }}
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-[#0A0F24]/80 to-[#050510]" />

        {/* Text Overlay */}
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-6">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-5xl sm:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[#818CF8] via-[#6366F1] to-[#3B82F6] drop-shadow-[0_0_15px_rgba(99,102,241,0.6)]"
          >
            {uni.name[0]}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.3 }}
            className="text-lg sm:text-xl text-[#CBD5E1] mt-4 max-w-[700px] leading-relaxed"
          >
            {uni.name[1]}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.6 }}
            className="mt-8"
          >
            <Link href="/FAST/QUIZ">
              <motion.button
                onClick={() => setUniSubject(1)}
                whileHover={{ scale: 1.07 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-3 rounded-full border-2 border-[#6366F1] text-[#E0E7FF] font-semibold hover:bg-[#6366F1] hover:text-white transition-all duration-300 shadow-[0_0_25px_rgba(99,102,241,0.4)]"
              >
                Take the NED Entry Test 🚀
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ================= MAIN BODY ================= */}
      <div className="w-[95%] sm:w-[90%] xl:w-[80%] my-10 border-[6px] border-[#1E3A8A]/70 rounded-3xl overflow-hidden shadow-[0_0_40px_rgba(99,102,241,0.2)] bg-gradient-to-b from-[#050510] via-[#0A0F24] to-[#050510] py-16 px-6 sm:px-10 space-y-16">
        {/* Quick Info */}
        <div className="grid sm:grid-cols-3 gap-8">
          {[
            { label: "Founded", value: "1921" },
            { label: "Location", value: "Karachi, Pakistan" },
            { label: "Ranking", value: "#1 in Engineering (Sindh)" },
          ].map((info, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="p-6 rounded-2xl bg-[#0A192F]/70 border-2 border-[#3B82F6]/40 text-center shadow-[0_0_25px_rgba(99,102,241,0.3)] hover:shadow-[0_0_40px_rgba(99,102,241,0.4)] transition-all duration-300"
            >
              <h3 className="text-[#818CF8] font-semibold text-lg">
                {info.label}
              </h3>
              <p className="text-[#E0E7FF] text-xl font-bold mt-1">
                {info.value}
              </p>
            </motion.div>
          ))}
        </div>

        {/* ABOUT SECTION */}
        <motion.section
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="p-10 rounded-3xl border-2 border-[#3B82F6]/40 bg-[#0B1220]/80 shadow-[0_0_40px_rgba(99,102,241,0.2)]"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-6 bg-gradient-to-r from-[#818CF8] via-[#6366F1] to-[#3B82F6] text-transparent bg-clip-text">
            Why Choose NED University of Engineering & Technology?
          </h2>
          <p className="text-lg leading-relaxed text-[#C7D2FE]">
            NED University is one of Pakistan’s most prestigious engineering
            institutions. Known for its excellence in education, research, and
            innovation, it provides world-class facilities, experienced faculty,
            and a diverse academic culture that empowers students to lead in
            modern technological and industrial landscapes.
          </p>
        </motion.section>

        {/* TEST INFO */}
        <motion.section
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="p-10 rounded-3xl border-2 border-[#3B82F6]/40 bg-[#0B1220]/80 shadow-[0_0_40px_rgba(99,102,241,0.2)]"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-8 bg-gradient-to-r from-[#818CF8] to-[#3B82F6] text-transparent bg-clip-text">
            Test Information
          </h2>
          <div className="grid sm:grid-cols-2 gap-6 text-lg text-[#E0E7FF]">
            <p>
              <span className="font-semibold text-[#818CF8]">
                Total Duration:
              </span>{" "}
              {uni.time}
            </p>
            <p>
              <span className="font-semibold text-[#818CF8]">Questions:</span>{" "}
              {uni.questions}
            </p>
            <p>
              <span className="font-semibold text-[#818CF8]">Negative:</span>{" "}
              {uni.negative}
            </p>
            <p>
              <span className="font-semibold text-[#818CF8]">Calculator:</span>{" "}
              {uni.calculator}
            </p>
            <p className="col-span-2">
              <span className="font-semibold text-[#818CF8]">Sections:</span>{" "}
              {uni.sections.join(", ")}
            </p>
            <p className="col-span-2">
              <span className="font-semibold text-[#818CF8]">Note:</span>{" "}
              {uni.note}
            </p>
          </div>
        </motion.section>

        {/* TABLE SECTION */}
        <motion.section
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="p-8 rounded-3xl border-2 border-[#3B82F6]/40 bg-[#0B1220]/80 shadow-[0_0_40px_rgba(99,102,241,0.2)]"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-8 bg-gradient-to-r from-[#818CF8] to-[#3B82F6] text-transparent bg-clip-text">
            Section-wise Breakdown
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-center border-collapse text-[#E0E7FF]">
              <thead className="bg-[#1E293B]/70 text-[#C7D2FE]">
                <tr>
                  {[
                    "Section",
                    "Questions",
                    "Time",
                    "Weightage",
                    "Negative",
                  ].map((head, i) => (
                    <th
                      key={i}
                      className="px-4 py-3 border-b border-[#3B82F6]/40 font-semibold"
                    >
                      {head}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {nedInfo.map((data, i) => (
                  <motion.tr
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="hover:bg-[#1E3A8A]/30 transition-all duration-300"
                  >
                    <td className="px-4 py-3 border-b border-[#3B82F6]/30">
                      {data.name}
                    </td>
                    <td className="px-4 py-3 border-b border-[#3B82F6]/30">
                      {data.questions}
                    </td>
                    <td className="px-4 py-3 border-b border-[#3B82F6]/30">
                      {data.time}
                    </td>
                    <td className="px-4 py-3 border-b border-[#3B82F6]/30">
                      {data.weightage}
                    </td>
                    <td className="px-4 py-3 border-b border-[#3B82F6]/30">
                      {data.negative}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-center py-12">
            <Link href="/FAST/QUIZ">
              <motion.button
                onClick={() => setUniSubject(1)}
                whileHover={{ scale: 1.07 }}
                whileTap={{ scale: 0.95 }}
                className="sm:px-20 sm:py-5 px-12 py-4 rounded-3xl border-2 border-[#6366F1] text-[#E0E7FF] font-semibold hover:bg-[#6366F1] hover:text-white transition duration-300 shadow-[0_0_30px_rgba(99,102,241,0.4)]"
              >
                Take the Intellect Trial 🧠
              </motion.button>
            </Link>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default Page;
