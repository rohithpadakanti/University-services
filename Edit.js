import React, { useEffect, useState } from "react";
import "./Edit.css";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const Edit = () => {
  const [state, setState] = useState({
    first_name: "",
    last_name: "",
    address: "",
    phone_number: "",
    email: "",
    date_of_birth: "",
  });

  const navigate = useNavigate(); // Use useNavigate hook
  const {student_id} =useParams();
  useEffect(() => {
    axios.get(`http://localhost:3001/api/get/${student_id}`)
        .then(resp => {
            console.log('Fetched student data:', resp.data); // Log the fetched data
            if (resp.data && resp.data.length > 0) {
                setState(resp.data[0]); // Set the state with the first item of the response data array
                console.log('State after setting:', state); // Log the state after setting
            } else {
                // Handle case when no data is found for the given student_id
                
            }
        })
        .catch(error => {
            console.error('Error fetching student data:', error);
            toast.error("Failed to fetch student data");
        });
}, [student_id]);



const handleSubmit = async (e) => {
    e.preventDefault();
    if (!state.first_name || !state.address || !state.phone_number || !state.email || !state.date_of_birth) {
      toast.error("Please provide all values.");
    } else {
      try {
        const formattedDate = new Date(state.date_of_birth).toISOString().split('T')[0];
  
        if (!student_id) {
          // Add new student data
          await axios.post("http://localhost:3001/api/post", {
            first_name: state.first_name,
            last_name: state.last_name,
            address: state.address,
            phone_number: state.phone_number,
            email: state.email,
            date_of_birth: formattedDate,
            Department: state.Department 
          });
          toast.success("Student added successfully");
        } else {
          // Update existing student data
          await axios.put(`http://localhost:3001/api/update/${student_id}`, {
            first_name: state.first_name,
            last_name: state.last_name,
            address: state.address,
            phone_number: state.phone_number,
            email: state.email,
            date_of_birth: formattedDate 
          });
          toast.success("Student updated successfully");
        }
  
        // Reset form fields
        setState({
          first_name: "",
          last_name: "",
          address: "",
          phone_number: "",
          email: "",
          date_of_birth: ""
        });
  
        // Redirect to home page
        navigate("/home");
      } catch (error) {
        console.error("Error:", error);
        toast.error("Failed to add/update student");
      }
    }
  };
    
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  return (
    <div style={{ marginTop: "100px" }}>
      <div className="centered-container">
      <img src="https://d1nhio0ox7pgb.cloudfront.net/_img/v_collection_png/512x512/shadow/user_edit.png" alt=" Background" className="centered-container" style={{ width: '80%', height: '80%' }} />
      <form
        style={{
          margin: "auto",
          padding: "15px",
          maxWidth: "400px",
          alignContent: "center",
        }}
        onSubmit={handleSubmit}
      >
        <label htmlFor="first_name">First Name</label>
        <input
          type="text"
          id="fname"
          name="first_name"
          placeholder="Your First name..."
          value={state.first_name || " "}
          onChange={handleInputChange}
        />
        <label htmlFor="last_name">Last Name</label>
        <input
          type="text"
          id="lname"
          name="last_name"
          placeholder="Your Last name..."
          value={state.last_name || " "}
          onChange={handleInputChange}
        />
        <label htmlFor="address">Address</label>
        <input
          type="text"
          id="address"
          name="address"
          placeholder="Your Address..."
          value={state.address || " "}
          onChange={handleInputChange}
        />
        <label htmlFor="phone_number">Phone Number</label>
        <input
          type="text"
          id="phone"
          name="phone_number"
          placeholder="Your Phone Number..."
          value={state.phone_number || " "}
          onChange={handleInputChange}
        />
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Your Email..."
          value={state.email || " "}
          onChange={handleInputChange}
        />
        <label htmlFor="date_of_birth">Date of Birth</label>
        <input
          type="date"
          id="dob"
          name="date_of_birth"
          value={state.date_of_birth || " "}
          onChange={handleInputChange}
        />
        <input type="submit" value={student_id ? "Update" : "Save"} />
        <button onClick={() => navigate("/home")}>Back to Home</button>
      </form>
      </div>
    </div>
  );
};

export default Edit;