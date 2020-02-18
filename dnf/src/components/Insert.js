import React, { useState, useEffect } from 'react';
import "./Insert.scss"

const Insert = ({onInsert}) => {
    const [value, setValue] = useState('');

    const onChange = (e) => {
        setValue(e.target.value);
    }

    const onSubmit = (e) => {
        if (value === '') {
            e.preventDefault();
        }
        else {
            onInsert(value);
            setValue('');
            e.preventDefault();
        }
    }

    return (
        <div>
            <form className="Insert" onSubmit={onSubmit}>
                <input className="input"
                    placeholder="아이템 이름을 입력하세요"
                    value={value}
                    onChange={onChange}
                ></input>
                <button className="button" type="submit">입력</button>
            </form>
        </div>
    );
};

export default Insert;