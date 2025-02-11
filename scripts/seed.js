import sqlite3 from "sqlite3";
import fs from "fs";
import path from "path";
import yaml from "js-yaml";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbConfigPath = path.join(__dirname, "../database.yaml");
const dbConfig = yaml.load(fs.readFileSync(dbConfigPath, "utf8"));

const { sqlite_path: sqlitePath } = dbConfig;

const db = new sqlite3.Database(sqlitePath);

const employees = [
  {
    full_name: "John Doe",
    email: "john.doe@example.com",
    phone_number: "+1234567890",
    date_of_birth: "1990-05-15",
    profile_picture: "uploads/john_doe.jpg",
    job_title: "Software Engineer",
    department: "Engineering",
    salary: 75000,
    start_date: "2022-06-01",
    end_date: null,
  },
  {
    full_name: "Jane Smith",
    email: "jane.smith@example.com",
    phone_number: "+9876543210",
    date_of_birth: "1985-08-22",
    profile_picture: "uploads/jane_smith.jpg",
    job_title: "Project Manager",
    department: "Management",
    salary: 90000,
    start_date: "2020-09-15",
    end_date: null,
  },
  {
    full_name: "Alice Johnson",
    email: "alice.johnson@example.com",
    phone_number: "+1122334455",
    date_of_birth: "1993-12-10",
    profile_picture: "uploads/alice_johnson.jpg",
    job_title: "UI/UX Designer",
    department: "Design",
    salary: 68000,
    start_date: "2021-03-20",
    end_date: null,
  },
  {
    full_name: "Bob Brown",
    email: "bob.brown@example.com",
    phone_number: "+1029384756",
    date_of_birth: "1988-11-30",
    profile_picture: "uploads/bob_brown.jpg",
    job_title: "Data Scientist",
    department: "AI Research",
    salary: 85000,
    start_date: "2019-08-01",
    end_date: null,
  },
  {
    full_name: "Charlie Green",
    email: "charlie.green@example.com",
    phone_number: "+9081726354",
    date_of_birth: "1995-03-05",
    profile_picture: "uploads/charlie_green.jpg",
    job_title: "DevOps Engineer",
    department: "Infrastructure",
    salary: 72000,
    start_date: "2023-01-10",
    end_date: null,
  },
  {
    full_name: "David White",
    email: "david.white@example.com",
    phone_number: "+5647382910",
    date_of_birth: "1982-07-22",
    profile_picture: "uploads/david_white.jpg",
    job_title: "Security Analyst",
    department: "Cybersecurity",
    salary: 94000,
    start_date: "2018-05-15",
    end_date: null,
  },
  {
    full_name: "Emma Black",
    email: "emma.black@example.com",
    phone_number: "+6172839450",
    date_of_birth: "1991-09-18",
    profile_picture: "uploads/emma_black.jpg",
    job_title: "HR Manager",
    department: "Human Resources",
    salary: 71000,
    start_date: "2021-06-20",
    end_date: null,
  },
  {
    full_name: "Frank Wilson",
    email: "frank.wilson@example.com",
    phone_number: "+8192736450",
    date_of_birth: "1987-04-25",
    profile_picture: "uploads/frank_wilson.jpg",
    job_title: "System Administrator",
    department: "IT Support",
    salary: 67000,
    start_date: "2017-12-01",
    end_date: null,
  },
  {
    full_name: "Grace Hall",
    email: "grace.hall@example.com",
    phone_number: "+4352610987",
    date_of_birth: "1994-02-11",
    profile_picture: "uploads/grace_hall.jpg",
    job_title: "Marketing Specialist",
    department: "Marketing",
    salary: 65000,
    start_date: "2022-04-30",
    end_date: null,
  },
  {
    full_name: "Henry Lee",
    email: "henry.lee@example.com",
    phone_number: "+3298745610",
    date_of_birth: "1989-06-13",
    profile_picture: "uploads/henry_lee.jpg",
    job_title: "Accountant",
    department: "Finance",
    salary: 78000,
    start_date: "2016-10-05",
    end_date: null,
  },
];

