import { useEffect } from "react";
import MenuList from "../components/MenuList";
import axios from "axios";

const PizzaListPage = () => {
    return (
        <div className="flex">
            <div className="w-2/3 p-2">
                <MenuList/>
            </div>  
            <div className="w-1/3 p-2">
                Card
            </div>
        </div>
    )
}

export default PizzaListPage;