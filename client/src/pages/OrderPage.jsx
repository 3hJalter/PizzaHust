import React, { useState, useRef } from 'react';

const OrderPage = () => {
    const [cartItems, setCartItems] = useState([
        {
            id: 1,
            name: 'Product 1',
            size: 'M',
            quantity: 1,
            price: 10,
            image: 'https://via.placeholder.com/150',
        },
        {
            id: 2,
            name: "Product 2",
            size: "M",
            quantity: 2,
            price: 20,
            image: "https://via.placeholder.com/150",
        },
        {
            id: 3,
            name: "Product 3",
            size: "M",
            quantity: 3,
            price: 30,
            image: "https://via.placeholder.com/150",
        },
        {
            id: 4,
            name: "Product 4",
            size: "M",
            quantity: 3,
            price: 30,
            image: "https://via.placeholder.com/150",
        },
        {
            id: 5,
            name: "Product 5",
            size: "M",
            quantity: 1,
            price: 10,
            image: "https://via.placeholder.com/150",
        },
    ]);

    const [user, setUser] = useState('');
    const [address, setAddress] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('');
    const [phone, setPhone] = useState('');
    const [totalPrice, setTotalPrice] = useState(
        cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
    );
    const toast = useRef(null);


    const handlePlaceOrder = () => {
        // Perform order placement logic here

        // Show success toast message
        toast.current.show({
        severity: 'success',
        summary: 'Order Placed',
        detail: 'Your order has been placed successfully!',
        life: 3000,
        });
    };

    const handleCancelOrder = () => {
        // Perform order cancellation logic here

        // Show cancel toast message
        toast.current.show({
        severity: 'warn',
        summary: 'Order Cancelled',
        detail: 'Your order has been cancelled!',
        life: 3000,
        });
    };

    return (
        <div className="order-container">
        <h1 className='text-3xl text-center p-4'>Order</h1>

        <div className="order-form">
            <h2 className="content m-2 text-2xl">Products</h2>
            <table className="min-w-full ">
            <thead>
                <tr>
                <th className="px-4 py-2 w-2/12">Name</th>
                <th className="px-4 py-2 w-2/12">Image</th>
                <th className="px-4 py-2">Size</th>
                <th className="px-4 py-2">Quantity</th>
                <th className="px-4 py-2">Price</th>
                </tr>
            </thead>
            <tbody>
                {cartItems.map((item) => (
                <tr key={item.id}>
                    <td className="px-4 py-2 text-center">{item.name}</td>
                    <td className="px-4 py-2 text-center">
                    <img src={item.image} alt={item.name} />
                    </td>
                    <td className="px-4 py-2 text-center">{item.size}</td>
                    <td className="px-4 py-2 text-center">{item.quantity}</td>
                    <td className="px-4 py-2 text-center">{item.price}</td>
                </tr>
                ))}
            </tbody>
            </table>

            <h2 className="content m-2 text-2xl">Order Price: ${totalPrice}</h2>
            <h2 className="content m-2 text-2xl">Discount: </h2>
            
            {/* <h2 className="content m-2  text-2xl">Tax Price</h2>
            <h2 className="content m-2  text-2xl">Shipping Price</h2> */}
            <h2 className="content m-2 text-2xl">Total Price: </h2>

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

            <h2 className="content m-2 text-2xl">Payment Method</h2>
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
