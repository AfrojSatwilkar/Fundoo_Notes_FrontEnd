import React, { useState, useEffect } from 'react'
import '../../styles/DisplayNote.scss'
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import PushPinIcon from '@mui/icons-material/PushPin';

import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import EmptyNote from './EmptyNote';
import Icons from '../icons/Icons';
import FundooNoteServices from '../../service/FundooNoteServices';
import Tippy from '@tippyjs/react';
import { Link } from 'react-router-dom';

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
    const [anchorEl, setAnchorEl] = useState(null);
    const [open, setOpen] = useState(false);
    const [task, setTask] = useState({
        id: '',
        title: '',
        description: '',
        Collaborator: '',
    })

    const [openColab, setOpenColab] = useState(false);


    let content = null;

    const handleColab = () => {
        setOpenColab(true);
    }

    const deleteReminder = (item) => {
        console.log(item.id);
        const data = {
            id: item.id
        }

        services.deleteReminder(data).then(res => {
            if (res.data.status === 200) {
                props.getThenote();
                console.log(res);
            }
        })
    }

    const handleOpenTitle = (item) => {
        setOpen(true);
        setTask({
            id: item.id,
            title: item.title,
            description: item.description,
            Collaborator: item.Collaborator,
        })
    }

    const handleTaskClose = () => {
        console.log(task.Collaborator);
        console.log(localStorage.getItem('email'))
        if (task.Collaborator === localStorage.getItem('email')) {
            const data = {
                note_id: task.id,
                title: task.title,
                description: task.description,
            }

            services.editColabNote(data).then(res => {
                if (res.data.status === 201) {
                    props.getThenote();
                    console.log(res);
                    setOpen(false);
                } else {
                    console.log(res);
                    setOpen(false);
                }
            });
           
        } else {
            const data = {
                id: task.id,
                title: task.title,
                description: task.description,
            }

            services.editNote(data).then(res => {
                if (res.data.status === 200) {
                    props.getThenote();
                    console.log(res);
                    setOpen(false);
                } else {
                    setOpen(false);
                }
            });
        }

    }

    if (props.dispNote) {
        content =
            <div className="disp-container" >
                {
                    props.dispNote.slice(0).reverse().map((item, index) => {
                        return (
                            <div className="display-box" key={item.id}>
                                <div className="descp-title">
                                    <div className='title'  onClick={() => handleOpenTitle(item)}>
                                        {item.title} <PushPinIcon className='pin float-end m-2' style={{ fontSize: 'inherit', color: 'black' }} /><br></br>
                                        {item.description}<br></br>
                                    </div>
                                    <div style={{display: 'flex', alignItem: 'center', marginTop: '10px'}}>
                                        {
                                            item.labelname ? <p className='labelname' style={{fontSize: 'small', background: '#D6D6D6', width: 'auto', borderRadius: '20px', alignItems: 'center'}}>{item.labelname}<Link className="deleteicon" style={{ fontSize: 'inherit', marginLeft: '5px', marginBottom: '4px', textDecoration: 'none', color: 'inherit' }}>X</Link></p> :
                                            <></>
                                        }
                                        {
                                            item.reminder ? <p className='reminder' style={{fontSize: 'small', marginLeft: '5px', background: '#D6D6D6', width: '90px', borderRadius: '20px', alignItems: 'center'}}>{item.reminder}<Link onClick={() => deleteReminder(item)} className="deleteicon" style={{ fontSize: 'inherit', marginLeft: '5px', marginBottom: '4px', textDecoration: 'none', color: 'inherit' }}>X</Link></p> :
                                            <></>
                                        }
                                        
                                        
                                    <Tippy content={item.Collaborator} placement="bottom">
                                        {
                                            item.Collaborator ? <button onClick={handleColab} style={{ display: 'flex', alignItems: 'center', background: 'red', color: 'white', marginLeft: '5px', height: '25px', width: '25px', borderRadius: '50%' }} class>{item.Collaborator.charAt(0)}</button> :
                                            <></>
                                        }
                                        
                                    </Tippy>
                                    </div>
                                </div>
                                <div style={{ alignSelf: 'flex-end'}}>
                                <Icons mode="update" item={item} setTask={setTask}
                                    task={task} getThenote={props.getThenote}
                                    openColab={openColab} setOpenColab={setOpenColab}
                                    anchorEl={anchorEl} setAnchorEl={setAnchorEl}
                                />
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
                            <Icons mode="update" item={task} setTask={setTask}
                                task={task} getThenote={props.getThenote}
                            />
                            <Link style={{ textDecoration: 'none', display: 'flex', color: 'inherit', marginLeft: '80%' }} id="dialog-button" onClick={(title, description) => handleTaskClose(title, description)}> Done </Link>

                        </DialogContent>
                    </div>
                </div>

            </BootstrapDialog>

        </div >

    )
}


export default DisplayNote