import React, { useState } from "react";
import swal from 'sweetalert';
import FundooNoteServices from "../../service/FundooNoteServices";
import '../../styles/Forgotpassword.css';

const services = new FundooNoteServices();

function Register() {

    const [recoverInput, setRegister] = useState({
        email: '',
        error_list: [],
    });

    const handleInput = (event) => {
        event.persist();
        setRegister({ ...recoverInput, [event.target.name]: event.target.value });
    }

    const emailSubmit = (event) => {
        event.preventDefault();

        const data = {
            email: recoverInput.email,
        }

        services.forgotPassword(data).then(res => {
            if (res.data.status === 200) {
                swal("Success", res.data.message, "success");
            } else if (res.data.status === 404) {
                swal("Success", res.data.message, "success");
            } else {
                setRegister({ ...recoverInput, error_list: res.data.validation_error })
            }
        });
    }

    return (
        <div>
            <div className="fpContainer">
                <div className="fpCard">
                    <div className="title">
                        <h2 className="text-center mt-5">
                            <span style={{ color: "#FF0000" }}>F</span>
                            <span style={{ color: "#66CC66" }}>u</span>
                            <span style={{ color: "#FF9966" }}>n</span>
                            <span style={{ color: "#4285F4" }}>d</span>
                            <span style={{ color: "#FF0066" }}>o</span>
                            <span style={{ color: "#0F9D58" }}>o</span>
                        </h2>
                    </div>
                    <h4 className="text-center">Account Recovery</h4>
                    <p className="text-center">Enter your recovery email</p>

                    <div className="row">
                        <form onSubmit={emailSubmit}>
                            <div className="form-group-mb-3">
                                <input type="text" name="email" onChange={handleInput} value={recoverInput.email} className="form-control" placeholder="Enter email" />
                                <p className="text-danger">{recoverInput.error_list.email}</p>
                            </div>
                            <div className="form-group mt-4">
                                <button type="submit" className="btn btn-primary float-end">Next</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;