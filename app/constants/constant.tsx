export const univerisities = [
  {
    name: ["NED University of Engineering & Technology", "(NED)"],
    img: "/NED.jpg",
    text: "Prepare for one of top engineering universities. The NED test evaluates your skills in Mathematics, Physics, English, and Logical Reasoning, ensuring you are ready for an engineering career.",
    route: "/NED",

    questions: 100,
    time: "120 min",
    weightage: "100%",
    negative: "None",

    sections: [
      "Mathematics",
      " ",
      "Chemistry / Computer",
      " ",
      "Physics",
      " ",
      "English",
    ],

    note: "Duration 2 hours, no negative marking", // additional context
  },
  {
    name: [
      "National University of Computer and Emerging Sciences",
      "(FAST NUCES)",
    ],
    img: "/Fast.jpg",
    text: "Known for excellence in Computer Science and Engineering, FAST aptitude test challenges you in Mathematics, English, Analytical Ability, and IQ skills. Perfect for students aiming for a future in technology.",
    route: "/FAST",
    questions: "Varied", // exact number not publicly defined
    time: "Varied",
    calculator: "dont know",
    weightage: "100%",
    negative: "Unknown",
    sections: ["Biology", " ", "Chemistry", " ", "Physics", " ", "English"],
    note: [
      "Test covers Biology,",
      " ",
      "Chemistry, Physics & English.",
      " ",
      "Minimum passing marks ~50%",
    ], // based on general guidance
  },
  {
    title: `Dow
     University of Health 
     Sciences (DUHS)`,
    name: ["Dow University of Health Sciences (DUHS)"],
    img: "/Dow.jpg",
    text: "Aspiring to join the medical field? The DOW test measures your knowledge in Biology, Chemistry, Physics, and English, designed for students passionate about medicine and healthcare.",
    route: "/DOW",
    questions: "Varied", // exact number not publicly defined
    time: "Varied",
    calculator: "dont know",
    weightage: "100%",
    negative: "Unknown",
    sections: ["Biology", " ", "Chemistry", " ", "Physics", " ", "English"],
    note: [
      "Test covers Biology,",
      " ",
      "Chemistry, Physics & English.",
      " ",
      "Minimum passing marks ~50%",
    ], // based on general guidance
  },
  {
    name: ["NED University of Engineering & Technology", "(NED)"],
    img: "/NED.jpg",
    text: "Prepare for one of top engineering universities. The NED test evaluates your skills in Mathematics, Physics, English, and Logical Reasoning, ensuring you are ready for an engineering career.",
    route: "/NED",
  },
];
export const fastInfo = [
  {
    name: "Advanced Mathematics",
    questions: 50,
    time: "50 min",
    weightage: "50%",
    negative: "-0.25",
  },
  {
    name: "Basic Mathematics",
    questions: 20,
    time: "20 min",
    weightage: "20%",
    negative: "-0.25",
  },
  {
    name: "Analytical / IQ",
    questions: 20,
    time: "20 min",
    weightage: "20%",
    negative: "-0.25",
  },
  {
    name: "English",
    questions: 30,
    time: "30 min",
    weightage: "10%",
    negative: "-0.0833",
  },
  // Added verified NED entry test details:
];

export const nedInfo = [
  {
    name: "Mathematics",
    questions: 25,
    time: "30 min",
    weightage: "25%",
    negative: "None",
  },
  {
    name: "Physics",
    questions: 25,
    time: "30 min",
    weightage: "25%",
    negative: "None",
  },
  {
    name: "Chemistry / Computer Science",
    questions: 25,
    time: "30 min",
    weightage: "25%",
    negative: "None",
  },
  {
    name: "English",
    questions: 25,
    time: "30 min",
    weightage: "25%",
    negative: "None",
  },
  // You might prefer consistency: but as fastInfo covers NED whole structure above, no duplicate added here.
];

export const dowInfo = [
  {
    name: "Biology",
    questions: 45,
    time: "45 min",
    weightage: "25%",
    negative: "None",
  },
  {
    name: "Chemistry",
    questions: 45,
    time: "45 min",
    weightage: "25%",
    negative: "None",
  },
  {
    name: "Physics",
    questions: 45,
    time: "45 min",
    weightage: "25%",
    negative: "None",
  },
  {
    name: "English",
    questions: 45,
    time: "45 min",
    weightage: "25%",
    negative: "None",
  },
  // Added estimated DUHS entrance test data:
];
