import React, { useState, useEffect } from 'react'
import '../../styles/DisplayNote.scss';

import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import RestoreFromTrashIcon from '@mui/icons-material/RestoreFromTrash';

import EmptyNote from '../displayNote/EmptyNote';
import Tippy from '@tippyjs/react';
import FundooNoteServices from '../../service/FundooNoteServices';

const services = new FundooNoteServices();

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
                    {/* <CloseIcon /> */}
                </IconButton>
            ) : null}
        </DialogTitle>
    );
};

BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
};

const DisplayTrashNote = (props) => {
    
    const [open, setOpen] = useState(false);
    const [task, setTask] = useState({
        id: '',
        title: '',
        description: '',
    })

    let content = null;


    const handleOpenTitle = (item) => {
        setOpen(true);
        setTask({
            id: item.id,
            title: item.title,
            description: item.description,
        })
    }

    const handleDelete = (item) => {

        console.log(item);

        const data = {
            id: item,
        }

        // axios.post(`/api/deletenote`, data).then(res => {
        services.deleteNote(data).then(res => {
            if (res.data.status === 200) {
                props.getTrashNote();
                setOpen(false);
                console.log(res);
            }
        });
    }

    const handleUntrash = (item) => {

        console.log(item);

        const data = {
            id: item,
        }

        services.untrashNote(data).then(res => {
            if (res.data.status === 200) {
                props.getTrashNote();
                setOpen(false);
                console.log(res);
            }
        });
    }

    if (props.dispTrashNote) {
        content =
            <div className="disp-container" >
                {
                    props.dispTrashNote.slice(0).reverse().map((item, index) => {
                        return (
                            <div className="display-box" key={item.id}>
                                <div className="descp-title" onClick={() => handleOpenTitle(item)}>
                                    <div className='title'>
                                        {item.title} <br></br>
                                        {item.description}
                                    </div>
                                </div>

                                <div className="Icon mt-3">
                                    <Tippy content="Delete forever" placement='bottom'>
                                        <DeleteForeverIcon style={{ fontSize: 'inherit', marginLeft: '10%' }} onClick={() => handleDelete(item.id)} />
                                    </Tippy>
                                    <Tippy content="Restore" placement='bottom'>
                                        <RestoreFromTrashIcon style={{ fontSize: 'inherit', marginLeft: '5%' }} onClick={() => handleUntrash(item.id)} />
                                    </Tippy>
                                </div>
                            </div>
                        )
                    })
                }
            </div >
    } else {
        content = <EmptyNote />
    }

    useEffect(() => {
        props.getTrashNote();
    }, []);

    return (

        <div>
            {content}
            <BootstrapDialog aria-labelledby="customized-dialog-title" open={open}>
                <div className="dialog" style={{ width: "100%", overflow: "hidden" }}>
                    <div style={{ backgroundColor: '#ffffff' }} >
                        <BootstrapDialogTitle id="customized-dialog-title" >
                            <div className='hower-title'>
                                <input type="text" value={task.title} name="title" style={{ border: "none", outline: "none", backgroundColor: '#ffffff' }} />
                            </div>
                        </BootstrapDialogTitle>
                        <DialogContent>
                            <div className='hower-desp'>
                                <input type="text" value={task.description} name="description" style={{ border: "none", outline: "none", backgroundColor: "#ffffff" }} />
                            </div>
                        </DialogContent>

                        <DialogContent className="close-Icons" >
                            <div className="icons-list mt-3">
                                <Tippy content="Delete forever" placement='bottom'>
                                    <DeleteForeverIcon style={{ fontSize: 'inherit', marginLeft: '4%' }} onClick={() => handleDelete(task.id)} />
                                </Tippy>
                                <Tippy content="Restore" placement='bottom'>
                                    <RestoreFromTrashIcon style={{ fontSize: 'inherit', marginLeft: '8%' }} onClick={() => handleUntrash(task.id)} />
                                </Tippy>
                            </div>
                        </DialogContent>
                    </div>
                </div>

            </BootstrapDialog>

        </div >

    )
}


export default DisplayTrashNote