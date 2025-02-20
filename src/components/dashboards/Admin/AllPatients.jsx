import { useEffect, useState } from "react";
import { getAllUsers, AssignAsADoctor } from "../../../api";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table } from "react-bootstrap";
import './AllPatients.css'; // Custom CSS file

const AllPatients = () => {
  const [users, setUsers] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [doctorData, setDoctorData] = useState({
    degree: "",
    qualification: "",
    status: "ACTIVE",
  });

  const degrees = [
    "MBBS", "MD", "MBBS + MS", "BDS", "MDS", "DNB", "BAMS", "BHMS", "BPT", "MPT"
  ];

  const specializations = [
    "Cardiology", "Dermatology", "Neurology", "Orthopedics", "Pediatrics", "Psychiatry", "Gynecology", "ENT", "Radiology", "General Surgery"
  ];

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const userData = await getAllUsers();
        setUsers(userData);
      } catch (e) {
        console.error(e);
      }
    };
    fetchUsers();
  }, []);

  const handleAssignDoctor = (user) => {
    setSelectedUser(user);
    setModalVisible(true);
  };

  const handleChange = (e) => {
    setDoctorData({ ...doctorData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedUser) {
      try {
        await AssignAsADoctor(selectedUser.uid, doctorData);
        alert(`${selectedUser.uid} is added as a Doctor now`);

        // Reset form and close modal
        setModalVisible(false);
        setDoctorData({
          degree: "",
          qualification: "",
          status: "ACTIVE",
        });
      } catch (error) {
        console.error("Error assigning doctor", error);
        alert("Error assigning doctor");
      }
    }
  };

  return (
    <div className="container-fluid mt-5">
      <h2>All Users</h2>
      <Table>
        <thead>
          <tr>
            <th>UID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Mobile Number</th>
            <th>Aadhar Number</th>
            <th>Gender</th>
            <th>Date of Birth</th>
            <th>City</th>
            <th>State</th>
            <th>Address</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.uid}>
              <td>{user.uid}</td>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.email}</td>
              <td>{user.mobileNumber}</td>
              <td>{user.aadharNumber}</td>
              <td>{user.gender}</td>
              <td>{new Date(user.dateOfBirth).toLocaleDateString()}</td>
              <td>{user.city}</td>
              <td>{user.state}</td>
              <td>{user.address}</td>
              <td>
                <button
                  className="btn btn-primary"
                  onClick={() => handleAssignDoctor(user)}
                >
                  Register as Doctor
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal for doctor registration */}
      {modalVisible && (
          <div
            className="modal-overlay"
            tabIndex="-1"
            role="dialog"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog custom-modal">
              <div className="modal-content custom-modal-content">
                <div>
                <center><h5 className="modal-title" id="exampleModalLabel">Doctor Registration</h5></center>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="modal-body">
                    <table className="table">
                      <tbody>
                        <tr>
                          <td><label htmlFor="degree">Degree</label></td>
                          <td>
                            <div className="dropdown">
                              <select
                                className="form-control custom-input dropdown-toggle"
                                id="degree"
                                name="degree"
                                value={doctorData.degree}
                                onChange={handleChange}
                                required
                              >
                                <option value="">Select Degree</option>
                                {degrees.map(degree => (
                                  <option key={degree} value={degree}>{degree}</option>
                                ))}
                              </select>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td><label htmlFor="qualification">Specialization</label></td>
                          <td>
                            <div className="dropdown">
                              <select
                                className="form-control custom-input dropdown-toggle"
                                id="qualification"
                                name="qualification"
                                value={doctorData.qualification}
                                onChange={handleChange}
                                required
                              >
                                <option value="">Select Specialization</option>
                                {specializations.map(spec => (
                                  <option key={spec} value={spec}>{spec}</option>
                                ))}
                              </select>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td><label htmlFor="status">Status</label></td>
                          <td>
                            <div className="dropdown">
                              <select
                                className="form-control custom-input dropdown-toggle"
                                id="status"
                                name="status"
                                value={doctorData.status}
                                onChange={handleChange}
                              >
                                <option value="ACTIVE">Active</option>
                                <option value="INACTIVE">Inactive</option>
                              </select>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="d-flex justify-content-evenly">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => setModalVisible(false)}
                      style={{ backgroundColor: 'red', borderColor: 'red' }}
                    >
                      Close
                    </button>
                    <button type="submit" className="btn btn-primary">
                      Save Doctor
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
      )}
    </div>
  );
};

export default AllPatients;