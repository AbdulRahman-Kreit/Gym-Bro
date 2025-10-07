import React from 'react'

export default function Button(props) {
    const { text, func } = props;

    return (
        <button onClick={func}
        className="px-8 py-4 mx-auto mb-8 rounded-md bg-slate-950
            border-[2px] border-solid border-blue-400
            blueShadow blueShadow:hover duration-200">
                <p>{text}</p>
            </button>
    )
}
