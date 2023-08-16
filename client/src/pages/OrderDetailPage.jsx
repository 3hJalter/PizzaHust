import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from 'react-router-dom';


const OrderDetailPage = () => {
    const { id } = useParams();
    const [cartItems, setCartItems] = useState([]);
    const [order, setOrder] = useState('');

    
    const [loading, setLoading] = useState('');
    const navigate = useNavigate();
    const toast = useRef(null);


    const formatDate = (dateTimeString) => {
        const date = new Date(dateTimeString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        const hours = String(date.getHours()).padStart(2, "0");
        const minutes = String(date.getMinutes()).padStart(2, "0");
        const seconds = String(date.getSeconds()).padStart(2, "0");
    
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    };
    
    const fetchDetail = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`/order/${id}`);
            setOrder(response.data);
            setCartItems(response.data.productList);
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    };
    
    useEffect(() => {
        fetchDetail();
    }, []);

    const handleCancelOrderDetail = () => {
        navigate('/account/orders');
    };

    return (
        <div className="order-container">
            <h1 className='text-3xl text-center p-4'>Order</h1>

            <div className="order-form">
                <h2 className="content m-2 text-2xl">Products</h2>
                <table className="min-w-full border-collapse: collapse;">
                    <thead>
                        <tr>
                            <th className="px-4 py-2">Name</th>
                            <th className="px-4 py-2">Quantity</th>
                            <th className="px-4 py-2">Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cartItems.map((item) => (
                            <tr key={item._id} className="border-t last:border-b">
                                <td className="px-4 py-2 text-center">{item.name}</td>
                                <td className="px-4 py-2 text-center">{item.quantity}</td>
                                <td className="px-4 py-2 text-center">{item.price}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>


                <h2 className="content m-2 text-2xl">
                    Order Price: {order.orderPrice}
                    đ
                </h2>

                <h2 className="content m-2 text-2xl">
                    Voucher: {order.voucher}
                </h2>

                <h2 className="content m-2 text-2xl">
                    Total Price: {order.totalPrice}
                    đ
                </h2>

                <h2 className="content m-2 text-2xl">
                    Shipping Fee: {order.shippingFee}
                    đ
                </h2>

                <h2 className="content m-2 text-2xl">
                    Final Price: {new Intl.NumberFormat().format(order.finalPrice)}
                    đ
                </h2>

                <h2 className="content m-2 text-2xl">
                    UserId: {order.userId}
                </h2>

                <h2 className="content m-2 text-2xl">
                    OrderId: {order._id}
                </h2>

                <h2 className="content m-2 text-2xl">
                    CreateAt: {formatDate(order.createdAt)}
                </h2>

                <h2 className="content m-2 text-2xl">
                    Address: {order.address}
                </h2>

                <h2 className="content m-2 text-2xl">
                    Contact Phone: {order.phone}
                </h2>

                <div className='content my-4 text-center'>
                    <button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mx-4"
                        onClick={handleCancelOrderDetail}
                    >
                        Exit
                    </button>
                </div>
            </div>

            <div ref={toast}></div>
        </div>
    );
};

export default OrderDetailPage;