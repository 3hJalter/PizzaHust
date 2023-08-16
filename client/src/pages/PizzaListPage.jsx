import { useEffect, useState } from "react";
import MenuList from "../components/MenuList";
import axios from "axios";
import ProductItem from "../components/ProductItem";
import CartIcon from "./CartIcon";

const PizzaListPage = () => {
    const [pizzas, setPizzas] = useState([]);
    const [pizzaTypes, setPizzaTypes] = useState([]);
    const [selectedType, setSelectedType] = useState("");

    useEffect(() => {
        axios.get('/pizza/').then((response) => {
            setPizzas(response.data);
        }).catch((error) => {
            console.error(error);
        })
    }, [])

    useEffect(() => {
        axios.get('/pizzaType/').then((response) => {
            setPizzaTypes(response.data);
        }).catch((error) => {
            console.error(error);
        })
    }, []);

    const handleChange = (event) => {
        setSelectedType(event.target.value)
    }

    const handleSelect = () => {
        if (selectedType === "") return;
        const pizzaTypeId = pizzaTypes.find((pizzaType) => pizzaType.name === selectedType).id;
        const selectedPizza = pizzas.filter((pizza) => pizza.pizzaTypeId === pizzaTypeId);
        setPizzas(selectedPizza)
    }
    const FilterPizza = () => {
        if (pizzaTypes.length === 0) {
            return <div></div>
        } else return(
            <div className="mt-10 border-4 rounded-xl">
                <h1 className="text-xl font-bold text-[#EF4444]">Select your favorite</h1>
                <select className="border-4 w-40" onChange={handleChange}>
                    <option value=""></option>
                    {pizzaTypes.map((pizzaType) => {
                        return(
                            <option value={pizzaType.name}>{pizzaType.name}</option>
                        )
                    })}
                </select>
                <button className="bg-[#EF4444] font-bold mb-5 p-1 text-sm rounded-full hover:bg-[#EF4444]/[0.8] ml-3 w-16" onClick={handleSelect}>Filter</button>
            </div>
        )
    }
    return (
        <div className="flex w-5/6 m-auto">
            <div className="w-2/3 p-2">
                <MenuList/>
                <div className="grid grid-cols-3 gap-3 gap-y-10 pt-10 px-3">
                    {pizzas.map((pizza) =>
                        <ProductItem key={pizza._id} item={pizza} />
                    )}
                </div>
            </div>  
            <div className="w-1/3 p-2">
                <FilterPizza/>
                <CartIcon/>
            </div>
        </div>
    )
}

export default PizzaListPage;