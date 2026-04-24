import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const API = "https://abes-cs-cs-student-repo.onrender.com/students";

export default function App() {

  const [students, setStudents] = useState([]);

  const [form, setForm] = useState({
    name: "",
    roll: "",
    admission: "",
    email: "",
    sem: "",
    ip: ""
  });

  const [editingId, setEditingId] = useState(null);

  const fetchStudents = async () => {
    const res = await axios.get(API);
    setStudents(res.data);
  };

  useEffect(() => { fetchStudents(); }, []);

  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async () => {
    if (Object.values(form).some(v => v === "")) {
      alert("Fill all fields!");
      return;
    }

    if (editingId) {
      await axios.put(`${API}/${editingId}`, form);
      setEditingId(null);
    } else {
      await axios.post(API, form);
    }

    setForm({
      name: "",
      roll: "",
      admission: "",
      email: "",
      sem: "",
      ip: ""
    });

    fetchStudents();
  };

  const editStudent = (s) => {
    setForm({
      name: s.name,
      roll: s.roll,
      admission: s.admission,
      email: s.email,
      sem: s.sem,
      ip: s.ip
    });
    setEditingId(s.id);
  };

  const remove = async (id) => {
    await axios.delete(`${API}/${id}`);
    fetchStudents();
  };

  return (
    <div className="container">

      <h1>Student Management</h1>

      <div className="form">
        <input name="name" placeholder="Student Name" value={form.name} onChange={handleChange}/>
        <input name="roll" placeholder="Roll Number" value={form.roll} onChange={handleChange}/>
        <input name="admission" placeholder="Admission Number" value={form.admission} onChange={handleChange}/>
        <input name="email" placeholder="Personal Email" value={form.email} onChange={handleChange}/>
        <input name="sem" placeholder="Branch & Section" value={form.sem} onChange={handleChange}/>
        <input name="ip" placeholder="ip" value={form.ip} onChange={handleChange}/>

        <button onClick={submit}>
          {editingId ? "Update Student" : "Add Student"}
        </button>
      </div>

      <h2>Student Table</h2>

      <div className="table-box">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Roll</th>
              <th>Admission</th>
              <th>Email</th>
              <th>Branch</th>
              <th>ip</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {students.map(s => (
              <tr key={s.id}>
                <td>{s.name}</td>
                <td>{s.roll}</td>
                <td>{s.admission}</td>
                <td>{s.email}</td>
                <td>{s.sem}</td>
                <td><a href={s.github} target="_blank">Repo</a></td>
                <td>
                  <button onClick={() => editStudent(s)}>Edit</button>
                   {/* <button onClick={() => remove(s.id)}>Delete</button> */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}
