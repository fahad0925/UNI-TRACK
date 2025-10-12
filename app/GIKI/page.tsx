"use client";

import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import CountUp from "react-countup";
import { gikiInfo, univerisities } from "../constants/constant";
import { useLocalUniSubject } from "../constants/UseLocalUniSubject";

const Page = () => {
  const [uniSubject, setUniSubject] = useLocalUniSubject();
  const uni = univerisities[11]; // GIKI

  const { scrollY } = useScroll();
  const yText = useTransform(scrollY, [0, 300], [0, -100]);

  return (
    <div className="min-h-screen w-full bg-[#0A0B1A] text-gray-100 overflow-hidden">
      {/* ================= HERO ================= */}
      <section className="flex justify-center py-8 sm:py-14 relative">
        <div className="relative w-[95%] sm:w-[90%] xl:w-[70%] h-[50vh] sm:h-[65vh] overflow-hidden rounded-3xl shadow-2xl border-4 border-gray-400/30">
          <motion.img
            src={uni.img}
            alt={uni.name[0]}
            className="absolute inset-0 w-full h-full object-cover border-2 border-gray-300/40"
            initial={{ scale: 1.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.8, ease: "easeOut" }}
          />

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2 }}
            className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/90"
          />

          <motion.div
            style={{ y: yText }}
            className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 sm:px-10"
          >
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="text-4xl sm:text-6xl font-extrabold tracking-tight text-gray-200 drop-shadow-[0_0_25px_rgba(255,255,255,0.5)]"
            >
              {uni.name[0]}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.4, delay: 0.3 }}
              className="text-lg sm:text-xl text-cyan-300/90 mt-4 max-w-[700px] leading-relaxed font-medium tracking-wide"
            >
              {uni.name[1]}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, delay: 0.6 }}
              className="mt-8"
            >
              <Link href="/GIKI/QUIZ">
                <motion.button
                  onClick={() => setUniSubject(10)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 rounded-full bg-gradient-to-r from-cyan-100 via-gray-200 to-[#0A0B3F] hover:from-cyan-400 hover:to-gray-100 text-gray-900 font-semibold tracking-wide shadow-[0_0_25px_rgba(175,238,238,0.4)] hover:shadow-[0_0_45px_rgba(175,238,238,0.7)] transition-all duration-300"
                >
                  Take the GIKI Aptitude Challenge ⚡
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ================= CONTENT ================= */}
      <div className="flex justify-center">
        <div className="w-[95%] sm:w-[90%] xl:w-[70%] px-6 sm:px-10 py-16 border-4 border-gray-300/30 rounded-3xl bg-[#0A0B1A]/80 shadow-xl backdrop-blur-md">
          {/* ABOUT GIKI */}
          <motion.section
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="relative mb-16 bg-gradient-to-br from-[#0A0B1A]/70 to-[#0A0B3F]/80 border border-gray-300/30 p-8 sm:p-12 rounded-3xl backdrop-blur-md shadow-xl overflow-hidden"
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-300 via-gray-200 to-white rounded-3xl blur opacity-20 animate-pulse"></div>
            <div className="relative z-10">
              <h2 className="text-3xl sm:text-4xl font-bold text-center mb-6 text-gray-200">
                Why Choose GIKI?
              </h2>
              <p className="text-lg leading-relaxed text-slate-300 tracking-tight">
                Ghulam Ishaq Khan Institute of Engineering Sciences and
                Technology (GIKI) is one of Pakistan’s top engineering
                institutions. Known for innovation, advanced research labs, and
                international collaborations, GIKI develops leaders in
                engineering, technology, and applied sciences. The campus
                combines academic rigor with practical problem-solving,
                producing highly skilled graduates.
              </p>
            </div>

            {/* Floating Info Cards */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10 relative z-10">
              {[
                {
                  title: "Top Ranked",
                  desc: "Among Pakistan’s elite engineering universities.",
                },
                {
                  title: "Research Labs",
                  desc: "Advanced labs for multiple engineering disciplines.",
                },
                {
                  title: "Global Alumni",
                  desc: "Graduates contributing worldwide.",
                },
                {
                  title: "Industry Link",
                  desc: "Strong collaborations with tech & engineering firms.",
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.05, rotateX: 4, rotateY: -4 }}
                  className="bg-gradient-to-br from-[#0A0B1A] to-[#0A0B3F] border border-cyan-300/40 rounded-2xl p-6 text-center shadow-lg hover:shadow-cyan-300/30 transition"
                >
                  <h3 className="text-xl font-semibold text-cyan-300 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-slate-300 text-sm">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Animated Divider */}
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            whileInView={{ width: "100%", opacity: 1 }}
            transition={{ duration: 1.2 }}
            className="h-[2px] bg-gradient-to-r from-cyan-300 via-gray-200 to-white my-16"
          />

          {/* COUNTER STATS */}
          <motion.section
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="grid sm:grid-cols-3 gap-6 mb-16"
          >
            {[
              { value: 92, suffix: "%", label: "Employment Rate" },
              { value: 12000, suffix: "+", label: "Alumni Worldwide" },
              { value: 55, suffix: "+", label: "Corporate Partners" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05 }}
                className="bg-gradient-to-br from-[#0A0B1A] to-[#0A0B3F] border border-cyan-300/40 rounded-2xl p-8 text-center shadow-lg hover:shadow-cyan-300/20 transition"
              >
                <h3 className="text-5xl font-bold text-cyan-300 mb-2">
                  <CountUp end={stat.value} duration={3} />
                  {stat.suffix}
                </h3>
                <p className="text-slate-300 text-lg">{stat.label}</p>
              </motion.div>
            ))}
          </motion.section>

          {/* TEST INFO */}
          <motion.section
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="mb-16 bg-gradient-to-br from-[#0A0B1A] to-[#0A0B3F] border border-cyan-300/30 p-8 sm:p-12 rounded-3xl shadow-xl backdrop-blur-md"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-8 text-gray-200">
              Test Information
            </h2>

            <div className="grid sm:grid-cols-2 gap-6 text-lg text-slate-300">
              <p>
                <span className="font-semibold text-cyan-300">
                  Total Duration:
                </span>{" "}
                {uni.time}
              </p>
              <p>
                <span className="font-semibold text-cyan-300">Questions:</span>{" "}
                {uni.questions}
              </p>
              <p>
                <span className="font-semibold text-cyan-300">Negative:</span>{" "}
                {uni.negative}
              </p>
              <p>
                <span className="font-semibold text-cyan-300">Calculator:</span>{" "}
                {uni.calculator}
              </p>
              <p className="col-span-2">
                <span className="font-semibold text-cyan-300">Sections:</span>{" "}
                {uni.sections.join(", ")}
              </p>
              <p className="col-span-2">
                <span className="font-semibold text-cyan-300">Note:</span>{" "}
                {uni.note}
              </p>
            </div>
          </motion.section>

          {/* SECTION-WISE TABLE */}
          <motion.section
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="bg-[#0A0B1A]/40 border border-cyan-300/40 rounded-3xl backdrop-blur-md shadow-xl"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-8 mt-8 text-gray-200">
              Section-wise Breakdown
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full text-center border-collapse text-slate-300">
                <thead className="bg-cyan-900/40 text-cyan-200">
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
                        className="px-4 py-3 border-b border-cyan-300/30 font-semibold"
                      >
                        {head}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {gikiInfo.map((data, i) => (
                    <motion.tr
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="hover:bg-cyan-300/20 transition-all duration-300"
                    >
                      <td className="px-4 py-3 border-b border-cyan-300/30">
                        {data.name}
                      </td>
                      <td className="px-4 py-3 border-b border-cyan-300/30">
                        {data.questions}
                      </td>
                      <td className="px-4 py-3 border-b border-cyan-300/30">
                        {data.time}
                      </td>
                      <td className="px-4 py-3 border-b border-cyan-300/30">
                        {data.weightage}
                      </td>
                      <td className="px-4 py-3 border-b border-cyan-300/30">
                        {data.negative}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.section>
        </div>
      </div>
    </div>
  );
};

export default Page;
