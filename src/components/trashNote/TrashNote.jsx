import React, { useState } from 'react';
import axios from 'axios';
import DisplayTrashNote from '../../components/dispplayTrashNote/DisplayTrashNote';

const TrashNote = () => {

  const [dispTrashNote, setTrashNote] = useState(null);

  const getTrashNote = () => {
    axios.get(`api/gettrashnote`).then(res => {
      if (res.data.status === 201) {
        setTrashNote(res.data.Notes);
      } else if (res.data.status === 404) {
        console.log(res.data.status);
      }
    });
  }

  return (
    <>
      <DisplayTrashNote getTrashNote={getTrashNote} dispTrashNote={dispTrashNote} />
    </>
  )
}

export default TrashNote;