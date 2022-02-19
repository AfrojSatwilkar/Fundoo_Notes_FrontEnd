import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import swal from 'sweetalert';
import logo from '../../assets/images/registration.jpg';
import FundooNoteServices from "../../service/FundooNoteServices";
import '../../styles/Registration.css';

const services = new FundooNoteServices();
function Register() {

    const history = useHistory();

    const [registerInput, setRegister] = useState({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        confirm_password: '',
        error_list: {
            name: '',
            email: '',
            password: '',
        },
    });
    const handleInput = (event) => {
        event.persist();

        setRegister({ ...registerInput, [event.target.name]: event.target.value });
    }

    useEffect(() => {
        if (registerInput.firstname.length > 0)
            validate("firstname");

    })
    useEffect(() => {
        if (registerInput.lastname.length > 0)
            validate("lastname");

    })
    useEffect(() => {
        if (registerInput.email.length > 0)
            validate("email");
    })
    useEffect(() => {
        if (registerInput.password.length > 0)
            validate("password");
    })
    useEffect(() => {
        if (registerInput.confirm_password.length > 0 ){
            validate("confirm_password");
        }
    })

    const validate = (name) => {
        switch (name) {
            case 'firstname':
                const regFirstname = new RegExp('^[A-Za-z]{2,}$');

                if (!regFirstname.test(registerInput.firstname) && (registerInput.firstname !== "")) {
                    registerInput.error_list.name = "First Name must be 3 characters long!";
                } else {
                    registerInput.error_list.name = "";
                }
                break;
            case 'lastname':
                const regLastname = new RegExp('^[A-Za-z]{2,}$');

                if (!regLastname.test(registerInput.lastname) && (registerInput.lastname !== "")) {
                    registerInput.error_list.name = "Last Name must be 3 characters long!";
                }
                else {
                    registerInput.error_list.name = "";
                }
                break;
            case 'email':
                const regEmail = new RegExp('^[a-zA-Z0-9._:$!%-]+(@[a-zA-Z0-9.-]{3,})+(.[a-zA-Z]{2,})$');

                if (!regEmail.test(registerInput.email) && (registerInput.email !== "")) {
                    registerInput.error_list.email = "The email must be a valid email address.";
                } else {
                    registerInput.error_list.email = "";
                }
                break;
            case 'password':
                const regPass = new RegExp('^([a-zA-Z0-9@$!%*#?&]){8,}$');

                if (!regPass.test(registerInput.password) && (registerInput.password !== "")) {
                    registerInput.error_list.password = "Invalid password";
                }
                else {
                    registerInput.error_list.password = "";
                }
                break;
            case 'confirm_password':
                if ((registerInput.confirm_password.length > 7)) {
                    registerInput.error_list.password = "";
                }
                else {
                    registerInput.error_list.password = "The confirm password must be same as password.";
                }
                break;
            default:
                break;
        }
    }

    const showPassword = () => {
        var show = document.getElementById("Show");
        var pass = document.getElementById("pass");
        if (show.type === "password" || pass.type === "password") {
            show.type = "text";
            pass.type = "text";
        } else {
            show.type = "password";
            pass.type = "password";
        }
    }

    const registerSubmit = (event) => {
        event.preventDefault();

        const data = {
            firstname: registerInput.firstname,
            lastname: registerInput.lastname,
            email: registerInput.email,
            password: registerInput.password,
            confirm_password: registerInput.confirm_password,
        }

        // axios.post(`/api/register`, data).then(res => {
        services.register(data).then(res => {
            if (res.data.status === 201) {
                swal("Success", res.data.message, "success");
                history.push('/');
            } else {
                setRegister({ ...registerInput, error_list: res.data.validation_error })
            }
        });
    }

    return (
        <div>
            <div className="registrationContainer">
                <div className="registrationCard">
                    <div className="leftContainer">
                        <div className="title">
                            <h2 className="text-center mt-3">
                                <span style={{ color: "#FF0000" }}>F</span>
                                <span style={{ color: "#66CC66" }}>u</span>
                                <span style={{ color: "#FF9966" }}>n</span>
                                <span style={{ color: "#4285F4" }}>d</span>
                                <span style={{ color: "#FF0066" }}>o</span>
                                <span style={{ color: "#0F9D58" }}>o</span>
                            </h2>

                        </div>
                        <h6 className="text-center mb-4">Create your Fundoo Note Account</h6>
                        <form onSubmit={registerSubmit}>
                            <div className="fname mb-4">
                                <input className="row-name" type="text" name="firstname" onChange={handleInput} value={registerInput.firstname} placeholder="First name" />
                                <input type="text" name="lastname" onChange={handleInput} value={registerInput.lastname} placeholder="Last name" />
                                <p className="text-danger">{registerInput.error_list.name}</p>
                            </div>
                            <div className="form-group mb-5">
                                <input type="text" name="email" onChange={handleInput} value={registerInput.email} className="form-control" placeholder="Email" />
                                <p id="email">You can use letters, numbers & periods</p>
                                <p className="text-danger">{registerInput.error_list.email}</p>
                            </div>
                            <div className="pass">
                                <input className="row-pass" type="password" name="password" value={registerInput.password} id="Show" onChange={handleInput} placeholder="Password" />
                                <input type="password" name="confirm_password" value={registerInput.confirm_password} id="pass" onChange={handleInput} placeholder="Confirm password" />
                                <p>Use 8 or more characters with a mix of letters, numbers &
                                    <br /> symbols</p>
                                <p className="text-danger">{registerInput.error_list.password}</p>
                            </div>

                            <input className="mb-5" type="checkbox" name="show" onClick={showPassword} />
                            <label>Show password</label>

                            <div className="form-group">
                                <Link to="/login" className="text-decoration-none">Sign in instead</Link>
                                <button type="submit" className="btn btn-primary float-end" >Register</button>
                            </div>
                        </form>
                    </div>


                    <div className="rightContainer">
                        <img src={logo} alt="logo" />
                        <p> One account. All of Google working for you.</p>
                    </div>
                </div>
            </div>


        </div >
    );
}

export default Register;