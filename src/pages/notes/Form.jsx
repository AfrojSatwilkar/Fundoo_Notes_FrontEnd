import { useState, useRef } from 'react';

import { Box, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import AddAlertOutlinedIcon from '@mui/icons-material/AddAlertOutlined';
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import ColorLensOutlinedIcon from '@mui/icons-material/ColorLensOutlined';
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import PhotoOutlinedIcon from '@mui/icons-material/PhotoOutlined';
import './Form';
import axios from 'axios';
import { Link } from 'react-router-dom';

const note = {
    title: '',
    description: ''
}

const Container = styled(Box)`
    display: flex;
    flex-direction: column;
    margin: auto;
    box-shadow: 0 1px 2px 0 rgb(60 64 67 / 30%), 0 2px 6px 2px rgb(60 64 67 / 15%);
    border-color: #e0e0e0;
    width: 45%;
    border-radius: 8px;
    min-height: 30px;
    padding: 10px 15px;
`

const Form = (props) => {

    const [showTextField, setShowTextField] = useState(false);
    const [addNote, setAddNote] = useState({
        title: '',
        description: ''
    });


    const containerRef = useRef();

    const handleClickAway = () => {
        setShowTextField(false);
        containerRef.current.style.minheight = '30px'
        const data = {
            title: addNote.title,
            description: addNote.description,
        }

        axios.post(`/api/note`, data).then(res => {
            if (res.data.status === 201) {
                console.log(res.data.message);
                props.getThenote();
            }
        });
        setAddNote(note);
    }

    const onTextAreaClick = () => {
        setShowTextField(true);
        containerRef.current.style.minheight = '70px'
    }

    const onTextChange = (e) => {
        e.persist();
        setAddNote({ ...addNote, [e.target.name]: e.target.value });
    }

    return (
        // <ClickAwayListener onClickAway={handleClickAway}>
            <Container ref={containerRef}>
                {showTextField &&
                    <TextField
                        placeholder="Title"
                        variant="standard"
                        InputProps={{ disableUnderline: true }}
                        style={{ marginBottom: 10 }}
                        onChange={(e) => onTextChange(e)}
                        name='title'
                        value={addNote.title}
                    />
                }
                <TextField
                    placeholder="Take a note..."
                    multiline
                    maxRows={Infinity}
                    variant="standard"
                    InputProps={{ disableUnderline: true }}
                    onClick={onTextAreaClick}
                    onChange={(e) => onTextChange(e)}
                    name='description'
                    value={addNote.description}
                />
                {
                    showTextField &&
                    // <div className='Icons'>
                        <div className='Icons d-flex mt-5'>
                            <AddAlertOutlinedIcon style={{fontSize: 'inherit', marginRight: '7%'}}/>
                            <PersonAddAltOutlinedIcon style={{fontSize: 'inherit', marginRight: '7%'}}/>
                            <ColorLensOutlinedIcon style={{fontSize: 'inherit', marginRight: '7%'}}/>
                            <PhotoOutlinedIcon style={{fontSize: 'inherit', marginRight: '7%'}}/>
                            <ArchiveOutlinedIcon style={{fontSize: 'inherit', marginRight: '7%'}}/>
                            <MoreVertOutlinedIcon style={{fontSize: 'inherit', marginRight: '30%'}}/>
                            <Link style={{textDecoration: 'none', display: 'flex', color: 'inherit'}} onClick={handleClickAway}>Close</Link>
                        </div>
                    // </div>
                }
            </Container>
        // </ClickAwayListener >
    )
}

export default Form;