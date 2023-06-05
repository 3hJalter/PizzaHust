import React, { useContext, useEffect } from 'react';
import ShowProduct from '../components/ShowProduct';

const DetailPage = () => {

    return (
        <div className="mt-8 grid">
            <ShowProduct
                image="https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Pizza-3007395.jpg/800px-Pizza-3007395.jpg"
                name="Product Name Goes Here"
                cost={150}
                description="Volup erat ipsum diam elitr rebum et dolor. Est nonumy elitr erat diam stet sit clita ea. Sanc ipsum et, labore clita lorem magna duo dolor no sea Nonumy"
            />

        </div>
    );
};

export default DetailPage;
