import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Navbar, Nav, Button, Table, Modal, FormControl } from 'react-bootstrap';
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { NavLink } from "react-router-dom";
import { CodeIcon, HamburgetMenuClose, HamburgetMenuOpen } from "../Icons";

const EbookManageComponent = ({ groupId }) => {

  const [show, setShow] = useState(false);
  const [ebooks, setEbooks] = useState([]);

  // Placeholder data for groups (to be fetched based on the teacher)
  const [groups, setGroups] = useState([]);

  // State to track selected group when adding or editing an ebook
  const [selectedGroup, setSelectedGroup] = useState('');

  // Function to handle modal close
  const handleClose = () => setShow(false);

  // Function to handle modal show
  const handleShow = () => setShow(true);

  // Placeholder function to fetch ebooks based on the group
  const fetchEbooks = (groupId) => {
    // Fetch ebooks from the backend based on the groupId
    // Update the ebooks state with the fetched data
    // Replace the following line with your actual fetch logic
    // fetchEbooksByGroup(groupId).then((ebooksData) => setEbooks(ebooksData));
  };

  useEffect(() => {
    // Fetch ebooks when the component mounts or groupId changes
    fetchEbooks(groupId);
  }, [groupId]);


  useEffect(() => {
    loadAllGroups();
    loadBooks();
    // console.log(groupData[0].users[0].userId, 'group data')
  }, []);


  async function loadBooks(){
    const userToken = localStorage.getItem('userToken');
    try{
      fetch(`https://localhost:7287/api/Books`, {
        method: 'GET',
        headers:{
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userToken}`,
        },
      }).then(resp => resp.json()).then((data) => {
        console.log(data, 'Data of Get Booooks');
        setEbooks(data);
      })
    }catch(e){

    }
  }

    //Listing Group
  async function loadAllGroups() {
    const userToken = localStorage.getItem('userToken');
    try{
        fetch(`https://localhost:7287/api/Groups`,{
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${userToken}`,

            },
        }).then((resp) => resp.json()).then((data) => {
            console.log(data);
            setGroups(data);
        })
    }catch{

    }
  }
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);

  return (
    <div className='App'>
      <style>
        {`
    
                    body {
                        background-color: #e3f2fd;
                        font-family: 'Allerta Stencil', sans-serif;
                        
                    }
                     .navbar {
                        background-color: #1f5156;
                        height: 100px;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        font-size: 1.2rem;
                        position: sticky;
                        top: 0;
                        z-index: 20;
                      }
                      
                      .nav-container {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        width: 100%;
                        height: 80px;
                        max-width: 1500px;
                        position: relative;
                      }
                      
                      .nav-logo {
                        color: #f5b921;
                        align-items: center;
                        margin-left: 20px;
                        cursor: pointer;
                        text-decoration: none;
                        font-size: 2rem;
                        flex-grow: 1;
                      
                        display: flex;
                        align-items: center;
                        justify-items: center;
                      }
                      
                      .nav-logo .icon {
                        display: inline-block;
                        width: 3rem;
                        height: 3rem;
                        margin-left: 16px;
                      }
                      
                      .nav-menu {
                        display: flex;
                        list-style: none;
                        text-align: center;
                        margin-right: 2rem;
                        width: 100%;
                        justify-content: space-evenly;
                         margin-top: 30px;
                      }
                      
                      .nav-links {
                        color: #fff;
                        text-decoration: none;
                        padding: 0.5rem 1rem;
                        height: 100%;
                        border-bottom: 3px solid transparent;
                      }
                      /* .fa-code {
                        margin-left: 1rem;
                      } */
                      
                      .nav-item {
                        line-height: 40px;
                        margin-right: 1rem;
                      }
                      
                      .nav-item:after {
                        content: "";
                        display: block;
                        height: 3px;
                        width: 0;
                        background: transparent;
                        transition: width 0.7s ease, background-color 0.5s ease;
                      }
                      
                      .nav-item:hover:after {
                        width: 100%;
                        background: #ffdd40;
                      }
                      
                      .nav-item .active {
                        color: #ffdd40;
                        border: 1px solid #ffdd40;
                      }
                      
                      .nav-icon {
                        display: none;
                        color: #f5b921;
                      }
                      
                      .nav-icon .icon {
                        display: inline-block;
                        width: 2rem;
                        height: 2rem;
                      }
                      
                      @media screen and (max-width: 960px) {
                        .nav-menu {
                          display: flex;
                          flex-direction: column;
                          width: 100%;
                          border-top: 1pxsolid #fff;
                          position: absolute;
                          top: 80px;
                          left: -110%;
                          opacity: 1;
                          transition: all 0.5s ease;
                        }

                
                      
                        .nav-menu.active {
                          background: #1f5156;
                          left: 0px;
                          opacity: 1;
                          transition: all 0.5s ease;
                          z-index: 1;
                        }
                        .nav-item .active {
                          color: #ffdd40;
                          border: none;
                        }
                        .nav-links {
                          padding: 1.5rem;
                          width: 100%;
                          display: table;
                        }
                      
                        .nav-logo .icon {
                          width: 2rem;
                          height: 2rem;
                        }
                      
                        .nav-icon {
                          display: block;
                          position: absolute;
                          top: 50%;
                          right: 0;
                          transform: translate(-100%, -50%);
                          width: 2rem;
                          height: 2rem;
                          cursor: pointer;
                          color: #ffdd40;
                        }
                      }
    
                      .fade-in {
                        animation: fadeIn 1s ease-in-out;
                    }
    
                    @keyframes fadeIn {
                        from {
                            opacity: 0;
                        }
                        to {
                            opacity: 1;
                        }
                    }
    
                 
                        .dashboard-content {
                            background-color: #fff;
                            padding: 20px;
                            border-radius: 10px;
                            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                            width: 80%;
                            margin: 0 auto;
                            margin-top: 50px;
                            display: flex;
                            flex-direction: column;
                            align-items: center;
                            justify-content: center;
                            text-align: center;
                        }
                        .dashboard-content img {
                            max-width: 100%;
                            height: auto;
                        }
                 `}
      </style>
      <nav className="navbar">
        <div className="nav-container">
          {/* Logo and Home link */}
          <NavLink exact to="/" className="nav-logo">
            <NavLink exact to="/Homepage" className="nav-logo">
              <img
                src="https://fsx1.itstep.org/api/v1/files/-bRZCFuPESE9skZZlyP75n4dL9uFnEpm"
                alt="logo"
                width="50"
                style={{
                  padding: '1px',
                  marginTop: '16px',
                  width: '100px',
                  height: '220px',
                }}
              />
            </NavLink>

          </NavLink>

          {/* Navigation links */}
          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <NavLink
                exact
                to="/Homepage"
                activeclassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                Homepage
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to="/UploadBook"
                activeclassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                Upload Book
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/ViewGroups"
                activeclassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                View Groups
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/EbookManagement"
                activeclassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                Assign Ebooks
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink

                to="/LoginLibrarian"
                activeclassName="active"
                className="nav-links"
                onClick={handleClick}

              >
                Log out
              </NavLink>
            </li>
            {/* Add more navigation items as needed */}
          </ul>

          {/* Hamburger icon for mobile */}
          <div className="nav-icon" onClick={handleClick}>
            {click ? (
              <span className="icon">
                <HamburgetMenuOpen />{" "}
              </span>
            ) : (
              <span className="icon">
                <HamburgetMenuClose />
              </span>
            )}
          </div>
        </div>
      </nav>

      <div className="container ">
        <div className="crud shadow-lg p-3 mb-5 mt-5 bg-body rounded">

          <div className="row">
            {/* Center the heading using Bootstrap grid system classes */}
            <div className="col-sm-12 text-center mt-5 mb-5 text-gred" style={{ color: "green" }}>
              <h2><b>Ebook Details</b></h2>
            </div>
          </div>
          <div className="row">
            <div className="table-responsive" style={{ fontFamily: 'Allerta Stencil', maxHeight: '400px', overflowY: 'auto', overflowX: 'auto' }}>
              <Table striped bordered hover responsive className="mt-4 text-center" style={{ minWidth: '600px' }}>
                <thead>
                  <tr>
                    <th>Ebook ID</th>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Group</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Map through the ebooks state and display each ebook */}
                  {ebooks.map((ebook) => (
                    <tr key={ebook.id}>
                      <td>{ebook.id}</td>
                      <td>
                        {/* Display the book title as a dropdown */}
                        <select
                          className="form-select"
                          value={ebook.title}
                          onChange={(e) => {
                            // Handle changes to the book title here
                            // You may want to update the state or perform other actions
                          }}
                        >
                          {/* Populate the options with book titles */}
                          <option value={ebook.title}>{ebook.title}</option>
                          {/* Add other book titles as needed */}
                        </select>
                      </td>
                      <td>{ebook.author}</td>
                      <td>
                        {/* Display the group as a dropdown */}
                        <select
                          className="form-select"
                          value={ebook.group}
                          onChange={(e) => {
                            // Handle changes to the group here
                            // You may want to update the state or perform other actions
                          }}
                        >
                          {/* Populate the options with group names */}
                          {groups.map((group) => (
                            <option key={group.id} value={group.name}>
                              {group.name}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td>
                        {/* Button for add */}
                        <Button variant="success" className="me-2">
                          Add
                        </Button>

                        {/* Button for removing ebook */}
                        <Button variant="danger">
                          Delete
                        </Button>

                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </div>

          {/* Modal Box for adding new ebook */}
          <div className="model_box">
            <Modal
              show={show}
              onHide={handleClose}
              backdrop="static"
              keyboard={false}
              style={{ marginTop: '90px', fontFamily: 'Allerta Stencil', width: '100%', height: '100%' }}
            >
              <Modal.Header closeButton style={{ background: '#33b5e5' }}>
                <Modal.Title>Add Ebook</Modal.Title>
              </Modal.Header>
              <Modal.Body style={{ background: '#e3f2fd' }}>
                {/* Form for adding a new ebook */}
                <form>
                  <div className="form-group">
                    <label htmlFor="ebookTitle">Ebook Title:</label>
                    <input type="text" className="form-control" id="ebookTitle" placeholder="Enter Ebook Title" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="ebookAuthor">Ebook Author:</label>
                    <input type="text" className="form-control" id="ebookAuthor" placeholder="Enter Ebook Author" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="groupSelect">Select Group:</label>
                    <select
                      id="groupSelect"
                      className="form-select"
                      value={selectedGroup}
                      onChange={(e) => setSelectedGroup(e.target.value)}
                    >
                      <option value="">Select a Group</option>
                      {groups.map((group) => (
                        <option key={group.id} value={group.name}>
                          {group.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <button type="submit" className="btn btn-success mt-4">
                    Add Ebook
                  </button>
                </form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
}



export default EbookManageComponent;
