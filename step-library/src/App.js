import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomepageComponent from './Components/TeacherPages/Homepage';
import UploadBookComponent from './Components/TeacherPages/UploadBook';
import ManageGroupComponent from './Components/TeacherPages/ViewGroups';
import EbookManageComponent from './Components/TeacherPages/EbookManagement';
import LoginLibrarianComponent from './Components/LibrarianPages/LoginLibrarian';
import SignupComponent from './Components/LibrarianPages/Signup';
import LibrarianHomepageComponent from './Components/LibrarianPages/LibrarianHomepage';
import CreateTeacherComponent from './Components/LibrarianPages/CreateTeacher';
import CreatStudentComponent from './Components/LibrarianPages/CreateStudents.';
import ManageStudentGroupComponent from './Components/LibrarianPages/ManageStudentGroup';
import ManageGroupsComponent from './Components/LibrarianPages/ManagementGroups';
import ResetPasswordComponent from './Components/LibrarianPages/Resetpassword';
// import Cookies from "js-cookie";



const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Teacher Pages */}
        
          <Route path="/Homepage" element={<HomepageComponent />} />
          <Route path="/UploadBook" element={<UploadBookComponent />} />
          <Route path="/ViewGroups" element={<ManageGroupComponent />} />
          <Route path="/EbookManagement" element={<EbookManageComponent />} />
  

          {/* Librarian Pages */}
         {/* <Route path="/" element={<CreateTeacherComponent />} /> */}

          <Route path="/" element={<LoginLibrarianComponent />} />
          <Route path="/Signup" element={<SignupComponent />} />
          <Route path="/LibrarianHomepage" element={<LibrarianHomepageComponent />} />
          <Route path="/CreateTeacher" element={<CreateTeacherComponent />} />
          <Route path="/CreateStudents" element={<CreatStudentComponent />} />
          <Route path="/ManageStudentGroup" element={<ManageStudentGroupComponent />} />
          <Route path="/ManagementGroups" element={<ManageGroupsComponent />} />
          <Route path="/Resetpassword" element={<ResetPasswordComponent />} />

        </Routes>
      </div>
    </Router>
  );
};

export default App;
