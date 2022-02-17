import React, { useState, useEffect } from "react";
import './Labels.css';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import LabelIcon from '@mui/icons-material/Label';
import EditIcon from '@mui/icons-material/Edit';
import axios from "axios";
import DoneIcon from '@mui/icons-material/Done';
import DeleteIcon from '@mui/icons-material/Delete';


const label = {
    labelname: ''
}
const Labels = (props) => {

    let content = null;
    const [addLabel, setLabel] = useState({
        id: '',
        labelname: ''
    });
    const [hover,setHover]=useState(false);
    const [toggleButton, setToggleButton] = useState(true);

    const handleLabel = (event) => {
        event.persist();

        setLabel({ ...addLabel, [event.target.name]: event.target.value });

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

        axios.post(`/api/updatelabel`, data).then(res => {
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

        axios.post(`/api/deletelabel`, data).then(res => {
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
                            <td><EditIcon onClick={() => inputLabel(item)} style={{ fontSize: 'inherit', marginLeft: '150px' }}/></td>
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
        <div className="popup">
            <div className="popup-content">
                <h6>Edit labels</h6>
                <div className="addLabel d-flex" style={{ fontSize: 'inherit' }}>
                    <CloseIcon style={{ fontSize: 'inherit', marginTop: '5px', marginRight: '5px' }} />
                    <input type="text" name="labelname" onChange={handleLabel} value={addLabel.labelname} placeholder="Create new label" />
                    {
                        toggleButton ? <CheckIcon style={{ fontSize: 'inherit', marginTop: '5px', marginLeft: '20px' }} onClick={onClickLabel} /> :
                        <DoneIcon style={{ fontSize: 'inherit', marginTop: '5px', marginLeft: '20px' }} onClick={editLabel} />
                    }
                    
                </div>
                <hr />
                {content}
                {/* {
                        props.displayLabel.map((item, index) => {
                            return (
                                <tr key={item.id}>
                                    <td><LabelIcon style={{ fontSize: 'inherit', marginRight: '20px' }} /></td>
                                    <td>{item.labelname}</td>
                                    <td><EditIcon style={{ fontSize: 'inherit', marginLeft: '150px' }} /></td>
                                </tr>
                            )

                        })
                    } */}
            </div>
        </div>
    )
}

export default Labels;