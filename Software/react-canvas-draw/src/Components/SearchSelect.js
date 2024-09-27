"use strict";

import { useState } from "react";

function SearchSelect({ options, option, setOption, optionNameFunc=(o)=>o, id }) {
    let searchStr = "";
    let setSearchStr = (str) => searchStr = str;
    [searchStr, setSearchStr] = useState();

    return (
        <select id={id ?? ""} value={option ?? options[0]}
            onChange={(e) => {
                console.log("option in select selected", e.target.value);
                let option = e.target.value;
                setOption(option);
            }}
        >
            {options
                .filter(o => !searchStr || o.includes(searchStr))
                .map((o,i) => {
                    return (
                        <option value={optionNameFunc(o)} key={i}
                            onClick={(e) => { setOption(o); }}
                        >{optionNameFunc(o)}</option>
                    );
                })
            }
        </select>
    );
}
export default SearchSelect;
