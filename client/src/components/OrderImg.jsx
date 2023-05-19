import React from 'react';

const OrderImg = ({ order, index = 0, className = null }) => {
  if (!order.photos?.length) {
    return '';
  }
  if (!className) {
    className = 'object-cover';
  }
  return <img src={order.photos[index]} alt="" className={className} />;
};

export default OrderImg;
