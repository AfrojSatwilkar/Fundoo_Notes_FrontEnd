import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import swal from "sweetalert";
import FundooNoteServices from "../../service/FundooNoteServices";
import '../../styles/Login.css';

const services = new FundooNoteServices();

function Login() {

    const history = useHistory();

    const [loginInput, setLogin] = useState({
        email: '',
        password: '',
        errEmail: '',
        errPass: '',
        error_list: [],
    });


    const handleInput = (event) => {
        // event.persist();
        setLogin({ ...loginInput, [event.target.name]: event.target.value });
    }

    useEffect(() => {
        if (loginInput.email !== '')
            validate("email");

    })
    useEffect(() => {
        if (loginInput.password.length > 0)
            validate("password");

    })

    const validate = (name) => {
        switch (name) {
          case 'email':
            const regEmail = new RegExp('^[a-zA-Z0-9._:$!%-]+(@[a-zA-Z0-9.-]{3,})+(.[a-zA-Z]{2,})$');
            
    
            if (!regEmail.test(loginInput.email) && (loginInput.email !== "")) {
                loginInput.errEmail = "The email must be a valid email address.";

    
            } else {
                loginInput.errEmail = "";
              
            }
            return loginInput.errEmail;
          case 'password':
            const regPass = new RegExp('^([a-zA-Z0-9@$!%*#?&]){7,}$');
            
            if (!regPass.test(loginInput.password) && loginInput.password !== "") {
                loginInput.errPass = "The email must be a valid email address.";
            }
            else {
                loginInput.errPass = "";
            }
            
            return loginInput.errPass
          default:
            return false;
    
    
        }
      }

    const showPassword = () => {
        var show = document.getElementById("Show");
        if (show.type === "password") {
            show.type = "text";
        } else {
            show.type = "password";
        }
    }

    const loginSubmit = (event) => {
        event.preventDefault();

        const data = {
            email: loginInput.email,
            password: loginInput.password,
        }

        // axios.post(`/api/login`, data).then(res => {
        services.login(data).then(res => {
            if (res.data.status === 201) {
                localStorage.setItem('auth_token', res.data.token);
                localStorage.setItem('firstName', res.data.firstname);
                localStorage.setItem('lastName', res.data.lastname);
                localStorage.setItem('email', res.data.email);
                swal("Success", res.data.message, "success");
                history.push('/dashboard/note');
            } else if (res.data.status === 402) {
                swal("Warning", res.data.message, "error");
            } else if (res.data.status === 211) {
                swal("Warning", res.data.message, "error");
            } else {
                setLogin({ ...loginInput, error_list: res.data.validation_error })
            }
        });
    }

    return (
        <div className="loginContainer">
            <div className="loginCard">
                <div className="title">
                    <h2 className="fundoo text-center mt-5">
                        <span style={{ color: "#FF0000" }}>F</span>
                        <span style={{ color: "#66CC66" }}>u</span>
                        <span style={{ color: "#FF9966" }}>n</span>
                        <span style={{ color: "#4285F4" }}>d</span>
                        <span style={{ color: "#FF0066" }}>o</span>
                        <span style={{ color: "#0F9D58" }}>o</span>
                    </h2>
                </div>
                <h4 className="text-center">Sign in</h4>
                <p className="text-center">Use your Fundoo Account</p>
                <div className="card-body">
                    <form onSubmit={loginSubmit}>
                        <div className="form-group mb-4">
                            <input type="email" name="email" value={loginInput.email} onChange={handleInput} className="form-control" placeholder="Enter email" />
                            <p id="Message" className="text-danger">{loginInput.errEmail}</p>
                        </div>
                        <div className="form-group mb-2">
                            <input type="password" name="password" id="Show" onChange={handleInput} value={loginInput.password} className="form-control" placeholder="Enter password" />
                            <p id="pass" className="text-danger">{loginInput.errPass}</p>

                        </div>
                        <input type="checkbox" name="show" onClick={showPassword} />
                        <label className="ml-3">Show password</label>
                        <div className="form-group-mb-3 mt-3">
                            <Link to="/forgotpassword" className="text-decoration-none mb-3">Forgot password?</Link>
                        </div>
                        <div className="form-group mt-5">
                            <Link to="/register" className="text-decoration-none">Create account</Link>
                            <button type="submit" className="btn btn-primary float-end">Login</button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;