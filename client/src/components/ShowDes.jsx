import React, { useContext, useEffect } from 'react';
import { Button } from '@mui/material';
import RadioButton from './RadioButton';

const ShowDes = (props) => {
    const { description } = props;

    return (
        <div className="bg-slate-300 grid grid-cols-5 mx-12 space-x-4 rounded-xl p-4 py-4">
            {description}
        </div>
    );
};

export default ShowDes;