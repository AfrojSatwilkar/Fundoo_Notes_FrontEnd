import React, { useState, useEffect } from 'react'
import '../displayNote/DisplayNote.css'
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import AddAlertOutlinedIcon from '@mui/icons-material/AddAlertOutlined';
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import ColorLensOutlinedIcon from '@mui/icons-material/ColorLensOutlined';
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import PhotoOutlinedIcon from '@mui/icons-material/PhotoOutlined';
import PushPinIcon from '@mui/icons-material/PushPin';
import { Popover } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';

import Button from '@mui/material/Button';
import axios from 'axios';
import EmptyNote from './EmptyNote';
import Tippy from '@tippyjs/react';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
        width: theme.spacing(80)
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
        width: theme.spacing(100)
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

const DisplayNote = (props) => {
    const [edit, setEdit] = useState(false);
    const [open, setOpen] = useState(false);
    const [task, setTask] = useState({
        id: '',
        title: '',
        description: '',
    })

    let content = null;

    const handleClick = (item) => {
        setEdit(true);
        setTask({
            id: item,
        })
    }

    const handleClose = () => {
        setEdit(false);
    }

    const handleOpenTitle = (item) => {
        setOpen(true);
        setTask({
            id: item.id,
            title: item.title,
            description: item.description,
        })
    }

    const handleTaskClose = () => {
        console.log(task.id);
        const data = {
            id: task.id,
            title: task.title,
            description: task.description,
        }

        axios.post(`/api/updatenote`, data).then(res => {
            if (res.data.status === 200) {
                props.getThenote();
                console.log(res);
                setOpen(false);
            } else {
                setOpen(false);
            }
        });
    }

    const handleDelete = () => {

        console.log(task.id);

        const data = {
            id: task.id,
        }

        axios.post(`/api/trashnote`, data).then(res => {
            if (res.data.status === 200) {
                props.getThenote();
                setEdit(false);
                console.log(res);
            }
        });

    }

    if (props.dispNote) {
        content =
            <div className="disp-container" >
                {
                    props.dispNote.slice(0).reverse().map((item, index) => {
                        return (
                            <div className="display-box" key={item.id}>
                                <div className="descp-title" onClick={() => handleOpenTitle(item)}>
                                    <div className='title'>
                                        {item.title} <PushPinIcon className='pin float-end m-2' style={{ fontSize: 'inherit', color: 'black' }} /><br></br>
                                        {item.description}
                                    </div>
                                </div>

                                <div className="icons-list mt-3">
                                    <Tippy content="Remind me" placement='bottom'>
                                        <AddAlertOutlinedIcon style={{ fontSize: 'inherit' }} />
                                    </Tippy>
                                    <Tippy content="collaborator" placement='bottom'>
                                        <PersonAddAltOutlinedIcon style={{ fontSize: 'inherit' }} />
                                    </Tippy>
                                    <Tippy content="Background options" placement='bottom'>
                                        <ColorLensOutlinedIcon style={{ fontSize: 'inherit' }} />
                                    </Tippy>
                                    <Tippy content="Add image" placement='bottom'>
                                        <PhotoOutlinedIcon style={{ fontSize: 'inherit' }} />
                                    </Tippy>
                                    <Tippy content="Archive" placement='bottom'>
                                        <ArchiveOutlinedIcon style={{ fontSize: 'inherit' }} />
                                    </Tippy>
                                    <Tippy content="More" placement='bottom'>
                                        <MoreVertOutlinedIcon style={{ fontSize: 'inherit', marginRight: '10%' }} onClick={() => handleClick(item.id)} />
                                    </Tippy>
                                    <Popover
                                        edit={edit}
                                        open={Boolean(edit)}
                                        onClose={handleClose}
                                        anchorOrigin={{
                                            vertical: "bottom",
                                            horizontal: "left"
                                        }}
                                    >
                                        <MenuItem onClick={handleDelete}>Delete note</MenuItem>
                                        <MenuItem >Add label</MenuItem>
                                        <MenuItem >Add drawing</MenuItem>
                                        <MenuItem >Make a copy</MenuItem>
                                        <MenuItem >Show tick boxes</MenuItem>
                                    </Popover>

                                </div>
                            </div>
                        )
                    })
                }
            </div >
    } else {
        content = <EmptyNote />
    }

    const fetchTitleDesc = (e) => {
        e.persist();
        setTask({
            ...task,
            [e.target.name]: e.target.value
        })
    }

    useEffect(() => {
        props.getThenote();
    }, []);

    return (

        <div>
            {content}
            <BootstrapDialog aria-labelledby="customized-dialog-title" open={open}>
                <div className="dialog" style={{ width: "100%", overflow: "hidden" }}>
                    <div style={{ backgroundColor: '#ffffff' }} >
                        <BootstrapDialogTitle id="customized-dialog-title" >
                            <div className='hower-title'>
                                <input type="text" value={task.title} name="title" onChange={fetchTitleDesc} style={{ border: "none", outline: "none", backgroundColor: '#ffffff' }} />
                            </div>
                        </BootstrapDialogTitle>
                        <DialogContent>
                            <div className='hower-desp'>
                                <input type="text" style={{ border: "none", outline: "none", backgroundColor: "#ffffff" }} value={task.description} name="description" onChange={fetchTitleDesc} />
                            </div>
                        </DialogContent>

                        <DialogContent className="close-Icons" >

                            <div className="icons-list mt-3">
                                <Tippy content="Remind me" placement='bottom'>
                                    <AddAlertOutlinedIcon style={{ fontSize: 'inherit', marginLeft: '8%' }} />
                                </Tippy>
                                <Tippy content="Collaborator" placement='bottom'>
                                    <PersonAddAltOutlinedIcon style={{ fontSize: 'inherit', marginLeft: '8%' }} />
                                </Tippy>
                                <Tippy content="Background options" placement='bottom'>
                                    <ColorLensOutlinedIcon style={{ fontSize: 'inherit', marginLeft: '8%' }} />
                                </Tippy>
                                <Tippy content="Add image" placement='bottom'>
                                    <PhotoOutlinedIcon style={{ fontSize: 'inherit', marginLeft: '8%' }} />
                                </Tippy>
                                <Tippy content="Archive" placement='bottom'>
                                    <ArchiveOutlinedIcon style={{ fontSize: 'inherit', marginLeft: '8%', marginRight: '8%' }} />
                                </Tippy>
                                <Tippy content="More" placement='bottom'>
                                    <MoreVertOutlinedIcon style={{ fontSize: 'inherit', marginRight: '15%' }} onClick={handleClick} />
                                </Tippy>
                                <Button id="dialog-button" autoFocus onClick={(title, description) => handleTaskClose(title, description)}> Done </Button>
                            </div>

                        </DialogContent>
                    </div>
                </div>

            </BootstrapDialog>

        </div >

    )
}


export default DisplayNote