import React, { useState } from 'react';
import DisplayNote from '../../components/displayNote/DisplayNote';
import Form from './Form';
import FundooNoteServices from '../../service/FundooNoteServices';

const services = new FundooNoteServices();

const Notes = () => {

  const [dispNote, setNote] = useState(null);

  const getThenote = () => {
    services.displayNote().then(res => {
      if (res.data.status === 201) {
        console.log(res);
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