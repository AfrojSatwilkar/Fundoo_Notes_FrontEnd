import React, {useState} from "react";

function Sample() {
    const [gender, setGender] = useState('male');

    const changeState = () => {
        setGender('female');
    }
    return (
        <div>
            <p>{gender}</p>
            <button className="btn" onClick={changeState}>Change</button>
        </div>
    )
}

export default Sample;