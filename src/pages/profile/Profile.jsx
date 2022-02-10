import * as React from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Popover from "@mui/material/Popover";
import PopupState, { bindTrigger, bindPopover } from "material-ui-popup-state";
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import './Profile.css'
import axios from "axios";
import swal from "sweetalert";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

export default function PopoverPopupState() {

    const history = useHistory();

    const signout = (event) => {
        event.preventDefault();
        axios.post(`/api/forgotpassword`).then(res => {
            if (res.data.status === 200) {
                localStorage.removeItem('auth_token');
                swal("Success", res.data.message, "success");
                history.push('/');
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
                        <AccountCircleOutlinedIcon />
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
                                    <p> {localStorage.getItem("firstName")}{' '} {localStorage.getItem("lastName")}</p>
                                    <p> {localStorage.getItem("email")}</p>
                                    <div className="profile-button">
                                        <button onClick={signout}>signout</button>
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