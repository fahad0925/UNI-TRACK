"use client";

import React from "react";
import { motion } from "framer-motion";
import { dowInfo, univerisities } from "../constants/constant";
import Link from "next/link";
import { useLocalUniSubject } from "../constants/UseLocalUniSubject";

const Page = () => {
  const [uniSubject, setUniSubject] = useLocalUniSubject();
  const uni = univerisities[2]; // DOW

  return (
    <div className="min-h-screen w-full bg-[#050510] text-[#E6F1FF] overflow-hidden flex flex-col items-center">
      {/* ================= HERO SECTION ================= */}
      <section className="relative w-[95%] sm:w-[90%] xl:w-[80%] h-[70vh] overflow-hidden mt-10 rounded-3xl border-[3px] border-[#155E75]/70 shadow-[0_0_50px_rgba(6,182,212,0.2)]">
        {/* Glowing Ellipses */}
        <div className="absolute inset-0">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.4, scale: 1 }}
            transition={{ duration: 2 }}
            className="absolute w-[600px] h-[600px] bg-[#06B6D4]/40 blur-[180px] top-[-100px] left-[-200px]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.3, scale: 1 }}
            transition={{ duration: 2.5 }}
            className="absolute w-[800px] h-[800px] bg-[#0E7490]/30 blur-[200px] bottom-[-200px] right-[-250px]"
          />
        </div>

        {/* Background Image */}
        <motion.img
          src={uni.img}
          alt="DOW UNI"
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.4 }}
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#000000]/60 via-[#0A0F24]/80 to-[#050510]" />

        {/* Text Overlay */}
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-6">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-5xl sm:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[#06B6D4] via-[#0EA5E9] to-[#0E7490] drop-shadow-[0_0_15px_rgba(6,182,212,0.6)]"
          >
            {uni.name}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.3 }}
            className="text-lg sm:text-xl text-[#E0F2FE] mt-4 max-w-[700px] leading-relaxed"
          >
            Dow University of Health Sciences — Shaping the Future of Healthcare
            in Pakistan.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.6 }}
            className="mt-8"
          >
            <Link href="/FAST/QUIZ">
              <motion.button
                onClick={() => setUniSubject(2)}
                whileHover={{ scale: 1.07 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-3 rounded-full border-2 border-[#06B6D4] text-[#E6F1FF] font-semibold hover:bg-[#06B6D4] hover:text-black transition-all duration-300 shadow-[0_0_25px_rgba(6,182,212,0.5)]"
              >
                Take the DOW Entry Test 🩺
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ================= MAIN BODY ================= */}
      <div className="w-[95%] sm:w-[90%] xl:w-[80%] my-10 border-[6px] border-[#155E75]/70 rounded-3xl overflow-hidden shadow-[0_0_40px_rgba(6,182,212,0.2)] bg-gradient-to-b from-[#050510] via-[#0A0F24] to-[#050510] py-16 px-6 sm:px-10 space-y-16">
        {/* Quick Info */}
        <div className="grid sm:grid-cols-3 gap-8">
          {[
            { label: "Founded", value: "1945" },
            { label: "Location", value: "Karachi, Pakistan" },
            { label: "Specialization", value: "Medical & Health Sciences" },
          ].map((info, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="p-6 rounded-2xl bg-[#0A192F]/70 border-2 border-[#155E75]/80 text-center shadow-[0_0_25px_rgba(6,182,212,0.3)] hover:shadow-[0_0_40px_rgba(6,182,212,0.4)] transition-all duration-300"
            >
              <h3 className="text-[#06B6D4] font-semibold text-lg">
                {info.label}
              </h3>
              <p className="text-[#E6F1FF] text-xl font-bold mt-1">
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
          className="p-10 rounded-3xl border-2 border-[#155E75]/80 bg-[#0B1220]/80 shadow-[0_0_40px_rgba(6,182,212,0.2)]"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-6 bg-gradient-to-r from-[#06B6D4] via-[#0EA5E9] to-[#0E7490] text-transparent bg-clip-text">
            Why Choose DOW University?
          </h2>
          <p className="text-lg leading-relaxed text-[#D1E9FF]">
            Dow University of Health Sciences (DUHS) is one of Pakistan’s most
            prestigious medical institutions. Renowned for its state-of-the-art
            hospitals, innovative research, and globally recognized programs,
            DUHS provides world-class healthcare education. With a strong focus
            on practical clinical exposure, ethics, and compassion, Dow
            graduates are leaders in medicine both locally and internationally.
            Its modern simulation centers, digital libraries, and top-tier
            faculty make DUHS a hub for medical excellence.
          </p>
        </motion.section>

        {/* TEST INFORMATION */}
        <motion.section
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="p-10 rounded-3xl border-2 border-[#155E75]/80 bg-[#0B1220]/80 shadow-[0_0_40px_rgba(6,182,212,0.2)]"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-8 bg-gradient-to-r from-[#06B6D4] via-[#0EA5E9] to-[#0E7490] text-transparent bg-clip-text">
            Test Information
          </h2>
          <div className="grid sm:grid-cols-2 gap-6 text-lg text-[#E6F1FF]">
            <p>
              <span className="font-semibold text-[#06B6D4]">
                Total Duration:
              </span>{" "}
              {uni.time}
            </p>
            <p>
              <span className="font-semibold text-[#06B6D4]">Questions:</span>{" "}
              {uni.questions}
            </p>
            <p>
              <span className="font-semibold text-[#06B6D4]">Negative:</span>{" "}
              {uni.negative}
            </p>
            <p>
              <span className="font-semibold text-[#06B6D4]">Calculator:</span>{" "}
              {uni.calculator}
            </p>
            <p className="col-span-2">
              <span className="font-semibold text-[#06B6D4]">Sections:</span>{" "}
              {uni.sections.join(", ")}
            </p>
            <p className="col-span-2">
              <span className="font-semibold text-[#06B6D4]">Note:</span>{" "}
              {uni.note}
            </p>
          </div>
        </motion.section>

        {/* TABLE */}
        <motion.section
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="p-8 rounded-3xl border-2 border-[#155E75]/80 bg-[#0B1220]/80 shadow-[0_0_40px_rgba(6,182,212,0.2)]"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-8 bg-gradient-to-r from-[#06B6D4] via-[#0EA5E9] to-[#0E7490] text-transparent bg-clip-text">
            Section-wise Breakdown
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-center border-collapse text-[#E6F1FF]">
              <thead className="bg-[#1E293B]/70 text-[#06B6D4]">
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
                      className="px-4 py-3 border-b border-[#155E75]/70 font-semibold"
                    >
                      {head}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {dowInfo.map((data, i) => (
                  <motion.tr
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="hover:bg-[#155E75]/40 transition-all duration-300"
                  >
                    <td className="px-4 py-3 border-b border-[#155E75]/70">
                      {data.name}
                    </td>
                    <td className="px-4 py-3 border-b border-[#155E75]/70">
                      {data.questions}
                    </td>
                    <td className="px-4 py-3 border-b border-[#155E75]/70">
                      {data.time}
                    </td>
                    <td className="px-4 py-3 border-b border-[#155E75]/70">
                      {data.weightage}
                    </td>
                    <td className="px-4 py-3 border-b border-[#155E75]/70">
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
                onClick={() => setUniSubject(2)}
                whileHover={{ scale: 1.07 }}
                whileTap={{ scale: 0.95 }}
                className="sm:px-20 sm:py-5 px-12 py-4 rounded-3xl border-2 border-[#06B6D4] text-[#E6F1FF] font-semibold hover:bg-[#06B6D4] hover:text-black transition duration-300 shadow-[0_0_30px_rgba(6,182,212,0.4)]"
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
