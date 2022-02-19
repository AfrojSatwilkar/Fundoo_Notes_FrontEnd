import * as React from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Popover from "@mui/material/Popover";
import PopupState, { bindTrigger, bindPopover } from "material-ui-popup-state";
import '../../styles/Profile.scss'
import swal from "sweetalert";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Tippy from '@tippyjs/react';
import FundooNoteServices from "../../service/FundooNoteServices";

const services = new FundooNoteServices();

export default function PopoverPopupState() {

    const history = useHistory();

    const signout = (event) => {
        event.preventDefault();
        services.logout().then(res => {
            if (res.data.status === 200) {
                localStorage.removeItem('auth_token');
                localStorage.removeItem('lastName');
                localStorage.removeItem('firstName');
                localStorage.removeItem('email');
                swal("Success", res.data.message, "success");
                history.push('/login');
            } else if (res.data.status === 404) {
                swal("warning", res.data.message, "warning");
            }
        });
    }
    return (
        <PopupState variant="popover" popupId="demo-popup-popover">
            {(popupState) => (
                <div>
                    <Button {...bindTrigger(popupState)}>
                        <Tippy content="Profile">
                            <button className="btn btn-danger rounded-circle">{localStorage.getItem("firstName").charAt(0)}</button>
                        </Tippy>
                    </Button>
                    <Popover
                        {...bindPopover(popupState)}
                        anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "center"
                        }}
                        transformOrigin={{
                            vertical: "top",
                            horizontal: "center"
                        }}
                    >
                        <Typography sx={{ p: 2 }}>
                            <div >

                                <div className="profile-container">
                                    <div className="profile">
                                        <button className="btn btn-danger btn-lg rounded-circle mb-3">{localStorage.getItem("firstName").charAt(0)}</button>
                                    </div>
                                    <p> {localStorage.getItem("firstName")}{' '} {localStorage.getItem("lastName")}</p>
                                    <p> {localStorage.getItem("email")}</p>
                                    <div className="profile-button">
                                        <button className="rounded" onClick={signout}>signout</button>
                                    </div>
                                </div>
                            </div>
                        </Typography>
                    </Popover>
                </div>
            )}
        </PopupState>
    );
}