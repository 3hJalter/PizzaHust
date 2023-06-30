import React, { useState, useRef } from "react";
import { Navigate, useNavigate } from 'react-router-dom';

export default function CartPage() {
    const [cartItems, setCartItems] = useState([
        {
            id: 1,
            name: "Product 1",
            size: "M",
            quantity: 1,
            price: 10,
            image: "https://via.placeholder.com/150",
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
    const [totalPrice, setTotalPrice] = useState(
        cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
    );
    const navigate = useNavigate();
    const toast = useRef(null);

    const onQuantityChange = (event, rowData) => {
        const updatedItems = [...cartItems];
        const index = updatedItems.findIndex((item) => item.id === rowData.id);
        updatedItems[index].quantity = event.target.value;
        setCartItems(updatedItems);
        setTotalPrice(
        updatedItems.reduce((total, item) => total + item.price * item.quantity, 0)
        );
        toast.current.show({
        severity: "success",
        summary: "Quantity updated",
        detail: `${rowData.name} quantity updated to ${event.target.value}`,
        life: 3000,
        });
    };

    const deleteCartItem = (rowData) => {
        const updatedItems = cartItems.filter((item) => item.id !== rowData.id);
        setCartItems(updatedItems);
        setTotalPrice(
        updatedItems.reduce((total, item) => total + item.price * item.quantity, 0)
        );
        toast.current.show({
        severity: "success",
        summary: "Item removed",
        detail: `${rowData.name} removed from the cart`,
        life: 3000,
        });
    };

    const handlePayment = () => {
        console.log("Button Payment");
        navigate('/order');
    };

    const sizes = ["S", "M", "L"];

    return (
        <div>
            {/* <Toast ref={toast} /> */}
            <h1 className="text-3xl my-6 text-center">Shopping Cart</h1>
            <table className="min-w-full ">
                <thead>
                    <tr>
                        <th className="px-4 py-2 w-2/12">Name</th>
                        <th className="px-4 py-2 w-2/12">Image</th>
                        <th className="px-4 py-2">Size</th>
                        <th className="px-4 py-2">Quantity</th>
                        <th className="px-4 py-2">Price</th>
                        <th className="px-4 py-2">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {cartItems.map((item) => (
                        <tr key={item.id}>
                            <td className="px-4 py-2 text-center">{item.name}</td>
                            <td className="px-4 py-2 flex justify-center">
                                <img src={item.image} alt={item.name} className="w-1/2"/>
                            </td>
                            <td className="px-4 py-2 text-center">{item.size}</td>
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
                    Total Price: ${totalPrice}{" "}
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
