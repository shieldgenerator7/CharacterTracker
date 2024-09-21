"use strict";

import { useState } from "react";

function SearchSelect({ options, option, setOption }) {
    let searchStr = "";
    let setSearchStr = (str) => searchStr = str;
    [searchStr, setSearchStr] = useState();

    return (
        <select value={option}
            onChange={(e) => {
                let option = e.target.value;
                setOption(option);
            }}
        >
            {options
                .filter(o => !searchStr || o.includes(searchStr))
                .map((o,i) => {
                    return (
                        <option value={o} key={i}>{o}</option>
                    );
                })
            }
        </select>
    );
}
export default SearchSelect;
