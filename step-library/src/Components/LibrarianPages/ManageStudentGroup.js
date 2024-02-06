// // LibrarianNavbar.js
// import React, { useState } from "react";
// import { NavLink } from "react-router-dom";
// import { CodeIcon, HamburgetMenuClose, HamburgetMenuOpen } from "../Icons";

// function ManageStudentGroupComponent() {
//   const [click, setClick] = useState(false);

//   const handleClick = () => setClick(!click);

//   return (
//     <div className='App'>
//       <style>
//         {`

//                 body {
//                     background-color: #e3f2fd;
//                     font-family: 'Allerta Stencil', sans-serif;
                    
//                 }
//                  .navbar {
//                     background-color: #1f5156;
//                     height: 100px;
//                     display: flex;
//                     justify-content: center;
//                     align-items: center;
//                     font-size: 1.2rem;
//                     position: sticky;
//                     top: 0;
//                     z-index: 20;
//                   }
                  
//                   .nav-container {
//                     display: flex;
//                     justify-content: center;
//                     align-items: center;
//                     width: 100%;
//                     height: 80px;
//                     max-width: 1500px;
//                     position: relative;
//                   }
                  
//                   .nav-logo {
//                     color: #f5b921;
//                     align-items: center;
//                     margin-left: 20px;
//                     cursor: pointer;
//                     text-decoration: none;
//                     font-size: 2rem;
//                     flex-grow: 1;
                  
//                     display: flex;
//                     align-items: center;
//                     justify-items: center;
//                   }
                  
//                   .nav-logo .icon {
//                     display: inline-block;
//                     width: 3rem;
//                     height: 3rem;
//                     margin-left: 16px;
//                   }
                  
//                   .nav-menu {
//                     display: flex;
//                     list-style: none;
//                     text-align: center;
//                     margin-right: 2rem;
//                     width: 100%;
//                     justify-content: space-evenly;
//                      margin-top: 30px;
//                   }
                  
//                   .nav-links {
//                     color: #fff;
//                     text-decoration: none;
//                     padding: 0.5rem 1rem;
//                     height: 100%;
//                     border-bottom: 3px solid transparent;
//                   }
//                   /* .fa-code {
//                     margin-left: 1rem;
//                   } */
                  
//                   .nav-item {
//                     line-height: 40px;
//                     margin-right: 1rem;
//                   }
                  
//                   .nav-item:after {
//                     content: "";
//                     display: block;
//                     height: 3px;
//                     width: 0;
//                     background: transparent;
//                     transition: width 0.7s ease, background-color 0.5s ease;
//                   }
                  
//                   .nav-item:hover:after {
//                     width: 100%;
//                     background: #ffdd40;
//                   }
                  
//                   .nav-item .active {
//                     color: #ffdd40;
//                     border: 1px solid #ffdd40;
//                   }
                  
//                   .nav-icon {
//                     display: none;
//                     color: #f5b921;
//                   }
                  
//                   .nav-icon .icon {
//                     display: inline-block;
//                     width: 2rem;
//                     height: 2rem;
//                   }
                  
//                   @media screen and (max-width: 960px) {
//                     .nav-menu {
//                       display: flex;
//                       flex-direction: column;
//                       width: 100%;
//                       border-top: 1pxsolid #fff;
//                       position: absolute;
//                       top: 80px;
//                       left: -110%;
//                       opacity: 1;
//                       transition: all 0.5s ease;
//                     }
                  
//                     .nav-menu.active {
//                       background: #1f5156;
//                       left: 0px;
//                       opacity: 1;
//                       transition: all 0.5s ease;
//                       z-index: 1;
//                     }
//                     .nav-item .active {
//                       color: #ffdd40;
//                       border: none;
//                     }
//                     .nav-links {
//                       padding: 1.5rem;
//                       width: 100%;
//                       display: table;
//                     }
                  
//                     .nav-logo .icon {
//                       width: 2rem;
//                       height: 2rem;
//                     }
                  
//                     .nav-icon {
//                       display: block;
//                       position: absolute;
//                       top: 50%;
//                       right: 0;
//                       transform: translate(-100%, -50%);
//                       width: 2rem;
//                       height: 2rem;
//                       cursor: pointer;
//                       color: #ffdd40;
//                     }
//                   }

//                   .fade-in {
//                     animation: fadeIn 1s ease-in-out;
//                 }

