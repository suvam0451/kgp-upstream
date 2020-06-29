import React from 'react';

export default function Yeeto() {
    const inputEl = React.useRef<HTMLInputElement>(null);

    const onButtonClick = () => {
        if (inputEl && inputEl.current) {
            inputEl.current.focus();
        }
    };
    return (
        <div>
            <input ref={inputEl} type="text" />
            <button onClick={onButtonClick}>
                Focus the input
                </button></div>);
}