import { useEffect, useState } from "react";
import MenuList from "../components/MenuList";
import axios from "axios";
import ProductItem from "../components/ProductItem";
import CartIcon from "./CartIcon";


const SideDishesListPage = () => {
    const [sideDishes, setSideDishes] = useState([]);
    useEffect(() => {
        axios.get('/sideDish/').then((response) => {
            setSideDishes(response.data);
        }).catch((error) => {
            console.error(error);
        })
    }, [])
    return (
        <div className="flex w-5/6 m-auto">
            <div className="w-2/3 p-2">
                <MenuList/>
                <div className="grid grid-cols-3 gap-3 gap-y-10 pt-10 px-3">
                    {sideDishes.map((sideDish) =>
                        <ProductItem key={sideDish._id} item={sideDish} />
                    )}
                </div>
            </div>  
            <div className="w-1/3 p-2">
                <CartIcon/>
            </div>
        </div>
    )
}

export default SideDishesListPage;