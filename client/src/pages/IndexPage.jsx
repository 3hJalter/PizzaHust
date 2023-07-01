import React, { useContext, useEffect } from 'react';
import ShowProduct from '../components/ShowProduct';

const IndexPage = () => {

  return (
    <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
        <ShowProduct
            image="https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Pizza-3007395.jpg/800px-Pizza-3007395.jpg"
            name="Product Name Goes Here"
            cost={150}
            description="Volup erat ipsum diam elitr rebum et dolor. Est nonumy elitr erat diam stet sit clita ea. Sanc ipsum et, labore clita lorem magna duo dolor no sea Nonumy"
        />

        <ShowProduct
            image="https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Pizza-3007395.jpg/800px-Pizza-3007395.jpg"
            name="Product Name Goes Here"
            cost={150}
            description="Volup erat ipsum diam elitr rebum et dolor. Est nonumy elitr erat diam stet sit clita ea. Sanc ipsum et, labore clita lorem magna duo dolor no sea Nonumy"
        />

        <ShowProduct
            image="https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Pizza-3007395.jpg/800px-Pizza-3007395.jpg"
            name="Product Name Goes Here"
            cost={150}
            description="Volup erat ipsum diam elitr rebum et dolor. Est nonumy elitr erat diam stet sit clita ea. Sanc ipsum et, labore clita lorem magna duo dolor no sea Nonumy"
        />

        <ShowProduct
            image="https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Pizza-3007395.jpg/800px-Pizza-3007395.jpg"
            name="Product Name Goes Here"
            cost={150}
            description="Volup erat ipsum diam elitr rebum et dolor. Est nonumy elitr erat diam stet sit clita ea. Sanc ipsum et, labore clita lorem magna duo dolor no sea Nonumy"
        />


    </div>
  );
};

export default IndexPage;
