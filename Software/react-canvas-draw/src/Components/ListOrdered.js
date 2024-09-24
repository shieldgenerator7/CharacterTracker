"use strict";

function ListOrdered({ arr, contentFunc, updateFunc }) {
    return (
        <div>
            {arr.map((obj, i) => (
                <div>
                    {contentFunc(
                        obj,
                        i,
                        (<>
                            {/* Move down */}
                            <button onClick={() => {
                                if (i < arr.length - 1) {
                                    arr.splice(i, 1);
                                    arr.splice(i + 1, 0, obj);
                                    updateFunc(arr);
                                }
                            }}>&darr;</button>
                            {/* Move up */}
                            <button onClick={() => {
                                if (i > 0) {
                                    arr.splice(i, 1);
                                    arr.splice(i - 1, 0, obj);
                                    updateFunc(arr);
                                }
                            }}>&uarr;</button>
                            {/* Remove */}
                            <button onClick={() => {
                                arr.splice(i, 1);
                                updateFunc(arr);
                            }}>X</button>
                        </>
                        )
                    )}
                </div>
            ))}
        </div>
    );
}
export default ListOrdered;
