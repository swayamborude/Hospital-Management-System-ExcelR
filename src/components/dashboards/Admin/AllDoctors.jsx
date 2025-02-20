import { useEffect, useState } from "react";
import { getAllDoctors } from "../../../api";
import { Table } from "react-bootstrap";

const AllDoctors = () => {
    const [doctors, setDoctors] = useState([]);

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const doctorData = await getAllDoctors();
                setDoctors(doctorData);
                console.log(doctorData);
            } catch (error) {
                console.log("Failed to fetch doctors");
            }
        };
        fetchDoctors();
    }, []);

    return (
        <div className="container-fluid mt-5">
            <h2>All Doctors</h2>
            <Table>
                <thead>
                    <tr>
                        <th>Doctor ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Mobile</th>
                        <th>Degree</th>
                        <th>Qualification</th>
                        <th>City</th>
                        <th>State</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {doctors.map((doctor, index) => (
                        <tr key={index}>
                            <td>{doctor.doctorId}</td>
                            <td>{`${doctor.user.firstName} ${doctor.user.lastName}`}</td>
                            <td>{doctor.user.email}</td>
                            <td>{doctor.user.mobileNumber}</td>
                            <td>{doctor.degree}</td>
                            <td>{doctor.qualification}</td>
                            <td>{doctor.user.city}</td>
                            <td>{doctor.user.state}</td>
                            <td>{doctor.status}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default AllDoctors;
