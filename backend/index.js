import express from "express";
import fs from "fs";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const FILE = "./cs_c_students.json";

// helper functions
const readData = () => {
  try {
   return JSON.parse(fs.readFileSync(FILE))
  } catch (error) {
    console.log("unable to read file");    
  }
};
const writeData = (data) => fs.writeFileSync(FILE, JSON.stringify(data, null, 2));

/* CREATE */
app.post("/students", (req, res) => {
  console.log(req.body);
  
  const students = readData();
  let updatedData = [];
  if (!students) updatedData = [{ id: Date.now(), ...req.body }];
  else updatedData = [...students, { id: Date.now(), ...req.body }];

  writeData(updatedData);

  res.json(req.body);
});

/* READ */
app.get("/students", (req, res) => {
  const data = readData();
  console.log(data.length);
  res.json(readData());
});

/* UPDATE */
app.put("/students/:id", (req, res) => {
  let students = readData();
  const id = Number(req.params.id);

  students = students.map(s =>
    s.id === id ? { ...s, ...req.body } : s
  );

  writeData(students);
  res.json({ message: "Updated" });
});

/* DELETE */
app.delete("/students/:id", (req, res) => {
  const id = Number(req.params.id);
  const students = readData().filter(s => s.id !== id);

  writeData(students);
  res.json({ message: "Deleted" });
});

app.listen(5000, () => console.log("Server running on 5000"));
