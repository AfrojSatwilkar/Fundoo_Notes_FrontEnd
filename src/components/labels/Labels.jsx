import React, { useState, useEffect } from "react";
import '../../styles/Labels.scss';
import { styled } from '@mui/material/styles';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import LabelIcon from '@mui/icons-material/Label';
import EditIcon from '@mui/icons-material/Edit';
import axios from "axios";
import DoneIcon from '@mui/icons-material/Done';
import DeleteIcon from '@mui/icons-material/Delete';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import FundooNoteServices from "../../service/FundooNoteServices";

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


const label = {
    labelname: ''
}
const Labels = (props) => {

    let content = null;
    const [addLabel, setLabel] = useState({
        id: '',
        labelname: ''
    });
    const [hover, setHover] = useState(false);
    const [toggleButton, setToggleButton] = useState(true);

    const handleLabel = (event) => {
        event.persist();

        setLabel({ ...addLabel, [event.target.name]: event.target.value });

    }

    const handleClose = () => {
        props.close(false);
    }

    const onClickLabel = () => {
        const data = {
            labelname: addLabel.labelname
        }

        axios.post(`/api/label`, data).then(res => {
            if (res.data.status === 201) {
                console.log(res);
                setLabel(label);
                props.getLabel();
            }
        });
    }

    const inputLabel = (item) => {
        setLabel(item);
        setToggleButton(false);
    }

    const editLabel = () => {
        const data = {
            id: addLabel.id,
            labelname: addLabel.labelname
        }

        services.editLabel(data).then(res => {
            if (res.data.status === 200) {
                console.log(res);
                setLabel(label);
                props.getLabel();
            }
        });
    }

    const deleteLabel = (item) => {
        const data = {
            id: item.id,
        }

        services.deleteLabel(data).then(res => {
            if (res.data.status === 201) {
                console.log(res);
                props.getLabel();
            }
        });
    }

    if (props.displayLabel) {
        content =
            <>
                {
                    props.displayLabel.map((item, index) => {
                        return (

                            <tr key={item.id}
                                onMouseOver={() => setHover(true)}
                                onMouseOut={() => setHover(false)} >
                                {
                                    hover ? <td><DeleteIcon onClick={() => deleteLabel(item)} className="deleteicon" style={{ fontSize: 'inherit', marginRight: '20px' }} /></td> :
                                        <td><LabelIcon className="labelicon" style={{ fontSize: 'inherit', marginRight: '20px' }} /></td>
                                }

                                <td>{item.labelname}</td>
                                <td><EditIcon onClick={() => inputLabel(item)} style={{ fontSize: 'inherit', marginLeft: '150px' }} /></td>
                            </tr>
                        )

                    })
                }
            </>
    } else {
        content = <></>
    }

    useEffect(() => {
        props.getLabel();
    }, []);

    return (
        <BootstrapDialog aria-labelledby="customized-dialog-title" open={props.open}>
            <div className="dialog" style={{ width: "100%", overflow: "hidden" }}>
                <div style={{ backgroundColor: '#ffffff' }} >
                    <BootstrapDialogTitle id="customized-dialog-title" >
                        <h6>Edit labels</h6>

                    </BootstrapDialogTitle>
                    <DialogContent>
                        <div className='hower-title d-flex'>
                            <CloseIcon style={{ fontSize: 'inherit', marginTop: '5px', marginRight: '5px' }} />
                            <input type="text" name="labelname" onChange={handleLabel} value={addLabel.labelname} placeholder="Create new label" />
                            {
                                toggleButton ? <CheckIcon style={{ fontSize: 'inherit', marginTop: '5px', marginLeft: '20px' }} onClick={onClickLabel} /> :
                                    <DoneIcon style={{ fontSize: 'inherit', marginTop: '5px', marginLeft: '20px' }} onClick={editLabel} />
                            }
                        </div>
                        <hr />
                        {content}
                        <div >
                            <hr />
                            <Link style={{ textDecoration: 'none', display: 'flex', color: 'inherit', marginLeft: '80%' }} onClick={handleClose}>Close</Link>

                        </div>
                    </DialogContent>
                </div>
            </div>

        </BootstrapDialog>
    )
}

export default Labels;