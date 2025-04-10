import React, { useState, useContext } from "react";
import StudentContext from "../context/student/studentContext";

export const Home = () => {
  const { addStudent } = useContext(StudentContext);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobno: "",
    semester: "",
    section: "",
    rollNumber: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addStudent(formData);
      alert("Registration successful!");
      setFormData({
        name: "",
        email: "",
        mobno: "",
        semester: "",
        section: "",
        rollNumber: "",
      });
    } catch (err) {
      console.error("Registration failed:", err.message);
      alert("Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-lg space-y-6"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Student Registration Form
        </h2>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Name
          </label>
          <input
            name="name"
            type="text"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Enter full name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Enter email address"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Mobile Number
          </label>
          <input
            name="mobno"
            type="tel"
            required
            value={formData.mobno}
            onChange={handleChange}
            pattern="[0-9]{10}"
            className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Enter 10-digit mobile number"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Semester
          </label>
          <input
            name="semester"
            type="text"
            required
            value={formData.semester}
            onChange={handleChange}
            className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="e.g., 6th"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Section
          </label>
          <input
            name="section"
            type="text"
            required
            value={formData.section}
            onChange={handleChange}
            className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="e.g., A or B"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Roll Number
          </label>
          <input
            name="rollNumber"
            type="text"
            required
            value={formData.rollNumber}
            onChange={handleChange}
            className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Enter roll number"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
};
