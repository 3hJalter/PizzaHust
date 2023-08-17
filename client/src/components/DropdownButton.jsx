import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './css/DropdownButton.css';

const DropdownButton = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="dropdown-container">
            <button className="dropdown-button" onClick={toggleDropdown}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-9 h-9 text-red-500">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0l4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0l-5.571 3-5.571-3" />
                </svg>

            </button>
            {isOpen && (
                <div className="dropdown-content">
                    <Link className='' to = '/pizza-list'>Pizza</Link>
                    <Link className='' to = '/sideDish-list'>Side Dishes</Link>
                    <Link className='' to = '/combo-list'>Combo</Link>
                    <Link className='' to = '/pizzaTopping-list'>Topping</Link>
                    <Link className='' to = '/voucher-list'>Voucher</Link>
                </div>
            )}
        </div>
    );
};

export default DropdownButton;
