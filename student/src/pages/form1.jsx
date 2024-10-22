// src/RegistrationForm.jsx

import React, { useState } from 'react';

const RegistrationForm = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        idNumber: '',
        sex: '',
        age: '',
        department: '',
        email: '',
        phoneNumber: '',
        interests: [],
        hasExperience: false,
        yearsOfExperience: 0,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Convert interests into an array
        const interestsArray = formData.interests.split(',').map(interest => interest.trim());

        const dataToSend = {
            ...formData,
            interests: interestsArray,
        };

        try {
          const response = await fetch('http://localhost:3000/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataToSend),
        });
        
        if (!response.ok) {
            const errorText = await response.text(); // Get the error message from the response
            throw new Error(`Registration failed: ${errorText}`);
        }
        
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();
            console.log('Success:', result);
            alert('Registration successful!');
            // Optionally reset the form
            setFormData({
                fullName: '',
                idNumber: '',
                sex: '',
                age: '',
                department: '',
                email: '',
                phoneNumber: '',
                interests: '',
                hasExperience: false,
                yearsOfExperience: 0,
            });
        } catch (error) {
            console.error('Error:', error);
            alert('Registration failed. Please try again.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Full Name:
                <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required />
            </label>
            <br />

            <label>
                ID Number:
                <input type="text" name="idNumber" value={formData.idNumber} onChange={handleChange} required />
            </label>
            <br />

            <label>
                Sex:
                <select name="sex" value={formData.sex} onChange={handleChange} required>
                    <option value="">Select...</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                </select>
            </label>
            <br />

            <label>
                Age:
                <input type="number" name="age" value={formData.age} onChange={handleChange} required />
            </label>
            <br />

            <label>
                Department:
                <input type="text" name="department" value={formData.department} onChange={handleChange} required />
            </label>
            <br />

            <label>
                Email:
                <input type="email" name="email" value={formData.email} onChange={handleChange} required />
            </label>
            <br />

            <label>
                Phone Number:
                <input type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required />
            </label>
            <br />

            <label>
                Interests:
                <input type="text" name="interests" value={formData.interests} onChange={handleChange} placeholder="Comma separated values" />
            </label>
            <br />

            <label>
                Do you have experience?
                <input type="checkbox" name="hasExperience" checked={formData.hasExperience} onChange={handleChange} />
            </label>
            <br />

            <label>
                Years of Experience:
                <input type="number" name="yearsOfExperience" value={formData.yearsOfExperience} onChange={handleChange} min="0" />
            </label>
            <br />

            <button type="submit">Register</button>
        </form>
    );
};

export default RegistrationForm;
