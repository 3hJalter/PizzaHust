import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';


const OrderPage = () => {
    const [cartItems, setCartItems] = useState([]);
    const [user, setUser] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [orderPrice, setOrderPrice] = useState('');
    const [shippingFee, setShippingFee] = useState(22000);
    const [finalPrice, setFinalPrice] = useState('');
    const [voucherSelected, setVoucherSelected] = useState('');
    const [vouchers, setVouchers] = useState([]);

    const [loading, setLoading] = useState('');
    const navigate = useNavigate();
    const toast = useRef(null);

    const fetchCartItems = async () => {
        try{
            const response = await axios.get("/cart/user-cart");
            setCartItems(response.data.productList);
            setOrderPrice(response.data.totalPrice);
            setFinalPrice(response.data.totalPrice + shippingFee);
        } catch(err){
            console.log(err);
        }
    };

    const fetchVoucher = async () => {
        try {
            const response = await axios.get("/voucher");
            setVouchers(response.data);
        } catch(err) {
            console.log(err);
        }
    }

    useEffect(() => {
        fetchCartItems();
        fetchVoucher();
    },[])

    const createOrder = async () => {
        try {
            const data = {
                user,
                address,
                phone,
                orderPrice,
                shippingFee,
                voucherId: voucherSelected,
            };
            const response = await axios.post('/order/add-order', data);
            setOrderPrice(0);
            setShippingFee(0);
            setVoucherSelected('');
            setUser('');
            setAddress('');
            setPhone('');
        } catch (error) {
            console.log(error.response);
        }
    };

    const handlePlaceOrder = () => {
        if (!user || !address || !phone) {
            alert("Please fill in all required fields: Name, Address, Phone");
            return;
        }
        
        createOrder();
        navigate('/account/orders');
    };

    const handleCancelOrder = () => {
        navigate('/cart');
    };

    
    const showTotalPrice = (total) => {
        let totalPrice = total;
        const voucher = vouchers.find(
            (item) => item._id === voucherSelected
        );
        if (voucher.type === "percent") {
            const reducedAmount = (total * voucher.discount) / 100;
            totalPrice -= reducedAmount;
        } else {
            totalPrice -= voucher.discount;
        }
        return Math.floor(totalPrice);
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
                    Order Price: {new Intl.NumberFormat().format(orderPrice)}
                    đ
                </h2>

                <div className="flex">
                    <h2 className="content m-2 text-2xl">Voucher: </h2>
                    <div className="p-field flex relative">
                        <select
                            id="vouchers"
                            value={voucherSelected}
                            className="ml-1 w-60 bg-white border border-gray-300 rounded-md py-2 px-3 pr-8 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            onChange={(e) => {
                                setVoucherSelected(e.target.value);
                            }}
                        >
                            <option disabled value="">
                                Choose a voucher
                            </option>
                            {vouchers.map((voucher) => {
                                if (orderPrice > voucher.priceRequired) {
                                    return (
                                        <option key={voucher._id} value={voucher._id}>
                                            {voucher.description}
                                        </option>
                                    );
                                }
                                return null;
                            })}
                        </select>
                    </div>
                </div>

                <h2 className="content m-2 text-2xl">
                    <span className="">Total Price</span>:{" "}
                    <span
                        className={`font-bold  ${
                            voucherSelected
                                ? "text-gray-400 font-normal line-through"
                                : "text-red-700"
                        }`}
                    >
                        {new Intl.NumberFormat().format(orderPrice)}
                        đ
                    </span>
                    
                    {voucherSelected && (
                        <>
                            <span className="mx-2 font-bold text-red-700">
                                {new Intl.NumberFormat().format(
                                    showTotalPrice(orderPrice)
                                )}
                                <span className="text-red-500">
                                    đ
                                </span>
                            </span>
                        </>
                    )}
                </h2>

                <h2 className="content m-2 text-2xl">
                    Shipping Fee: {new Intl.NumberFormat().format(shippingFee)}
                    đ
                </h2>

                <h2 className="content m-2 text-2xl">
                    <span className="">Final Price</span>:{" "}
                    <span
                        className={`font-bold  ${
                            voucherSelected
                                ? "text-gray-400 font-normal line-through"
                                : "text-red-700"
                        }`}
                    >
                        {new Intl.NumberFormat().format(orderPrice+shippingFee)}
                        đ
                    </span>
                    {(voucherSelected && (
                        <>
                            <span className="mx-2">
                                {new Intl.NumberFormat().format(
                                    showTotalPrice(orderPrice) + shippingFee
                                )}
                            </span>
                            <span className="text-red-500">
                                đ
                            </span>
                        </>
                    ))}
                </h2>

                <h2 className="content m-2 text-2xl">Name</h2>
                <div className="p-fluid">
                    <div className="p-field">
                        <input
                            type="text"
                            id="user"
                            value={user}
                            required
                            onChange={(e) => setUser(e.target.value)}
                        />
                    </div>
                </div>


                <h2 className="content m-2 text-2xl">Address</h2>
                <div className="p-fluid">
                    <div className="p-field">
                        <input
                            type="text"
                            id="address"
                            value={address}
                            required
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    </div>
                </div>

                <h2 className="content m-2 text-2xl">Contact Phone</h2>
                <div className="p-field">
                    <input
                        type="text"
                        id="phone"
                        value={phone}
                        required
                        onChange={(e) => setPhone(e.target.value)}
                    />
                </div>

                <div className='content my-4 text-center'>
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-4"
                        onClick={handlePlaceOrder}
                    >
                        Confirm Order
                    </button>
                    {' '}
                    <button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mx-4"
                        onClick={handleCancelOrder}
                    >
                        Cancel
                    </button>
                </div>
            </div>

            <div ref={toast}></div>
        </div>
    );
};

export default OrderPage;