const timesheets = [
  {
    employee_id: 1,
    work_date: "2025-02-10",
    start_time: "08:00:00",
    end_time: "17:00:00",
    summary: "Developed authentication module.",
  },
  {
    employee_id: 2,
    work_date: "2025-02-11",
    start_time: "09:00:00",
    end_time: "18:00:00",
    summary: "Managed project deadlines.",
  },
  {
    employee_id: 3,
    work_date: "2025-02-12",
    start_time: "07:00:00",
    end_time: "16:00:00",
    summary: "Designed new UI components.",
  },
  {
    employee_id: 4,
    work_date: "2025-02-13",
    start_time: "10:00:00",
    end_time: "19:00:00",
    summary: "Analyzed user data trends.",
  },
  {
    employee_id: 5,
    work_date: "2025-02-14",
    start_time: "11:00:00",
    end_time: "20:00:00",
    summary: "Configured CI/CD pipelines.",
  },
  {
    employee_id: 6,
    work_date: "2025-02-15",
    start_time: "08:30:00",
    end_time: "17:30:00",
    summary: "Investigated security vulnerabilities.",
  },
  {
    employee_id: 7,
    work_date: "2025-02-16",
    start_time: "07:45:00",
    end_time: "16:45:00",
    summary: "Onboarded new employees.",
  },
  {
    employee_id: 8,
    work_date: "2025-02-17",
    start_time: "09:15:00",
    end_time: "18:15:00",
    summary: "Resolved server issues.",
  },
  {
    employee_id: 9,
    work_date: "2025-02-18",
    start_time: "10:00:00",
    end_time: "19:00:00",
    summary: "Executed digital marketing strategy.",
  },
  {
    employee_id: 10,
    work_date: "2025-02-19",
    start_time: "08:45:00",
    end_time: "17:45:00",
    summary: "Prepared financial reports.",
  },
];

const documents = [
  {
    employee_id: 1,
    file_path: "uploads/documents/john_doe_resume.pdf",
    file_type: "resume",
  },
  {
    employee_id: 1,
    file_path: "uploads/documents/john_doe_id.jpg",
    file_type: "id_card",
  },
  {
    employee_id: 2,
    file_path: "uploads/documents/jane_smith_contract.pdf",
    file_type: "contract",
  },
  {
    employee_id: 3,
    file_path: "uploads/documents/alice_johnson_portfolio.pdf",
    file_type: "portfolio",
  },
  {
    employee_id: 4,
    file_path: "uploads/documents/bob_brown_paper.pdf",
    file_type: "research_paper",
  },
  {
    employee_id: 5,
    file_path: "uploads/documents/charlie_green_cert.pdf",
    file_type: "certificate",
  },
  {
    employee_id: 6,
    file_path: "uploads/documents/david_white_training.pdf",
    file_type: "training_material",
  },
  {
    employee_id: 7,
    file_path: "uploads/documents/emma_black_policy.pdf",
    file_type: "policy_document",
  },
  {
    employee_id: 8,
    file_path: "uploads/documents/frank_wilson_manual.pdf",
    file_type: "technical_manual",
  },
];

const insertData = (table, data) => {
  const columns = Object.keys(data[0]).join(", ");
  const placeholders = Object.keys(data[0])
    .map(() => "?")
    .join(", ");

  const insertStmt = db.prepare(
    `INSERT INTO ${table} (${columns}) VALUES (${placeholders})`
  );

  data.forEach((row) => {
    insertStmt.run(Object.values(row));
  });

  insertStmt.finalize();
};

db.serialize(() => {
  insertData("employees", employees);
  insertData("timesheets", timesheets);
  insertData("documents", documents);
});

db.close((err) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log("Database seeded successfully.");
  }
});
