import React, { useState, useRef, useEffect } from "react";
import axios from "axios";

const OrderPage = () => {
    const [cartItems, setCartItems] = useState([]);
    const [user, setUser] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [totalPrice, setTotalPrice] = useState(
        // cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
    );
    const [voucherSelected, setVoucherSelected] = useState('');
    const [vouchers, setVouchers] = useState([]);
    const toast = useRef(null);

    const fetchCartItems = async () => {
        const response = await axios.get("/cart/user-cart");
        setCartItems(response.data.productList);
        setTotalPrice(response.data.totalPrice);
        console.log(response.data);
    };

    const fetchVoucher = async () => {
        const response = await axios.get("/voucher");
        setVouchers(response.data.vouchers);
        setTotalPrice(response.data.totalPrice);
        console.log(response.data.vouchers);
    }

    useEffect(() => {
        fetchCartItems();
        fetchVoucher();
    },[])




    const handlePlaceOrder = () => {
    // Perform order placement logic here

    };


    const handleCancelOrder = () => {
        // Perform order cancellation logic here

    };

    const shippingFee = 22000;
    const finalPrice = totalPrice + shippingFee;
    // const showFinalPrice = (total) => {
    //     let finalPrice = total;
    //     const discount = discounts.find(
    //         (item) => item._id === discountSelected
    //     );

    //     if (discount.discountUnit === "percent") {
    //         const reducedAmount = (total * discount.discountValue) / 100;

    //         if (reducedAmount > discount.maxDiscountAmount) {
    //             finalPrice -= discount.maxDiscountAmount;
    //         } else {
    //             finalPrice -= reducedAmount;
    //         }
    //     } else {
    //         finalPrice -= discount.discountValue;
    //     }
    //     return Math.floor(finalPrice);
    // };


    return (
        <div className="order-container">
            <h1 className='text-3xl text-center p-4'>Order</h1>

            <div className="order-form">
                <h2 className="content m-2 text-2xl">Products</h2>
                <table className="min-w-full border-collapse: collapse;">
                    <thead>
                        <tr>
                            <th className="px-4 py-2 w-2/12">Name</th>
                            <th className="px-4 py-2 w-2/12">Topping List</th>
                            <th className="px-4 py-2">Size</th>
                            <th className="px-4 py-2">Type</th>
                            <th className="px-4 py-2">Quantity</th>
                            <th className="px-4 py-2">Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cartItems.map((item) => (
                            <tr key={item._id} className="border-t last:border-b">
                                <td className="px-4 py-2 text-center">{item.name}</td>
                                <td className="px-4 py-2 text-center">
                                    {item.toppingList.map((topping) => (
                                        <p key={topping._id}>{topping.name}</p>))}
                                </td>
                                <td className="px-4 py-2 text-center">{item.size}</td>
                                <td className="px-4 py-2 text-center">{item.type}</td>
                                <td className="px-4 py-2 text-center">{item.quantity}</td>
                                <td className="px-4 py-2 text-center">{item.price}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>


                <h2 className="content m-2 text-2xl">Order Price: {new Intl.NumberFormat().format(totalPrice)}đ</h2>
                
                <div className="flex">
                    <h2 className="content m-2 text-2xl">Discount: </h2>
                    <div className="p-field flex relative">
                        <select
                            id="vouchers"
                            value={voucherSelected}
                            className="ml-1 w-60 bg-white border border-gray-300 rounded-md py-2 px-3 pr-8 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            onChange={(e) => {
                                setVoucherSelected(e.target.value);
                            }}
                            placeholder="Choose a voucher"
                        >
                            <option disabled value="">
                                Choose a discount
                            </option>
                            {vouchers.map((voucher) => (
                                <option key={voucher._id} value={voucher._id}>
                                    {(voucher.description)}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <h2 className="content m-2 text-2xl">Total Price: đ</h2>
                <h2 className="content m-2 text-2xl">Shipping Fee: {new Intl.NumberFormat().format(shippingFee)}đ</h2>
                <h2 className="content m-2 text-2xl">Final Price: 
                    {new Intl.NumberFormat().format(finalPrice)}
                    đ
                </h2>

                <h2 className="content m-2 text-2xl">Name</h2>
                <div className="p-fluid">
                    <div className="p-field">
                        <input
                            type="text"
                            id="user"
                            value={user}
                            required
                            // defaultValue={JSON.parse(localStorage.getItem('profile'))}
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
                            // defaultValue={JSON.parse(localStorage.getItem('profile'))}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    </div>
                </div>


                {/* <h2 className="content m-2 text-2xl">Payment Method</h2>
                <div className="p-field p-2">
                    <select
                        id="paymentMethod"
                        value={paymentMethod}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        required
                    >
                        <option value="">Select a payment method</option>
                        <option value="cash">Cash</option>
                        <option value="debitCard">Debit Card</option>
                        <option value="creditCard">Credit Card</option>
                        <option value="mobilePayment">Mobile Payment</option>
                        <option value="e-banking">E-Banking</option>
                    </select>
                </div> */}


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