import React, { useState } from 'react';
import DisplayNote from '../../components/displayNote/DisplayNote';
import FundooNoteServices from '../../service/FundooNoteServices';

const services = new FundooNoteServices();

const Notes = () => {

  const [dispNote, setNote] = useState(null);

  const getThenote = () => {
    services.displayReminder().then(res => {
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
      <DisplayNote getThenote={getThenote} dispNote={dispNote} />
    </>
  )
}

export default Notes;