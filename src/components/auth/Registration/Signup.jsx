import React, { useState } from "react";
import * as yup from 'yup';
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaUser, FaEnvelope, FaPhone, FaLock, FaEye, FaEyeSlash, FaCity, FaMapMarkerAlt, FaGenderless, FaIdCard, FaRegCalendarAlt } from "react-icons/fa";
import './signup.css';
import axios from 'axios';

function Signup() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [mobileNumber, setMobileNumber] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [aadharNumber, setAadharNumber] = useState("");
    const [gender, setGender] = useState("");
    const [address, setAddress] = useState("");
    const [errors, setErrors] = useState({});
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const userSchema = yup.object().shape({
        firstName: yup.string().required("First Name is required"),
        lastName: yup.string().required("Last Name is required"),
        email: yup.string().email("Invalid Email ID").required("Email ID is required"),
        mobileNumber: yup.string().matches(/^\d{10}$/, 'Mobile Number must be a 10-digit number').required("Mobile Number is required"),
        password: yup.string()
            .min(8, "Password must be at least 8 characters")
            .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])/, "Password must contain an uppercase letter, a lowercase letter, and a special character")
            .required("Password is required"),
        confirmPassword: yup.string()
            .oneOf([yup.ref('password'), null], "Passwords must match")
            .required("Confirm password is required"),
        aadharNumber: yup.string().matches(/^\d{12}$/, 'Aadhar Number must be a 12-digit number').required("Aadhar Number is required"),
        dateOfBirth: yup.date().required("Date of birth is required")
            .max(new Date(), "Date of birth must be in the past"),
        city: yup.string().required("City is required"),
        state: yup.string().required("State is required"),
        gender: yup.string().required("Gender is required").oneOf(["Male", "Female", "Other"], "Invalid gender selection"),
        address: yup.string().required("Address is required")
    });

    const validateForm = async () => {
        try {
            await userSchema.validate(
                { firstName, lastName, email, mobileNumber, password, confirmPassword, aadharNumber, dateOfBirth, city, state, gender, address },
                { abortEarly: false }
            );
            setErrors({});
        } catch (error) {
            const errorMessages = {};
            error.inner.forEach(e => {
                errorMessages[e.path] = e.message;
            });
            setErrors(errorMessages);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = await validateForm();
        if (Object.keys(errors).length === 0) {
            try {
                const response = await axios.post('http://localhost:9090/api/register', {
                    firstName,
                    lastName,
                    email,
                    mobileNumber,
                    password,
                    aadharNumber,
                    dateOfBirth,
                    city,
                    state,
                    gender,
                    address
                });
                setSuccessMessage("User registered successfully!");
                setFirstName("");
                setLastName("");
                setEmail("");
                setMobileNumber("");
                setPassword("");
                setConfirmPassword("");
                setDateOfBirth("");
                setCity("");
                setState("");
                setAadharNumber("");
                setGender("");
                setAddress("");
            } catch (error) {
                console.error("There was an error registering the user!", error);
                setErrorMessage("Registration failed. Please try again.");
            }
        }
    };

    return (
        <div className="signup-container">
            <div className="form-card">
                <h2 style={{color:'white'}}>Create an Account</h2>
                <br/>
                {successMessage && (
                    <div className="alert alert-success" role="alert">
                        {successMessage}
                    </div>
                )}
                {errorMessage && (
                    <div className="alert alert-danger" role="alert">
                        {errorMessage}
                    </div>
                )}
                <form onSubmit={handleSubmit}>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label htmlFor="firstName">First Name:</label>
                            <input type="text" id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                            <div className="text-danger">{errors.firstName}</div>
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="lastName">Last Name:</label>
                            <input type="text" id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                            <div className="text-danger">{errors.lastName}</div>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label htmlFor="email">Email:</label>
                            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                            <div className="text-danger">{errors.email}</div>
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="mobileNumber">Mobile Number:</label>
                            <input type="text" id="mobileNumber" value={mobileNumber} onChange={(e) => setMobileNumber(e.target.value)} />
                            <div className="text-danger">{errors.mobileNumber}</div>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label htmlFor="aadharNumber">Aadhar Number:</label>
                            <input type="text" id="aadharNumber" value={aadharNumber} onChange={(e) => setAadharNumber(e.target.value)} />
                            <div className="text-danger">{errors.aadharNumber}</div>
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="password">Password:</label>
                            <input
                                type={passwordVisible ? "text" : "password"}
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <div className="text-danger">{errors.password}</div>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label htmlFor="confirmPassword">Confirm Password:</label>
                            <input
                                type={confirmPasswordVisible ? "text" : "password"}
                                id="confirmPassword"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                            <div className="text-danger">{errors.confirmPassword}</div>
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="dateOfBirth">Date of Birth:</label>
                            <input type="date" id="dateOfBirth" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} />
                            <div className="text-danger">{errors.dateOfBirth}</div>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label htmlFor="city">City:</label>
                            <input type="text" id="city" value={city} onChange={(e) => setCity(e.target.value)} />
                            <div className="text-danger">{errors.city}</div>
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="state">State:</label>
                            <input type="text" id="state" value={state} onChange={(e) => setState(e.target.value)} />
                            <div className="text-danger">{errors.state}</div>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label htmlFor="gender">Gender:</label>
                            <select id="gender" value={gender} onChange={(e) => setGender(e.target.value)}>
                                <option value="">Select</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                            <div className="text-danger">{errors.gender}</div>
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="address">Address:</label>
                            <input type="text" id="address" value={address} onChange={(e) => setAddress(e.target.value)} />
                            <div className="text-danger">{errors.address}</div>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary">Register</button>
                </form>
                <br/>
                <br/>
                <h4 style={{color:"white",textAlign:"center"}}>Already have an account? <Link to="/login">Login</Link></h4>
            </div>
        </div>
    );
}

export default Signup;
