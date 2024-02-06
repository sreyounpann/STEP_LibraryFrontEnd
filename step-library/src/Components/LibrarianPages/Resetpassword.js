// LibrarianNavbar.js
import React, { useState ,useEffect } from "react";
import { NavLink } from "react-router-dom";
import { CodeIcon, HamburgetMenuClose, HamburgetMenuOpen } from "../Icons";
import { Modal, Button, Container, Row, Col, Form, Table } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

function ResetPasswordComponent() {
  const [click, setClick] = useState(false);
  const location = useLocation();
  const userData = location.state ? location.state.userData : null;
  const [users, setUsers] = useState(null);
  const navigate = useNavigate();

  const handleClick = () => setClick(!click);

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
  const [userprofiles , setUserprofiles] = useState(null);
  const userId = useLocation().state.id;

  const groupId = useLocation().state.groupId;



  const [group, setGroup]  = useState({id: 0, name: '', userId: 0 });

 
  //data from ViewGroup
  const groupIsBeingViewed = useLocation().state.groupIsBeingViewed;
  const bookId = useLocation().state.bookId;
  const [book, setBook] = useState();


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


  // const editTeacherHandler = (e) => {
  //   e.preventDefault();
  //  console.log(user)
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
              
              </div>
              <div className="col-sm-3 offset-sm-2 mt-5 mb-4 text-gred text-center" style={{ color: "green" }}><h2><b>Modify Password</b></h2></div>
            
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
                            <button className="btn btn-warning">
                              <FontAwesomeIcon icon={faEdit} 
                           
                              
                              />
                            </button>
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
          </div>
        </div>
      </div>
  
  );
}


export default ResetPasswordComponent;
