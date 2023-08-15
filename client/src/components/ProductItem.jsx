import { useLocation, useNavigate } from "react-router-dom";

const ProductItem = (props) => {
    const navigate = useNavigate()
    const item = props.item;
    console.log(item)
    const pathname = useLocation().pathname.split("-")[0];

    const AddCart = (pathname) => {
        if (pathname === "/pizzaTopping") 
                return <div></div>
        if (pathname === "/pizza") 
            return <div>
                    <select className="border rounded p-1 mr-4 font-semibold text-sm">
                        <option value="S" selected>S</option>
                        <option value="M">M</option>
                        <option value="L">L</option>
                    </select>
                    <button className="bg-[#EF4444] font-bold mb-5 p-2 rounded-full hover:bg-[#EF4444]/[0.8]">Add cart</button>
                </div>
        else return <button className="bg-[#EF4444] font-bold mb-5 p-2 rounded-full hover:bg-[#EF4444]/[0.8]">Add cart</button>
    }

    const showMoney = () => {
        if (pathname !== "/pizza") {
            return <div>{item.price}</div>
        }
    }
    const addPizza = () => {

    }

    const addItem = () => {

    }
    return(      
        <div className="rounded bg-stone-100 hover:cursor-pointer drop-shadow-xl border-2">
            <div className="font-bold text-[#EF4444] pb-1" onClick={() => {navigate(`${pathname}/${item._id}`)}}>{item.name}</div>
            <div className="mx-5 relative w-40 h-48 overflow-hidden mb-5" onClick={() => {navigate(`${pathname}/${item._id}`)}}>
                <img className="absolute inset-0 w-full h-full object-none" src={item.image}/>
            </div>
            {
                AddCart(pathname)
            }
            {
                showMoney()
            }
        </div>
    )
}

export default ProductItem;