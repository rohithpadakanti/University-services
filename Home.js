import React, { useState, useEffect } from 'react'; 
import { Link } from 'react-router-dom'; 
import axios from 'axios'; 
import './Home.css';
import { toast } from 'react-toastify';

const Home = ({ isLoggedIn, username }) => {
  const [data, setData] = useState([]);

  // Function to fetch data from the server
  const loadData = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/get");
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Function to delete a contact
  const deleteContact = (student_id) => {
    if (window.confirm("Do you want to delete")) {
      axios.delete(`http://localhost:3001/api/remove/${student_id}`)
        .then(() => {
          toast.success("Deleted successfully");
          // Reload data after deletion
          setTimeout(loadData, 500);
        })
        .catch(error => {
          console.error('Error deleting contact:', error);
          toast.error("Failed to delete contact");
        });
    }
  };

  // Load data on component mount
  useEffect(() => {
    loadData();
  }, []);

  // If the user is not logged in, return null
  if (!isLoggedIn) {
    return null;
  }

  return (
    <div style={{ marginTop: "150px", textAlign: "center" }}>
      <Link to="/addContact">
        <button className="btn btn-contact">Add </button>
      </Link>
      <table className="styled-table">
        <thead>
          <tr>
            <th style={{ textAlign: "center" }}>First Name</th>
            <th style={{ textAlign: "center" }}>Last Name</th>
            <th style={{ textAlign: "center" }}>Address</th>
            <th style={{ textAlign: "center" }}>Phone Number</th>
            <th style={{ textAlign: "center" }}>Email</th>
            <th style={{ textAlign: "center" }}>DOB</th>
            <th style={{ textAlign: "center" }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={item.id}>
              <td>{item.first_name}</td>
              <td>{item.last_name}</td>
              <td>{item.address}</td>
              <td>{item.phone_number}</td>
              <td>{item.email}</td>
              <td>{item.date_of_birth}</td>
              <td>
                <Link to={`/update/${item.student_id}`}>
                  <button className="btn btn-edit">Edit</button>
                </Link>
                <button className="btn btn-delete" onClick={() => deleteContact(item.student_id)}>Delete</button>
                <Link to={`/view/${item.student_id}`}>
                  <button className="btn btn-view">View</button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Home;