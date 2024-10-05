"use strict";

function TempBonusFrame({ tempBonus, updateFunc }) {
    return (<>
        {tempBonus.bonus} {tempBonus.filter}
    </>);
}
export default TempBonusFrame;