import React, { useState } from 'react'
import '../icons/Icons.css'

import AddAlertOutlinedIcon from '@mui/icons-material/AddAlertOutlined';
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import ColorLensOutlinedIcon from '@mui/icons-material/ColorLensOutlined';
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import PhotoOutlinedIcon from '@mui/icons-material/PhotoOutlined';

//poper
import MenuItem from '@material-ui/core/MenuItem';
import { Popover } from '@material-ui/core';
import axios from 'axios';

//  const service = new UserService();

const Icons = (props) => {

    const [state, setstate] = useState(false);

    // constructor(props) {
    //     super(props);

    //     this.state = {
    //         // popover
    //         anchorEl: false,

    //     }
    // }

    //popover
    const handleClick = () => { 
        setstate(true);
    }
    const handleClose = () => {
         setstate(false);
    }

    const handleDelete = () => {
        // delete-data
        const data = {
            id: {props.id},
        }
        axios.post(`/api/deletenote`, data).then(res => {
            if (res.data.status === 200) {
                props.getThenote();
            }
        });
    }


    // render() {
    //     //popover
    //     const { anchorEl } = this.state

        return (
            <div className='icons-list'>
                <AddAlertOutlinedIcon />
                <PersonAddAltOutlinedIcon />
                <ColorLensOutlinedIcon />
                <PhotoOutlinedIcon />
                <div>
                    <ArchiveOutlinedIcon />
                </div>
                <div>
                    <MoreVertOutlinedIcon onClick={handleClick} />
                    <Popover
                        id="simple-menu"
                        anchorEl={state}
                        keepMounted
                        open={Boolean(state)}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "left"
                        }}
                    >
                        <MenuItem onClick={(e) => handleDelete(e)}>Delete note</MenuItem>
                        <MenuItem onClick={this.handleClose}>Add label</MenuItem>
                        <MenuItem onClick={this.handleClose}>Add drawing</MenuItem>
                        <MenuItem onClick={this.handleClose}>Make a copy</MenuItem>
                        <MenuItem onClick={this.handleClose}>Show tick boxes</MenuItem>
                    </Popover>
                </div>
            </div>
        )
    }
// }


export default Icons