//                 @keyframes fadeIn {
//                     from {
//                         opacity: 0;
//                     }
//                     to {
//                         opacity: 1;
//                     }
//                 }

             
//                     .dashboard-content {
//                         background-color: #fff;
//                         padding: 20px;
//                         border-radius: 10px;
//                         box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
//                         width: 80%;
//                         margin: 0 auto;
//                         margin-top: 50px;
//                         display: flex;
//                         flex-direction: column;
//                         align-items: center;
//                         justify-content: center;
//                         text-align: center;
//                     }
//                     .dashboard-content img {
//                         max-width: 100%;
//                         height: auto;
//                     }
//              `}
//       </style>
//       <nav className="navbar">
//         <div className="nav-container">
//           {/* Logo and Home link */}
          
//               <img
//                 src="https://fsx1.itstep.org/api/v1/files/-bRZCFuPESE9skZZlyP75n4dL9uFnEpm"
//                 alt="logo"
//                 width="50"
//                 style={{
//                   padding: '1px',
//                   marginTop: '10px',
//                   width: '100px',
//                   height: '220px',
//                 }}
//               />
         

//           {/* Navigation links */}
//           <ul className={click ? "nav-menu active" : "nav-menu"}>
//             <li className="nav-item">
//               <NavLink
//                 exact
//                 to="/LibrarianHomepage"
//                 activeclassName="active"
//                 className="nav-links"
//                 onClick={handleClick}
//               >
//                 Home
//               </NavLink>
//             </li>
//             <li className="nav-item">
//               <NavLink
//                 to="/CreateTeacher"
//                 activeclassName="active"
//                 className="nav-links"
//                 onClick={handleClick}
//               >
//                 Manage Teachers
//               </NavLink>
//             </li>
//             <li className="nav-item">
//               <NavLink
//                 to="/CreateStudents"
//                 activeclassName="active"
//                 className="nav-links"
//                 onClick={handleClick}
//               >
//                 List Group
//               </NavLink>
//             </li>
//             <li className="nav-item">
//               <NavLink
//                 to="/ManageStudentGroup"
//                 activeclassName="active"
//                 className="nav-links"
//                 onClick={handleClick}
//               >
//                 Manage Students Group
//               </NavLink>
//             </li>
//             <li className="nav-item">
//               <NavLink
//                 to="/ManagementGroups"
//                 activeclassName="active"
//                 className="nav-links"
//                 onClick={handleClick}
//               >
//                 Manage Groups
//               </NavLink>
//             </li>
//             <li className="nav-item">
//               <NavLink
//                 to="/Resetpassword"
//                 activeclassName="active"
//                 className="nav-links"
//                 onClick={handleClick}
//               >
//                 Reset Password
//               </NavLink>
//             </li>
//             <li className="nav-item">
//               <NavLink

//                 to="/LoginLibrarian"
//                 activeclassName="active"
//                 className="nav-links"
//                 onClick={handleClick}

//               >
//                 Log out
//               </NavLink>
//             </li>
//             {/* Add more navigation items as needed */}
//           </ul>

//           {/* Hamburger icon for mobile */}
//           <div className="nav-icon" onClick={handleClick}>
//             {click ? (
//               <span className="icon">
//                 <HamburgetMenuOpen />{" "}
//               </span>
//             ) : (
//               <span className="icon">
//                 <HamburgetMenuClose />
//               </span>
//             )}
//           </div>
//         </div>
//       </nav>
//       <div className="dashboard-content">
     
//         <h2 style={styles.heading}>Manage Student Group ! </h2>
//         <img src="https://media.giphy.com/media/UYpelo7WbjZQg0dDQY/giphy.gif" alt="banana" ></img>
//       </div>

//     </div>
//   );
// }
// const styles = {
//   container: {
//     height: '100vh',
//     overflow: 'hidden',
//   },
//   navbar: {
//     backgroundColor: '#33b5e5',
//   },
//   logo: {
//     borderRadius: '60%',
//     border: '2px solid #fff',
//     padding: '1px',
//     margin: '0px 20px 0px 15px',
//     size: '20px',
//   },
//   heading: {
//     color: '#33b5e5',
//     textAlign: 'center',
//     marginBottom: '20px',
//   },

// };

// export default ManageStudentGroupComponent;
