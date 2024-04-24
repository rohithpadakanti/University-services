import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from 'axios';
import "./View.css";

const View = () => {
    const [user, setUser] = useState({});
    const { student_id } = useParams();

    useEffect(() => {
        axios.get(`http://localhost:3001/api/get/${student_id}`)
            .then(resp => setUser({ ...resp.data[0] }))
            .catch(error => console.error("Error fetching user data:", error));
    }, [student_id]);

    return (
        <div className="container">
            <div className="card">
                <div className="card-header">
                    <p>Student Details</p>
                </div>                
                <div className="card-body">
                    <strong>ID:</strong>
                    <span>{student_id}</span>
                    <br />
                    <br />
                    <strong>First Name: </strong>
                    <span>{user.first_name}</span>
                    <br />
                    <br />
                    <strong>Last Name: </strong>
                    <span>{user.last_name}</span>
                    <br />
                    <br />
                    <strong> Address: </strong>
                    <span>{user.address}</span>
                    <br />
                    <br />
                    <strong>Phone Number: </strong>
                    <span>{user.phone_number}</span>
                    <br />
                    <br />
                    <strong>Email: </strong>
                    <span>{user.email}</span>
                    <br />
                    <br />
                    <strong>DOB: </strong>
                    <span>{user.date_of_birth}</span>
                    <br />
                    <br />
                    <Link to="/home" className="btn btn-edit">Back to Home</Link>
                </div>
            </div>
        </div>
    );
}

export default View;