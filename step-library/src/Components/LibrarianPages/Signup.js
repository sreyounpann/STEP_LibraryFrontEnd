import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const SignupComponent = () => {
  const [data, setData] = useState({
    api_token: 'api_65855bfab232f',
    username: '',
    password: '',
    confirm_Password: '',
  });

  const navigate = useNavigate();
  const [whenFieldsNotInput] = useState('');

  const handleSignup = (e) => {
    e.preventDefault();
  
    if (
      data.username.length > 0 &&
      data.password.length > 0 &&
      data.confirm_Password.length > 0
    ) {
      if (data.password === data.confirm_Password) {
        console.log(data);
        
        fetch('https://localhost:7287/api/Users', {
          method: 'POST' ,
          headers: {
            'Content-Type': 'application/json',
          }, 
          body: JSON.stringify(data),
        })
          .then((response) => {
            if (response.ok) {
              return response.json();
            } else {
              throw new Error(response.statusText);
            }
          })
          .then((responseData) => {
            if (responseData.status === 'SUCCESS') {
              console.log(responseData);
              showSuccessAlert();
              setTimeout(() => {
                navigate('/LoginLibrarian');
              }, 2000);
            } else if (responseData.status === 'USER_EXISTS') {
              updateMessageInfo('userExists');
            } else {
              updateMessageInfo(); // Default error message
            }
          })
          .catch((error) => {
            console.error('Error:', error);
            updateMessageInfo(); // Default error message
          });
      } else {
        updateMessageInfo(); // Default error message
      }
    } else {
      updateMessageInfo(); // Default error message
    }
  };
  

  const updateMessageInfo = (errorType = 'default') => {
    let errorMessage;

    switch (errorType) {
      case 'userExists':
        errorMessage =
          'User with this username already exists. Please choose a different one.';
        break;
      default:
        errorMessage = 'Something went wrong!';
        break;
    }

    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: errorMessage,
    });
  };

  const showSuccessAlert = () => {
    Swal.fire({
      icon: 'success',
      title: 'Registration Successful!',
      text: 'Your account has been created successfully.',
    });
  };

  const handleLogin = () => {
    navigate('/LoginLibrarian');
  };

  return (
    <div className='App'>
       <style>
                {`
                    body {
                        background-color: #e3f2fd;
                        font-family: 'Allerta Stencil', sans-serif;
                    }
                `}
            </style>
    <section className="h-100">
      <div className="container h-100">
        <div className="row justify-content-sm-center h-100">
          <div className="col-xxl-4 col-xl-5 col-lg-5 col-md-7 col-sm-9">
            <div className="text-center my-5">
              <img src="https://fsx1.itstep.org/api/v1/files/-bRZCFuPESE9skZZlyP75n4dL9uFnEpm" alt="logo" width="100" />
            </div>
            <div className="card shadow-lg">
              <div className="card-body p-5">
                <h1 className="fs-4 card-title fw-bold mb-4" style={{textAlign: 'center'}}>Signup</h1>
                <form onSubmit={handleSignup} className="needs-validation" noValidate autoComplete="off">
                  <div className="mb-3">
                    <label className="mb-2 text-muted" htmlFor="username">
                      Username
                    </label>
                    <input
  id="username"
  type="text"
  className={`form-control ${whenFieldsNotInput}`}
  name="username"
  value={data.username}
  onChange={(e) => setData({ ...data, username: e.target.value })}
  required
  autoFocus
/>
                    <div className="invalid-feedback">Username is required</div>
                  </div>

                  <div className="mb-3">
                    <label className="mb-2 text-muted" htmlFor="password">
                      Password
                    </label>
                    <input
                      id="password"
                      type="password"
                      className={`form-control ${whenFieldsNotInput}`}
                      name="password"
                      value={data.password}
                      onChange={(e) => setData({ ...data, password: e.target.value })}
                      required
                    />
                    <div className="invalid-feedback">Password is required</div>
                  </div>

                  <div className="mb-3">
                    <label className="mb-2 text-muted" htmlFor="confirm_Password">
                      Confirm Password
                    </label>
                    <input
  id="confirm_Password"
  type="password"
  className={`form-control ${whenFieldsNotInput}`}
  name="confirm_Password"
  value={data.confirm_Password}
  onChange={(e) => setData({ ...data, confirm_Password: e.target.value })}
  required
/>

                    <div className="invalid-feedback">Confirm Password is required</div>
                  </div>

                  <div className="d-flex justify-content-center">
                    <button type="submit" className="btn btn-primary mx-auto">
                      Signup
                    </button>
                  </div>
                </form>
              </div>
              <div className="card-footer py-3 border-0">
                <div className="text-center">
                  Already have an account?{' '}
                  <span className="text-dark" onClick={handleLogin} style={{ cursor: 'pointer' }}>
                    Login
                  </span>
                </div>
              </div>
            </div>
            <div className="text-center mt-5 text-muted">Copyright &copy; 2023-2024 &mdash; IT STEP</div>
          </div>
        </div>
      </div>
    </section>
    </div>
  );
};

export default SignupComponent;
