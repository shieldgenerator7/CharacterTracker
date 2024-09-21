"use strict";

function Field({ name, value, setValue, className }) {
    return (
        <span className="field">
            <label>{name}</label>
            <input type="text" className={className}
                onChange={(e) => {
                    let v = e.target.value;
                    setValue(v);
                }}
                value={value}
            ></input>
        </span>
    );
}
export default Field;