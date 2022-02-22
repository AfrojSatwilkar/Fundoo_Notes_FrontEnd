import React, { useState } from 'react'
import '../../styles/Icons.scss'

import AddAlertOutlinedIcon from '@mui/icons-material/AddAlertOutlined';
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import ColorLensOutlinedIcon from '@mui/icons-material/ColorLensOutlined';
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import PhotoOutlinedIcon from '@mui/icons-material/PhotoOutlined';

//poper
import MenuItem from '@material-ui/core/MenuItem';
import { Popover } from '@material-ui/core';
import Tippy from '@tippyjs/react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import FundooNoteServices from '../../service/FundooNoteServices';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import MenuItems from '../menuItem/MenuItems';
import { DateTimePickerComponent } from '@syncfusion/ej2-react-calendars';
import Moment from 'moment';

const services = new FundooNoteServices();

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
        width: theme.spacing(35)
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
        width: theme.spacing(10)
    },
}));

const BootstrapDialogTitle = (props) => {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 2,
                        top: 2,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                </IconButton>
            ) : null}
        </DialogTitle>
    );
};

BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
};

const colabData = {
    note_id: '',
    email: ''
}
const Icons = (props) => {
    const minDate = new Date();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const [anchorEll, setAnchorEll] = useState(null);
    const openL = Boolean(anchorEll);
    const [addReminder, setAddReminder] = useState(new Date());
    const [addColab, setAddColab] = useState({
        note_id: '',
        email: ''
    })

    let colab = null;

    const handleCollaborator = () => {
        props.setOpenColab(true);
    }

    const closeColab = () => {
        props.setOpenColab(false);
    }

    const handleColab = (event) => {
        event.persist();

        setAddColab({ ...addColab, [event.target.name]: event.target.value });
    }

    const onClickColab = () => {
        console.log(props.item.id);

        const data = {
            note_id: props.item.id,
            email: addColab.email
        }

        services.addColab(data).then(res => {
            if (res.data.status === 201) {
                console.log(res);
                props.getThenote();
                setAddColab(colabData);
                props.setOpenColab(false);
            } else {
                console.log(res);
            }
        });
    }

    const saveReminder = () => {
        console.log(props.item);
        if(props.item.reminder === null) {
            const data = {
                id: props.item.id,
                reminder: Moment(addReminder).format("YYYY-MM-DD HH:mm:ss")
            }
            console.log(data.reminder);
    
            services.addReminder(data).then(res => {
                if (res.data.status === 200) {
                    console.log(res);
                    props.getThenote();
                    setAnchorEll(false);
                }
            });
        } else {
            const data = {
                id: props.item.id,
                reminder: Moment(addReminder).format("YYYY-MM-DD HH:mm:ss")
            }

            services.editReminder(data).then(res => {
                if (res.data.status === 200) {
                    console.log(res);
                    props.getThenote();
                    setAnchorEll(false);
                }
            });
        }
       
    }

    if (props.item.Collaborator === '') {
        colab =
            <></>

    } else {
        colab =
            <div className='hower-title d-flex mb-2'>
                {/* <button className="btn btn-danger rounded-circle">{props.item.Collaborator}</button> */}
                <div>
                    <p style={{ marginLeft: '10px', fontSize: 'small', marginBottom: 0 }}>{props.item.Collaborator}</p>
                </div>
            </div>
    }

    return (
        <div className="icons-list">
            <Tippy content="Remind me" placement='bottom'>
                <AddAlertOutlinedIcon style={{ fontSize: 'inherit', marginLeft: '3%' }} onClick={(event) => { setAnchorEll(event.currentTarget) }} />
            </Tippy>
            <Popover
                anchorEl={anchorEll}
                open={openL}
                id={open ? "simple-popover" : undefined}
                onClose={() => {
                    setAnchorEll(null);
                }}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left"
                }}
            >
                <div className='reminder-box'>
                    <h6>Remainder:</h6>
                    <DateTimePickerComponent value={addReminder} min={minDate} onChange={(event) => { setAddReminder(event.target.value) }}>
                    </DateTimePickerComponent>
                </div>
                <div className='reminder-save'>
                    <button className="btn btn-primary" onClick={saveReminder}>Save</button>
                </div>

            </Popover>
            <Tippy content="collaborator" placement='bottom'>
                <PersonAddAltOutlinedIcon style={{ fontSize: 'inherit', marginLeft: '8%' }} onClick={handleCollaborator} />
            </Tippy>
            <Tippy content="Background options" placement='bottom'>
                <ColorLensOutlinedIcon style={{ fontSize: 'inherit', marginLeft: '8%' }} />
            </Tippy>
            <Tippy content="Add image" placement='bottom'>
                <PhotoOutlinedIcon style={{ fontSize: 'inherit', marginLeft: '8%' }} />
            </Tippy>
            <Tippy content="Archive" placement='bottom'>
                <ArchiveOutlinedIcon style={{ fontSize: 'inherit', marginLeft: '8%' }} />
            </Tippy>
            <Tippy content="More" placement='bottom'>
                <MoreVertOutlinedIcon style={{ fontSize: 'inherit', marginLeft: '8%' }} onClick={(event) => { setAnchorEl(event.currentTarget) }} />
            </Tippy>
            <Popover
                anchorEl={anchorEl}
                open={open}
                id={open ? "simple-popover" : undefined}
                onClose={() => {
                    setAnchorEl(null);
                }}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left"
                }}
            >
                <MenuItems item={props.item}
                    getThenote={props.getThenote}
                    setAnchorEl={setAnchorEl} />
            </Popover>

            <BootstrapDialog aria-labelledby="customized-dialog-title" open={props.openColab}>
                <div className="dialog" style={{ width: "100%", overflow: "hidden" }}>
                    <div style={{ backgroundColor: '#ffffff' }} >
                        <BootstrapDialogTitle id="customized-dialog-title" >
                            <h6>Collaborator</h6>
                        </BootstrapDialogTitle>
                        <DialogContent>
                            <hr />
                            <div className='hower-title d-flex mb-2'>
                                <button className="btn btn-danger rounded-circle">{localStorage.getItem("firstName").charAt(0)}</button>
                                <div>
                                    <p style={{ marginLeft: '10px', fontSize: 'small', marginBottom: 0 }}>{localStorage.getItem('firstName')}{' '}{localStorage.getItem('lastName')}<i>(Owner)</i></p>
                                    <p style={{ marginLeft: '10px', fontSize: 'small', marginBottom: 0 }}>{localStorage.getItem('email')}</p>
                                </div>
                            </div>
                            {colab}
                            <div>
                                <div className='btn btn-light rounded-circle border-dark justify-content-center'>
                                    <PersonAddAltIcon style={{ fontSize: 'inherit', justifyContent: 'center' }} />
                                </div>
                                <input type="text" name='email' onChange={handleColab} value={addColab.email} placeholder='person or email to share with' style={{ marginLeft: '5px' }}></input>
                            </div>
                            <div >
                                <hr />
                                <div style={{ display: 'flex' }}>
                                    <Link onClick={closeColab} style={{ textDecoration: 'none', display: 'flex', color: 'inherit', marginLeft: '60%' }}>Close</Link>
                                    <Link onClick={onClickColab} style={{ textDecoration: 'none', display: 'flex', color: 'inherit', marginLeft: '10%' }}>Save</Link>
                                </div>

                            </div>
                        </DialogContent>
                    </div>
                </div>
            </BootstrapDialog>
        </div>
    )
}

export default Icons