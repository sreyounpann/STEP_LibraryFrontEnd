import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Modal, Button, Container, Row, Col, Form, Table } from 'react-bootstrap';
import { CodeIcon, HamburgetMenuClose, HamburgetMenuOpen } from "../Icons";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

import Cookies from "js-cookie";

import { useLocation } from "react-router-dom";

const CreateTeacherComponent = () => {
  const navigate = useNavigate();

  const loginedData = JSON.parse(localStorage.getItem('user_logined'));
  const usertoken = loginedData.token;
  const [click, setClick] = useState(false);
  const [show, setShow] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAssignDetail, setShowAssignDetail] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);

  const [teacherConfirmPassword, setTeacherConfirmPassword] = useState("");
  const [currentTeacher, setCurrentTeacher] = useState({});//[

  const [selectedGroup, setSelectedGroup] = useState(0);
  const handleCloseEditModal = () => setShowEditModal(false);
  const handleCloseAssignModal = () => setShowAssignDetail(false);

  const [updatedImageFile, setUpdatedImageFile] = useState(null);
  const [updatedImagePath, setUpdatedImagePath] = useState("");
  const [updatedUsername, setUpdatedUsername] = useState("");
  const [updatedPassword, setUpdatedPassword] = useState("");
  const [showUpdateModal, setShowUpdateModal] = useState(false);




  const location = useLocation();
  const userData = location.state.userData;
  const userId = useLocation().state.userId;
  const [users, setUsers] = useState(null);

  console.log(userData);

  useEffect(() => {
    console.log('fafda' + userData.token);
    fetch("https://localhost:7287/api/Users", {
      headers: {
        Authorization: `Bearer ${userData.token}`,
        "Contet-Type": "application/json"
      }
    })
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        console.log(data);
      }
      )
  }, [])
  const data = userData || { token: "" };


  const [user, addUser] = useState({
    username: "",
    password: "",
    confirmPassword: "",



  });

  const [validation, setValidation] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    isUserExisted: false,
  });


  const handleOnSelectedGroupChange = (e) => {
    setSelectedGroup(e.target.value);
    console.log(e.target.value);
  }
  const handleCloseDetailModal = () => setShowDetailModal(false);
  const handleClick = () => setClick(!click);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleShowEditModal = () => setShowEditModal(true);




  const handleUsernameInput = (e) => {
    if (e.target.name === "username" && e.target.value.length > 15)
      setValidation({
        ...validation,
        [e.target.name]: "Username must contain 15 characters",
      });
    else setValidation({ ...validation, [e.target.name]: "" });
    addUser({ ...user, [e.target.name]: e.target.value });
    setValidation({ ...validation, isUserExisted: false });

  }

  const handlePasswordInput = (e) => {
    console.log(e.target.value);
    console.log("cp: " + user.confirmPassword + "p: " + user.password);
    if (e.target.name === "password" && e.target.value.length !== 6) {
      setValidation({
        ...validation,
        [e.target.name]: "Password must contain 6 characters",
        confirmPassword:
          user.confirmPassword !== user.password
            ? "Password is not matched"
            : "",
      });
    } else
      setValidation({
        ...validation,
        [e.target.name]: "",
      });

    addUser({ ...user, [e.target.name]: e.target.value });

    console.log(user.confirmPassword + " " + user.password);
  };

  const handleConfirmPassword = (e) => {
    if (e.target.name === "confirmPassword" && e.target.value !== user.password) {
      setValidation({
        ...validation,
        confirmPassword: "Password is not matched",
      });
    } else

      setValidation({
        ...validation,
        confirmPassword: "",
      });

    addUser({ ...user, [e.target.name]: e.target.value });
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
  const handleCreateTeacher = (e) => 
  {
    e.preventDefault();
    if (user.confirmPassword === user.password) {
      const formData = new FormData();
      formData.append("imageFile", user.imageFile);
      formData.append("imagePath", user.username);
      formData.append("username", user.username);
      formData.append("password", user.password);
      formData.append("role", "Teacher");

      fetch("https://localhost:7287/api/Users", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.status === 400) {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Something went wrong!",
            });
          } else {
            console.log(data);
            console.log(data.status);
            if (data.status !== "error") {



              Swal.fire({
                title: "Your teacher account has been created successfully!",
                text: "You clicked the button!",
                icon: "success",
              });
              addUser({
                username: "",
                password: "",
                confirmPassword: "",
                imageFile: null,
                imagePath: "",
              });
              document.getElementById("formFileLg").value = "";
              setValidation({
                ...validation,
                isUserExisted: false,
                confirmPassword: "",
              });
            } else {
              setValidation({ ...validation, isUserExisted: true });
            }
          }
        });
    }
  };

  const [showPassword, setShowPassword] = useState(false);
  const [preview, setPreview] = useState();

  const handleEditTeacher = (teacher) => {
    setCurrentTeacher(teacher);
    setUpdatedImageFile(teacher.imageFile);
    setUpdatedImagePath(teacher.imagePath);
    setUpdatedUsername(teacher.username);
    setUpdatedPassword(teacher.password); // You may want to fetch the current password if needed

    // Use the correct state variable here, i.e., teacher instead of userProfile
    setShowUpdateModal(true);
  };

  const [previewImage, setPreviewImage] = useState("");

  // handleCloseUpdateModal
  const handleCloseUpdateModal = () => {
    setShowUpdateModal(false);
  };
  const [group, setGroup] = useState({ id: 0, name: "", userId: 0 });
  const isEditStudentGroup = useLocation().state.isEditStudentGroup;
  const groupId = useLocation().state.groupId;
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    if (isEditStudentGroup === false) {
      fetch(`https://localhost:7287/api/Users/${userId}`, {
        headers: {
          Authorization: `Bearer ${data.token}`, // librarian token
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setUserProfile(data);
        });
    } else if (isEditStudentGroup === true) {
      fetch(`https://localhost:7287/api/Groups/${groupId}`, {
        headers: {
          Authorization: `Bearer ${data.token}`, // librarian token
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setGroup(data);
        });

      fetch(`https://localhost:7287/api/Users`, {
        headers: {
          Authorization: `Bearer ${data.token}`, // librarian token
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("fasdf" + group.userId);
          console.log(data.map((teacher) => teacher.id));
          setTeachers(data);
        });
    }
  }, []);

  const [userProfile , setUserProfile ] = useState([])
  const showPreview = (e) => {
    if (e.target.files && e.target.files[0]) {
      let imageFile = e.target.files[0];

      console.log(imageFile);
      const reader = new FileReader();
      reader.onload = (x) => {
        if (isEditStudentGroup === false)
          setUserProfile({
            ...userProfile,
            imageFile: imageFile,
            imagePath: userProfile.imagePath,
          });
      };
      reader.readAsDataURL(imageFile);
    }


  }

  const getUser = (e) => {
    fetch(`https://localhost:7287/api/Users`, {
      headers: {
        Authorization: `Bearer ${data.token}`, //librarian token
        "Content-Type": "application/json",
      },
    })  
      .then((res) => res.json())
      .then((data) => {
        setTeachers(data);
      });

    setGroup({ ...group, userId: e.target.value });


  }

  // handleUpdateTeacherSubmit
  const handleUpdateTeacherSubmit = (e) => {
    e.preventDefault();
    console.log(userProfile);
    const formData = new FormData();
    formData.append("id", userProfile.id);
    console.log(userProfile.id);
    formData.append("imageFile", userProfile.imageFile);
    formData.append("imagePath", userProfile.imagePath);
    formData.append("username", userProfile.username);
    formData.append("password", userProfile.password);
    formData.append("role", userProfile.role);
    formData.append("token", userProfile.token);
    formData.append("groupId", userProfile.groupId);
    fetch(`https://localhost:7287/api/Users/${userId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${data.token}`, // librarian token
      },
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 400) {
          setValidation({
            ...validation,
            updateStatus: "password must contain 6 charaters",
          });
        } else if (data.status === "success") {
          Swal.fire({
            title: "Your teacher account has been created successfully!",
            text: "You clicked the button!",
            icon: "success",
          });
          setValidation({ ...validation, updateStatus: "" });
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
          });
          setValidation({ ...validation, updateStatus: "" });
        }
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };


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
              {/* <li className="nav-item">
                <NavLink
                  to="/CreateStudents"
                  activeclassName="active"
                  className="nav-links"
                  onClick={handleClick}
                >
                  List Group
                </NavLink>
              </li> */}
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


        {/* container table */}

        <div className="container">
          <div className="crud shadow-lg p-3 mb-5 mt-5 bg-body rounded">
            <div className="row">
              <div className="col-sm-3 mt-5 mb-4 text-gred">
                <div className="search">
                  <form className="form-inline">
                    <input className="form-control mr-sm-2" type="search" placeholder="Search Teacher" aria-label="Search" />
                  </form>
                </div>
              </div>
              <div className="col-sm-3 offset-sm-2 mt-5 mb-4 text-gred text-center" style={{ color: "green" }}><h2><b>Teacher List</b></h2></div>
              <div className="col-sm-3 offset-sm-1 mt-5 mb-4 text-gred">
                <Button variant="primary" onClick={handleShow}>
                  Add New Teacher
                </Button>
              </div>
            </div>
            <div className="row">
              <div className="table-responsive" style={{ fontFamily: 'Allerta Stencil', maxHeight: '400px', overflowY: 'auto', overflowX: 'auto' }}>
                <Table striped bordered hover responsive className="mt-4 text-center" style={{ minWidth: '600px' }}>

                  <thead>
                    <tr>
                      <th className="text-center">Id</th>
                      <th>Profile</th>
                      <th>username</th>
                      <th>Password</th>
                      <th>Role</th>
                      <th className="text-center">Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {users ? (
                      users.map((user) => (
                        <tr className="align-middle" key={user.id}>
                          <td>
                            <div className="d-flex align-items-center">
                              <div>
                                <div className="h6 mb-0 lh-1">{user.id}</div>
                              </div>
                            </div>
                          </td>
                          <td>
                            <img
                              src={`https://localhost:7287/images/userprofiles/${user.imagePath}`}
                              className="rounded-circle "
                              alt="Customer"
                              style={{ width: "80px", height: "80px" }}
                            ></img>
                          </td>

                          <td>{user.username}</td>
                          <td>
                            <span>{user.password}</span>
                          </td>
                          <td>
                            {" "}
                            <span className="d-inline-block align-middle">
                              {user.role}
                            </span>
                          </td>
                          {/* button */}
                          <td className="text-center">
                            <div className="d-flex justify-content-center">
                              {/* Edit button using faicon */}
                              <button className="btn btn-warning"
                                onClick={() => handleEditTeacher(user)}
                              >
                                <FontAwesomeIcon icon={faEdit} />

                              </button>

                              {/* Delete button using faicon */}
                              <button className="btn btn-danger mx-2">
                                <FontAwesomeIcon icon={faTrash} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))

                    ) : (

                      <div className="d-flex justify-content-center">
                        <div className="spinner-border" role="status">
                          <span className="visually-hidden">Loading...</span>
                        </div>
                      </div>
                    )}
                  </tbody>
                </Table>

              </div>
            </div>
            {/* Add input teacher Modal */}
            <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} style={{ marginTop: '90px', fontFamily: 'Allerta Stencil', width: '100%', height: '100%' }}>
              <Modal.Header closeButton style={{ background: "#198754" }}>
                <Modal.Title style={{ color: 'white', textAlign: 'center' }}>Add Teacher</Modal.Title>


              </Modal.Header>
              <Modal.Body style={{ background: "#e3f2fd" }}>
                <div className="container">
                  <div className="row d-flex align-items-center justify-content-center h-100">
                    <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
                      <div className="">
                        <div className="card mb-4 mb-xl-0">
                          <div className="card-header">Profile Picture</div>
                          <div className="card-body text-center">
                            <img
                              className="card-img-top"
                              src={user.imagePath}
                              alt=""
                            ></img>
                            <input
                              className="form-control form-control-lg"
                              id="formFileLg"
                              type="file"
                              accept="image/*"
                              onChange={showPreview}
                            ></input>
                          </div>
                        </div>
                      </div>
                      <br></br>
                      <form
                        className="d-flex flex-column justify-content-center"
                        onSubmit={handleCreateTeacher}
                      >
                        <div className="form-outline mb-4 ">
                          <label className="form-label" htmlFor="username">
                            Username
                          </label>
                          <input
                            value={user.username}
                            name="username"
                            type="text"
                            id="username"
                            className="form-control form-control-lg"
                            onChange={handleUsernameInput}
                          />
                        </div>
                        {validation.username !== "" && (
                          <span className="text-danger">{validation.username}</span>
                        )}
                        <div className="form-outline mb-4">
                          <label className="form-label" htmlFor="password">
                            Password
                          </label>
                          <input
                            value={user.password}
                            name="password"
                            type="password"
                            id="password"
                            className="form-control form-control-lg"
                            onChange={handlePasswordInput}
                            autoComplete='true'
                          />
                        </div>
                        {validation.password !== "" && (
                          <span className="text-danger">{validation.password}</span>
                        )}
                        <div className="form-outline mb-4">
                          <label className="form-label" htmlFor="confirmPassword">
                            Confirm Password
                          </label>
                          <input
                            value={user.confirmPassword}
                            name="confirmPassword"
                            type="password"
                            id="confirmPassword"
                            className="form-control form-control-lg"
                            onChange={handleConfirmPassword}
                            autoComplete='true'
                          />
                        </div>
                        {validation.confirmPassword !== "" && (
                          <span className="text-danger">
                            {validation.confirmPassword}
                          </span>
                        )}
                        <div className="text-danger"></div>

                        <div className="d-flex justify-content-around align-items-center mb-4"></div>

                        {validation.isUserExisted === true && (
                          <span className="text-danger">Username already exits</span>
                        )}
                        <button
                          type="submit"
                          className="btn btn-primary btn-lg btn-block"
                        >
                          Sign up
                        </button>
                      </form>
                      <br></br>
                    </div>
                  </div>
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>


            {/* // Render the Edit Modal */}
            <Modal show={showUpdateModal} onHide={handleCloseUpdateModal} backdrop="static" keyboard={false} style={{ marginTop: "90px", fontFamily: "Allerta Stencil", width: "100%", height: "100%" }}>
              <Modal.Header closeButton style={{ background: "#33b5e5" }}>
                <Modal.Title>Update Teacher</Modal.Title>
              </Modal.Header>
              <Modal.Body style={{ background: "#e3f2fd" }}>
                <form onSubmit={handleUpdateTeacherSubmit}>
                <div className="col-xl-4">
              <div className="card mb-4 mb-xl-0">
                <div className="card-header">Profile Picture</div>
                <div className="card-body text-center">
                  <img
                    className="card-img-top"
                    src={
                      preview
                        ? preview
                        : `https://localhost:7287/images/userprofiles/${userProfile.imagePath}`
                    }
                    alt=""
                  ></img>

                  {/* <button className="btn btn-primary" type="button" >
                    Upload new image
                  </button>
                  <div> */}
                  <input
                    className="form-control form-control-lg"
                    id="formFileLg"
                    type="file"
                    accept="image/*"
                    onChange={showPreview}
                  ></input>
                </div>
              </div>
            </div>

                  <div className="form-group">
                    <label htmlFor="updatedUsername">Username:</label>
                    <input
                      type="text"
                      className="form-control"
                      id="updatedUsername"
                      value={updatedUsername}
                      onChange={(e) => setUpdatedUsername(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Password:</label>
                    <div className="input-group">
                      <input
                        type={showPassword ? "text" : "password"}
                        className="form-control"
                        id="updatedPassword"
                        value={updatedPassword}
                        onChange={(e) => setUpdatedPassword(e.target.value)}
                        required
                      />
                      <button
                        className="btn btn-outline-secondary"
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? "Hide" : "Show"}
                      </button>
                    </div>
                  </div>
                  <button type="submit" className="btn btn-success mt-4">
                    Update Teacher
                  </button>
                </form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseUpdateModal}>
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