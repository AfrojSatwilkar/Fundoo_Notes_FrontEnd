import React from 'react';
import Labels from '../labels/Labels';


const DisplayLabel = (props) => {

    return (
        <>
            <Labels open={props.openLabel} close={props.setOpenLabel} getLabel={props.getLabel} displayLabel={props.displayLabel} />
        </>
    )
}

export default DisplayLabel;