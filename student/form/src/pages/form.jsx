import React, { useState } from "react";
import { FaSpinner } from "react-icons/fa";
import logo from '../assets/photo_2024-10-21_09-34-09.jpg'; // Update the path to your logo image

const StudentForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    idNumber: "",
    sex: "",
    age: "",
    department: "",
    email: "",
    phoneNumber: "",
    interests: [],
    hasExperience: false,
    yearsOfExperience: 0,
    cv: null,
    universityDocument: null,
  });

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, checked } = e.target;

    if (name === "hasExperience") {
      setFormData({ ...formData, hasExperience: checked });
    } else if (name === "interests") {
      const interests = [...formData.interests];
      if (interests.includes(value)) {
        setFormData({
          ...formData,
          interests: interests.filter((interest) => interest !== value),
        });
      } else {
        setFormData({ ...formData, interests: [...interests, value] });
      }
    } else {
      setFormData({ ...formData, [name]: value.trim() });
    }
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({ ...formData, [name]: files[0] });
  };

  const validateForm = () => {
    for (const [key, value] of Object.entries(formData)) {
      if (!value && key !== "yearsOfExperience" && key !== "universityDocument") {
        return `Please fill in the required field: ${key}`;
      }
    }
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    const validationError = validateForm();
    if (validationError) {
      setErrorMessage(validationError);
      setLoading(false);
      return;
    }

    try {
      // Simulate form submission logic here
      console.log("Form submitted:", formData);

      // Reset form after submission
      setFormData({
        fullName: "",
        idNumber: "",
        sex: "",
        age: "",
        department: "",
        email: "",
        phoneNumber: "",
        interests: [],
        hasExperience: false,
        yearsOfExperience: 0,
        cv: null,
        universityDocument: null,
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      setErrorMessage("An error occurred while submitting the form.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-gray-300 flex items-center justify-center">
      <div className="w-full max-w-md p-6">
        <div className="flex items-center mb-4">
          <img src={logo} alt="Logo" className="mr-4 w-16 h-16 object-cover" /> {/* Logo with size */}
          <h2 className="text-2xl font-bold text-black-500">Student Registration</h2>
        </div>
        {errorMessage && <p className="text-red-600">{errorMessage}</p>}
        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          {/* Full Name */}
          
          <InputField
            label="Full Name"
            name="fullName"
            value={formData.fullName}
            handleChange={handleChange}
            placeholder="Enter your full name"
          />

          {/* ID Number */}
          <InputField
            label="ID Number"
            name="idNumber"
            value={formData.idNumber}
            handleChange={handleChange}
            placeholder="Enter your ID number"
          />

          {/* Sex */}
          <div>
            <label className="block font-medium text-blue-600 mb-1" htmlFor="sex">
              Sex
            </label>
            <select
              id="sex"
              name="sex"
              value={formData.sex}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-blue-300 focus:outline-none"
            >
              <option value="">Select your sex</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            
            </select>
          </div>

          {/* Age */}
          <InputField
            label="Age"
            name="age"
            type="number"
            value={formData.age}
            handleChange={handleChange}
            placeholder="Enter your age"
          />

          {/* Department */}
          <InputField
            label="Department"
            name="department"
            value={formData.department}
            handleChange={handleChange}
            placeholder="Enter your department"
          />

          {/* Email */}
          <InputField
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            handleChange={handleChange}
            placeholder="Enter your email"
          />

          {/* Phone Number */}
          <InputField
            label="Phone Number"
            name="phoneNumber"
            value={formData.phoneNumber}
            handleChange={handleChange}
            placeholder="Enter your phone number"
          />

          

          {/* Experience */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="hasExperience"
              name="hasExperience"
              checked={formData.hasExperience}
              onChange={handleChange}
              className="mr-2"
            />
            <label htmlFor="hasExperience" className="text-blue-600">
              Do you have experience?
            </label>
          </div>

          {formData.hasExperience && (
            <InputField
              label="Years of Experience"
              name="yearsOfExperience"
              type="number"
              value={formData.yearsOfExperience}
              handleChange={handleChange}
              placeholder="Enter years of experience"
            />
          )}

          {/* CV Upload */}
          <FileInputField
            label="CV (PDF)"
            name="cv"
            handleFileChange={handleFileChange}
            accept=".pdf"
          />

          <button
            type="submit"
            className="bg-blue-600 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700 transition-colors duration-200"
            disabled={loading}
          >
            {loading ? <FaSpinner className="animate-spin" /> : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

const InputField = ({ label, name, type = "text", value, handleChange, placeholder }) => (
  <div>
    <label className="block font-medium text-blue-600 mb-1" htmlFor={name}>
      {label}
    </label>
    <input
      type={type}
      id={name}
      name={name}
      value={value}
      onChange={handleChange}
      required
      className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-blue-300 focus:outline-none"
      placeholder={placeholder}
    />
  </div>
);

const FileInputField = ({ label, name, handleFileChange, accept }) => (
  <div>
    <label className="block font-medium text-blue-600 mb-1" htmlFor={name}>
      {label}
    </label>
    <input
      type="file"
      id={name}
      name={name}
      accept={accept}
      onChange={handleFileChange}
      className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-blue-300 focus:outline-none"
    />
  </div>
);

export default StudentForm;
