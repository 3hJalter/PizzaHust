import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";


export default function CartPage() {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [totalPrice, setTotalPrice] = useState(
        // cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
    );
    const navigate = useNavigate();
    const toast = useRef(null);

    const getCartItems = async () => {
        const response = await axios.get("/cart/user-cart");
        setCartItems(response.data.productList);
        setTotalPrice(response.data.totalPrice);
        console.log(response.data);
    };

    useEffect(() => {
        getCartItems();
    },[])


    const onQuantityChange = (event, rowData) => {
        const updatedItems = [...cartItems];
        const index = updatedItems.findIndex((item) => item._id === rowData._id);
        updatedItems[index].quantity = event.target.value;
        setCartItems(updatedItems);
        setTotalPrice(
            updatedItems.reduce((total, item) => total + item.price * item.quantity, 0)
        );
    };


    const deleteCartItem = (rowData) => {
        const updatedItems = cartItems.filter((item) => item._id !== rowData._id);
        setCartItems(updatedItems);
        setTotalPrice(
            updatedItems.reduce((total, item) => total + item.price * item.quantity, 0)
        );
    };


    const handlePayment = () => {
        navigate('/order');
    };


    return (
        <div>
            {/* <Toast ref={toast} /> */}
            <h1 className="text-3xl my-6 text-center">Shopping Cart</h1>
            <table className="min-w-full ">
                <thead>
                    <tr>
                        <th className="px-4 py-2 w-2/12">Name</th>
                        <th className="px-4 py-2 w-2/12">Topping List</th>
                        <th className="px-4 py-2">Size</th>
                        <th className="px-4 py-2">Type</th>
                        <th className="px-4 py-2">Quantity</th>
                        <th className="px-4 py-2">Price</th>
                        <th className="px-4 py-2">Action</th>
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
                            <td className="px-4 py-2 text-center">
                            <input
                                type="number"
                                value={item.quantity}
                                min={1}
                                max={100}
                                onChange={(e) => onQuantityChange(e, item)}
                            />
                            </td>
                            <td className="px-4 py-2 text-center">{item.price}</td>
                            <td className="px-4 py-2 text-center">
                                <button
                                    className="bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                                    onClick={() => deleteCartItem(item)}
                                >
                                    Remove
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>


            <div className="flex justify-between items-center">
            <h2 className="my-4">
                Total Price: {totalPrice}đ{" "}
            </h2>
            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={handlePayment}
            >
                Place Order
            </button>
            </div>
        </div>
    );
}
