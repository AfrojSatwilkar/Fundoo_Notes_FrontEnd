import React, { useState, useEffect } from "react";
import { MenuItem } from "@mui/material";
import FundooNoteServices from "../../service/FundooNoteServices";
import { Popover } from "@material-ui/core";

const services = new FundooNoteServices();

const MenuItems = (props) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const [displayLabel, setDisplayLabel] = useState(null);
    const [checked, setChecked] = useState(true);
    let labels = null;

    const handleNoteLabel = (item) => {
        const data = {
            label_id: item.id,
            note_id: props.item.id
        }

        services.addNoteLabel(data).then(res => {
            if (res.data.status === 201) {
                props.getThenote();
                // setChecked(false);
                console.log(res);
            }
        })
    }

    const handleDeleteNoteLabel = (item) => {
        const data = {
            label_id: item.id,
            note_id: props.item.id
        }

        services.deleteNoteLabel(data).then(res => {
            if (res.data.status === 201) {
                props.getThenote();
                console.log(res);
            }
        })
    }

    const handleDelete = () => {

        if (props.item.Collaborator === localStorage.getItem('email')) {
            console.log(props.item.id);

            const data = {
                note_id: props.item.id,
                email: props.item.Collaborator
            }

            services.removeColabNote(data).then(res => {
                if (res.data.status === 201) {
                    props.getThenote();
                    props.setAnchorEl(false);
                    console.log(res);
                }
            });
        } else {
            console.log(props.item.id);

            const data = {
                id: props.item.id,
            }

            services.trashNote(data).then(res => {
                if (res.data.status === 200) {
                    props.getThenote();
                    props.setAnchorEl(false);
                    console.log(res);
                }
            });
        }
    }

    if (displayLabel) {
        labels =
            <>
                {
                    displayLabel.map((item, index) => {
                        if (props.item.labelname === item.labelname) {
                            return (
                                <div style={{ display: 'flex', alignItems: 'center', marginLeft: '5px', padding: 0 }}>
                                    <input type="checkbox" defaultChecked={checked} onChange={() => handleDeleteNoteLabel(item)} />
                                    <MenuItem >{item.labelname}</MenuItem>
                                </div>
                            )
                        } else {
                            return (
                                <div style={{ display: 'flex', alignItems: 'center', marginLeft: '5px', padding: 0 }}>
                                    <input type="checkbox" defaultChecked={() => setChecked(false)} onChange={() => handleNoteLabel(item)} />
                                    <MenuItem >{item.labelname}</MenuItem>
                                </div>
                            )
                        }
                    })
                }
            </>
    } else {
        labels =
            <></>
    }

    const getLabel = () => {
        services.getLabel().then(res => {
            if (res.data.status === 201) {
                setDisplayLabel(res.data.Label);
            }
        });
    }

    useEffect(() => {
        getLabel();
    }, []);

    return (
        <>
            <MenuItem onClick={handleDelete}>Delete note</MenuItem>
            <MenuItem onClick={(event) => { setAnchorEl(event.currentTarget) }}>Add label</MenuItem>
            <Popover
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                id={open ? "simple-popover" : undefined}
                onClose={() => {
                    setAnchorEl(null);
                }}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left"
                }}

            >
                <h6>Label note</h6>
                {labels}
            </Popover>
        </>
    )
}

export default MenuItems;