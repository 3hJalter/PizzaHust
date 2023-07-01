import React, { useContext, useEffect } from 'react';
import { Radio } from "@material-tailwind/react";

const RadioButton = () => {
    return (
        <div className="flex gap-10">
            Size:
            <Radio
                id="ripple-on"
                name="type"
                label="Ripple Effect On"
                ripple={true}
            />
            
            <Radio
                id="ripple-off"
                name="type"
                label="Ripple Effect Off"
                ripple={false}
            />

            <Radio
                id="ripple-off"
                name="type"
                label="Ripple Effect Off"
                ripple={false}
            />
        </div>
    );
};

export default RadioButton;