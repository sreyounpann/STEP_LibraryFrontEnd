import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Modal, Button, Container, Row, Col, Form, Table } from 'react-bootstrap';
import { CodeIcon, HamburgetMenuClose, HamburgetMenuOpen } from "../Icons";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Cookies from 'js-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit , faTrash } from '@fortawesome/free-solid-svg-icons';

const CreateTeacherComponent = () => {
    // const loginedData = JSON.parse(localStorage.getItem('user_logined'));
    const [click, setClick] = useState(false);
    const [show, setShow] = useState(false);
    const location = useLocation();
    const userData = location.state.userData;
    const [teacherUsername, setTeacherUsername] = useState("");
    const [teacherPassword, setTeacherPassword] = useState("");
    const [teacherConfirmPassword, setTeacherConfirmPassword] = useState("");
    const navigate = useNavigate();
    const [groupData, setGroupData] = useState([]); // This is the data that will be displayed in the table 
    const [group, setGroup] = useState([]); // This is the data that will be displayed in the table 
    const [teachers, setTeachers] = useState([]);
    const handleClick = () => setClick(!click);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

 
    useEffect(() => {
        loadAllGroups();
        getAllTeachersOnlyone();
    }, []);

    const register = {
        'username': teacherUsername,
        'password': teacherPassword,
        'confirm_Password': teacherConfirmPassword,
    }
    const handleGroupNameInput = (e) => {
        setGroup({ ...group, name: e.target.value });
      };
    const createGroup = (e) => {
        e.preventDefault();
        fetch("https://localhost:7287/api/Groups", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${userData.token}`, // librarian token
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: group.name,
                userId: group.userId,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                if (data.status === "error") {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: data.message,
                    });
                } else if (data.id > 0) {
                    Swal.fire({
                        title: "Group has been created successfully!",
                        text: "You clicked the button!",
                        icon: "success",
                    });
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const handleLogout = () => {
        Swal.fire({
            title: "Are you sure?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, sign out!",
        }).then((result) => {
            if (result.isConfirmed) {
                Cookies.remove("roleToken");
                navigate("/");
            }
        });
    }
    //List All Group
    async function loadAllGroups() {
        try {
            fetch(`https://localhost:7287/api/Groups`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${userData.token}`,
                    "Contet-Type": "application/json"

                },
            }).then((resp) => resp.json()).then((data) => {
                console.log(data);
                setGroupData(data);
            })
        } catch {

        }
    }
    const getAllTeachersOnlyone = () => {
        fetch("https://localhost:7287/api/Users", {
            headers: {
                Authorization: `Bearer ${userData.token}`, // librarian token
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setTeachers(data);
                console.log(data);
            });
    };
    const getTeachers = (e) => {
        fetch("https://localhost:7287/api/Users", {
            headers: {
                Authorization: `Bearer ${userData.token}`, // librarian token
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setTeachers(data);
                console.log(data);
            });
        console.log(e.target.value);
      
           
             setGroup({ ...group, userId: e.target.value });
         
       
          
      

    };

    //Load Student List
    // async function loadStudentsOfGroup(){
    //     try{
    //         fetch(`https://localhost:7153/api/Users/GetStudentsListOfTeacher?${}`, {

    //         })
    //     }catch(error){
    //         console.log("Error", error);
    //     }
    // }
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
                      .scrollable-table {
                        max-height: 400px;  // Set the maximum height for the table
                        overflow-y: auto;
                    }
                    }
                  
               `}
            </style>
            <div className='App'>
                <nav className="navbar">
                    <div className="nav-container">
                        {/* Logo and Home link */}
                       
                                <img
                                    src="https://fsx1.itstep.org/api/v1/files/-bRZCFuPESE9skZZlyP75n4dL9uFnEpm"
                                    alt="logo"
                                    width="50"
                                    style={{
                                        padding: '1px',
                                        marginTop: '10px',
                                        width: '100px',
                                        height: '220px',
                                    }}
                                />
    

                        {/* Navigation links */}
                        <ul className={click ? "nav-menu active" : "nav-menu"}>
                            <li className="nav-item">
                                <button className="btn btn-success" onClick={() => navigate('/', { state: { userData: userData } })} >Home</button>
                            </li>
                            <li className="nav-item">
                                <button className="btn btn-success" onClick={() => navigate('/CreateTeacher', { state: { userData: userData } })} >Manage Teachers</button>

                            </li>
                            <li className="nav-item">
                                <button className="btn btn-success" onClick={() => navigate('/CreateStudents', { state: { userData: userData } })} >List Groups</button>

                            </li>

                              
              <li className="nav-item">
               {/* button reset password */}
                <button className="btn btn-success" onClick={() => navigate('/ResetPassword', { state: { userData: userData } })} >Reset Password</button>
              </li>
                            <li className="nav-item">

                                <button onClick={handleLogout} className="btn btn-danger" >Log out</button>

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

                <div className="container">
                    <div className="crud shadow-lg p-3 mb-5 mt-5 bg-body rounded">
                        <div className="row">
                            <div className="col-sm-3 mt-5 mb-4 text-gred">
                                <div className="search">
                                    <form className="form-inline">
                                        <input className="form-control mr-sm-2" type="search" placeholder="Search Group" aria-label="Search" />
                                    </form>
                                </div>
                            </div>
                            <div className="col-sm-3 offset-sm-2 mt-5 mb-4 text-gred text-center" style={{ color: "green" }}><h2><b>Group List</b></h2></div>
                            <div className="col-sm-3 offset-sm-1 mt-5 mb-4 text-gred">
                                <Button variant="primary" onClick={handleShow}>
                                    New Group
                                </Button>
                            </div>
                        </div>
                        <div className="row">

                            <div className="table-responsive" style={{ fontFamily: 'Allerta Stencil', maxHeight: '400px', overflowY: 'auto', overflowX: 'auto' }}>
                                <Table striped bordered hover responsive className="mt-4 text-center" style={{ minWidth: '600px' }}>
                                    {/* Your table header remains unchanged */}
                                    <thead>
                                        <tr>
                                            <th>NO.</th>
                                            <th>Group ID</th>
                                            <th>Name</th>
                                            <th>Teacher name</th>
                                            <th className="text-center">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {groupData ? (groupData.map((group, index) => (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{group.id}</td>
                                                <td>{group.name}</td>
                                               
                                                {teachers.map((teacher)=> teacher.id === group.userId ? <td>{teacher.username}</td> : null)}

                                                <td className="text-center">
                                                    <div className="d-flex justify-content-center">
                                                        {/* Edit button using faicon */}
                                                        <button className="btn btn-warning">
                                                            <FontAwesomeIcon icon={faEdit} />
                                                        </button>

                                                        {/* Delete button using faicon */}
                                                        <button className="btn btn-danger mx-2">
                                                            <FontAwesomeIcon icon={faTrash} />
                                                        </button>
                                                    </div>
                                                </td>



                                            </tr>
                                        ))) : (<p>waiting</p>)}
                                    </tbody>

                                </Table>

                            </div>
                        </div>

                        {/* Modal Box for adding new teacher */}
                        <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} style={{ marginTop: '90px', fontFamily: 'Allerta Stencil', width: '100%', height: '100%' }}>
                            <Modal.Header closeButton style={{ background: "#198754" }}>
                            <Modal.Title style={{ color: 'white', textAlign: 'center' }}>Add Group</Modal.Title>

                            </Modal.Header>
                            <Modal.Body style={{ background: "#e3f2fd" }}>
                                <Container>
                                    <Row>
                                        <Col sm={6}>
                                            {/* Form to add group */}
                                           
                                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                                    <Form.Label>Group Name</Form.Label>
                                                    <Form.Control id = "name" value = {group.name} type="text" placeholder="Enter Group Name" onChange={handleGroupNameInput} />
                                                </Form.Group>
                                                <select
                                                    className="form-select form-select-lg mb-3"
                                                    aria-label="Large select example"
                                                    onClick={getTeachers}
                                                >
                                                    <option value>Add teacher to this group</option>
                                                    {teachers? (teachers.map((teacher) => {
                                                        if (teacher.role !== "Librarian")
                                                            return (
                                                                <option key={teacher.id} value={teacher.id}>
                                                                    {teacher.username}
                                                                </option>
                                                            );
                                                        return null;
                                                    })): ('waiting')}
                                                </select>
                                                <button
                                                    type="submit"
                                                    className="btn btn-primary btn-lg btn-block"
                                                    onClick={createGroup}
                                                >
                                                    done
                                                </button>
                                               
                                          
                                        </Col>
                                    </Row>
                                </Container>
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

export default CreateTeacherComponent;