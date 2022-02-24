import React, {useState, useEffect} from "react";
import { useHistory } from "react-router-dom";
import swal from "sweetalert";
import FundooNoteServices from "../../service/FundooNoteServices";

const services = new FundooNoteServices();

function Resetpassword(props) {

    const history = useHistory();

    const [resetInput, setPassword] = useState({
        token: '',
        new_password: '',
        confirm_password: '',
        error_list: {
            password: '',
            confirm_password: '',
        },
    });

    // console.log(resetInput.token);
    resetInput.token = props.match.params.id;

    console.log(resetInput.token);

    const handleInput = (event) => {
        // event.persist();
        setPassword({ ...resetInput, [event.target.name]: event.target.value });
    }

    useEffect(() => {
        if (resetInput.new_password !== '')
            validate("new_password");

    })
    useEffect(() => {
        if (resetInput.confirm_password.length > 0)
            validate("confirm_password");

    })

    const validate = (name) => {
        switch (name) {
            case 'new_password':
                const regPass = new RegExp('^(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*#?&])([a-zA-Z0-9@$!%*#?&]){8,}$');

                if (!regPass.test(resetInput.new_password) && (resetInput.new_password !== "")) {
                    resetInput.error_list.password = "Invalid password";
                }
                else {
                    resetInput.error_list.password = "";
                }
                break;
            case 'confirm_password':
                console.log(resetInput.confirm_password);

                if ((resetInput.confirm_password.length > 6)) {
                    resetInput.error_list.confirm_password = "";
                }
                else {
                    resetInput.error_list.confirm_password = "The confirm password must be same as password.";
                }
                break;
          default:
            return false;
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

    const resetSubmit = (event) => {
        event.preventDefault();

        const data = {
            new_password: resetInput.new_password,
            confirm_password: resetInput.confirm_password,
        }

        const config = {
            headers: {"Authorization" : 'Bearer '+resetInput.token},
        }
        
        services.resetPassword(data, config).then(res => { 
            if (res.data.status === 200) {
                swal("Success", res.data.message, "success");
                history.push('/');
            } else if (res.data.status === 400) {
                swal("Warning", res.data.message, "error");
            } else if (res.data.status === 211) {
                swal("Warning", res.data.message, "error");
            } else {
                setPassword({ ...resetInput, error_list: res.data.validation_error })
            }
        });
    }

    return (
        <div className="loginContainer">
            <div className="loginCard">
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
                <h4 className="text-center">Sign in</h4>
                <p className="text-center">Use your Fundoo Account</p>
                <div className="card-body">
                    <form onSubmit={resetSubmit}>
                        <div className="form-group mb-4">
                            <input type="password" name="new_password" id="Show" value={resetInput.new_password} onChange={handleInput} className="form-control" placeholder="New password" />
                            <p id="Message" className="text-danger">{resetInput.error_list.password}</p>
                        </div>
                        <div className="form-group mb-2">
                            <input type="password" name="confirm_password" id="pass" onChange={handleInput} value={resetInput.confirm_password} className="form-control" placeholder="Confirm password" />
                            <p id="pass" className="text-danger">{resetInput.error_list.confirm_password}</p>

                        </div>
                        <input type="checkbox" name="show" onClick={showPassword} />
                        <label className="ml-3">Show password</label>
                        <div className="form-group-mb-3 mt-3">
                        </div>
                        <div className="form-group mt-5">
                            <button type="submit" className="btn btn-primary float-end">Reset</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    );
}

export default Resetpassword;