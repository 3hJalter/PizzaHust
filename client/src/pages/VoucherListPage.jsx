import { useEffect, useState } from "react";
import MenuList from "../components/MenuList";
import axios from "axios";
import ProductItem from "../components/ProductItem";
import CartIcon from "./CartIcon";


const VoucherListPage = () => {
    const [vouchers, setVouchers] = useState([]);
    useEffect(() => {
        axios.get('/voucher/').then((response) => {
            setVouchers(response.data);
        }).catch((error) => {
            console.error(error);
        })
    }, [])
    return (
        <div className="flex w-5/6 m-auto">
            <div className="w-2/3 p-2">
                <MenuList/>
                <div className="grid grid-cols-3 gap-3 gap-y-10 pt-10 px-3">
                    {vouchers.map((voucher) =>
                        <ProductItem key={voucher._id} item={voucher} />
                    )}
                </div>
            </div>  
            <div className="w-1/3 p-2">
                <CartIcon/>
            </div>
        </div>
    )
}

export default VoucherListPage;