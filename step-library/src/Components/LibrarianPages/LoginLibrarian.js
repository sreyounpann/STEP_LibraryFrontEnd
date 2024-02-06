import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Cookies from 'js-cookie';

// better version (hehehe)
const LoginLibrarianComponent = () => {
  const [data, setData] = useState({
    username: '',
    password: '',
  });

  const [whenFieldsNotInput, setWhenFieldsNotInput] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const loginedData = JSON.parse(localStorage.getItem('user_logined'));
  const [validation, setValidation] = useState({username: '', password: ''})
  const [user, setUser] = useState({username: '', password: ''});
  const [userStatus, setUserStatus] = useState(null);

  const navigate = useNavigate();


  useEffect(() => {
    if(typeof(Cookies.get('roleToken')) !== 'undefined')
    isUserTokenExpired(Cookies.get('roleToken'));

  }, []);

  const isUserTokenExpired = (tokenValue) => {
    fetch(`https://localhost:7287/api/Users/token` , {
      method : 'POST' ,
      headers : {
        'Content-Type' : 'application/json',
      },
      body : JSON.stringify({value: tokenValue}),
    }).then((res) => res.json())
    .then((data) => {
      if(data.role === 'Teacher'){
        navigate('/Homepage', {state: {userData: data}}); 
       
      }       
      else if(data.role === 'Librarian') navigate('/LibrarianHomepage', {state: {userData: data}});     

      console.log(data);
    });
    
}

  const handleLogin = (e) => {
    e.preventDefault();

    if (user.username.length > 0 && user.password.length === 6) {
      fetch(`https://localhost:7287/api/Users/${user.username}/${user.password}`)
        .then((res) => res.json())
        .then((data) => {
          if(data.role === 'Librarian'){
            console.log('true');

            Cookies.set('roleToken', data.token);
            navigate('/LibrarianHomepage', {state: {userData: data}});

          }else if(data.role === 'Teacher'){
            Cookies.set('roleToken', data.token);
            navigate('/Homepage', {state: {userData: data}});
            // swal 
            
          }else if(data.title === 'Not Found'){
            console.log('no found');
            setUserStatus('check your username or password');
            
          }
          localStorage.setItem('userToken',data.token);
          
        });
    } else {
      setUserStatus('check your username or password') ;

      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
        footer: '<a href>Why do I have this issue?</a>',
      });

    }
  };

  // handle username input
  const handleUsernameInput=(e)=>{
    e.preventDefault();
    if(e.target.name === 'username' && e.target.value.length > 15) setValidation({...validation, [e.target.name]: 'Username must contain 15 digits'});
    else setValidation({...validation, [e.target.name]: ''});
    setUser({...user, [e.target.name]: e.target.value}) 
    setUserStatus('');
}

const handlePasswordInput=(e)=>{
  e.preventDefault();
  if(e.target.name === 'password' && e.target.value.length !== 6) setValidation({...validation, [e.target.name]: 'Password must contain 6 digits'});
  else setValidation({...validation, [e.target.name]: ''});
  setUser({...user, [e.target.name]: e.target.value})
  setUserStatus('');
}





 



  // const handleSignUp = () => {
  //   Swal.fire({
  //     title: "Are you sure?",
  //     icon: "warning",
  //     showCancelButton: true,
  //     confirmButtonColor: "#3085d6",
  //     cancelButtonColor: "#d33",
  //     confirmButtonText: "Yes, sign out!",
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       Cookies.remove("roleToken");
  //       navigate("/Signup");
  //     }
  //   });
  // }

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
                  <h1 className="fs-4 card-title fw-bold mb-4" style={{ textAlign: 'center' }}>Login</h1>
                  <form onSubmit={handleLogin} className="needs-validation" noValidate autoComplete="off">
                    <div className="mb-3">
                      <label className="mb-2 text-muted" htmlFor="username">
                        Username
                      </label>
                      <input
                        id="username"
                        type="text"
                        className={`form-control ${whenFieldsNotInput}`}
                        name="username"
                        value={user.username}
                        onChange={handleUsernameInput}
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
                        value={user.password}
                        onChange={handlePasswordInput}
                        required
                      />
                      <div className="invalid-feedback">Password is required</div>
                    </div>

                    <div className="d-flex justify-content-center">
                      <button type="submit" className="btn btn-primary mx-auto">
                        Login
                      </button>
                    </div>
                  </form>
                </div>
                {/* <div className="card-footer py-3 border-0">
                  <div className="text-center">
                    Don't have an account?{' '}
                    <span className="text-dark" onClick={handleSignUp} style={{ cursor: 'pointer' }}>
                      Sign Up
                    </span>
                  </div>
                </div> */}
              </div>
              <div className="text-center mt-5 text-muted">Copyright &copy; 2023-2024 &mdash; IT STEP</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LoginLibrarianComponent;
