import React, { useContext, useEffect } from 'react';
import { Button } from '@mui/material';
import RadioButton from './RadioButton';

const ShowProduct = (props) => {
    const { image, name, cost, description } = props;

    return (
        <div className="grid grid-cols-5 mx-12 space-x-4">
            <div className="col-span-2 flex justify-center bg-white p-2 rounded-xl">
                <img
                    src={image}
                    alt={name}
                    className="rounded-xl object-cover"
                />
            </div>

            <div className="col-span-3 bg-white p-2 rounded-xl space-y-3">
                <div className="text-2xl font-bold mb-2">
                    {name}
                </div>

                <div className="text-xl font-bold text-red-600">
                    ${cost}
                </div>

                <div>
                    {description}
                </div>

                <RadioButton />
                <RadioButton />

                <Button variant="contained">Add to card</Button>
            </div>
        </div>
    );
};

export default ShowProduct;