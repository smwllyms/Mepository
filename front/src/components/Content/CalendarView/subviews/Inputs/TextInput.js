
import React from "react"

import "./TextInput.css"

export default function TextInput(props)
{

    const tRef = React.useRef();
    const bRef = React.useRef();

    function onSubmit()
    {
        const date = new Date();
        const text = tRef.current.value;

        const data = {
            date: date,
            message: text
        }

        tRef.current.value = "";

        props.onSubmit(data);
    }

    return (
        <div className="text-input">
            <textarea 
                placeholder={(props.placeholder || "Enter Text")}
                ref={tRef}/>
            <button
                ref={bRef}
                onClick={onSubmit}>Submit</button>
        </div>
    );
}