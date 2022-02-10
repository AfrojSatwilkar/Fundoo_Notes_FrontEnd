import axios from "axios";
import React from "react";
import { Link, useHistory } from "react-router-dom";
import swal from "sweetalert";

function Navbar() {

    const history = useHistory();

    const logoutSubmit = (event) => {
        event.preventDefault();

        axios.post(`/api/logout`).then(res => {
            if (res.data.status === 200) {
                localStorage.removeItem('auth_token');
                localStorage.removeItem('username');
                swal("Success", res.data.message, "success");
                history.push('/');
            }
        });    
    }
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-primary shadow sticky-top">
            <div className="container-xxl">
                <div className="collapse navbar-collapse" id="navbarSupportedcontent">
                    <ul className="navbar-nav">
                        <li className="nav-item active">
                            <Link className="nav-link" to="#">Home</Link>
                        </li>
                    </ul>
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <button type="button" onClick={logoutSubmit} className="nav-link btn btn-danger btn-sm">Logout</button>
                        </li>
                    </ul>
                </div>
            </div>

        </nav>
    )
}

export default Navbar;