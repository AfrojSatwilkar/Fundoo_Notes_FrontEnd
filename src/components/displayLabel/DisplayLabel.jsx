import React, { useState } from 'react';
import axios from 'axios';
import Labels from '../labels/Labels';

const DisplayLabel = (props) => {

    const [displayLabel, setDisplayLabel] = useState(null);

    const getLabel = () => {
        axios.get(`api/label`).then(res => {
            if (res.data.status === 201) {
                setDisplayLabel(res.data.Label);
            }
        });
    }

    return (
        <>
            <Labels open={props.openLabel} close={props.setOpenLabel} getLabel={getLabel} displayLabel={displayLabel} />
        </>
    )
}

export default DisplayLabel;