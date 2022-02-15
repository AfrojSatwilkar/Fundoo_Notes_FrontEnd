import React, { useState } from 'react';
import axios from 'axios';
import DisplayNote from '../../components/displayNote/DisplayNote';
import Form from './Form';

const Notes = () => {

  const [dispNote, setNote] = useState(null);

  const getThenote = () => {
    axios.get(`api/note`).then(res => {
      if (res.data.status === 201) {
        setNote(res.data.Notes);
      } else if (res.data.status === 404) {
        console.log(res.data.status);
      }
    });
  }

  return (
    <>
      <Form getThenote={getThenote} />
      <DisplayNote getThenote={getThenote} dispNote={dispNote} />
    </>
  )
}

export default Notes;