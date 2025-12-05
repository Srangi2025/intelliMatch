// generateMockProfiles.cjs

const fs = require("fs");
const path = require("path");

const majors = ["Computer Science", "Mechanical Engineering", "EE", "Biology"];
const years = ["Freshman", "Sophomore", "Junior", "Senior"];

const studentSkills = ["Python", "R", "SolidWorks", "MATLAB", "Java", "React"];
const interests = [
  "machine learning",
  "robotics",
  "biomechanics",
  "data science",
  "renewable energy",
];

const departments = [
  "Computer Science",
  "Mechanical Engineering",
  "Electrical Engineering",
  "Biomedical Engineering",
];

const researchAreas = [
  "NLP",
  "Robotics",
  "Control systems",
  "CV",
  "Signal processing",
];

const requiredSkills = ["Python", "C++", "MATLAB", "TensorFlow", "CAD"];

function randomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomSubset(arr, min = 2, max = 4) {
  const copy = [...arr];
  const size = Math.floor(Math.random() * (max - min + 1)) + min;
  const out = [];

  while (out.length < size && copy.length > 0) {
    const idx = Math.floor(Math.random() * copy.length);
    out.push(copy.splice(idx, 1)[0]);
  }

  return out;
}

function generateStudents(count) {
  const students = [];

  for (let i = 1; i <= count; i++) {
    students.push({
      id: i,
      name: `Student ${i}`,
      major: randomItem(majors),
      year: randomItem(years),
      interests: randomSubset(interests),
      skills: randomSubset(studentSkills),
      availabilityHoursPerWeek: 5 + Math.floor(Math.random() * 6), // 5–10
    });
  }

  return students;
}

function generateProfessors(count) {
  const profs = [];

  for (let i = 1; i <= count; i++) {
    profs.push({
      id: i,
      name: `Dr. Professor ${i}`,
      department: randomItem(departments),
      labName: `IntelliLab ${i}`,
      researchAreas: randomSubset(researchAreas),
      requiredSkills: randomSubset(requiredSkills),
      minHoursPerWeek: 5 + Math.floor(Math.random() * 6), // 5–10
    });
  }

  return profs;
}

const DATA_DIR = path.join(process.cwd(), "data");

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

fs.writeFileSync(
  path.join(DATA_DIR, "students.json"),
  JSON.stringify(generateStudents(40), null, 2),
  "utf8"
);

fs.writeFileSync(
  path.join(DATA_DIR, "professors.json"),
  JSON.stringify(generateProfessors(20), null, 2),
  "utf8"
);

console.log("Mock profiles generated.");
