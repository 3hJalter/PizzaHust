import { useLocation, useNavigate } from "react-router-dom";

const ProductItem = (props) => {
    const navigate = useNavigate()
    const item = props.item;
    const pathname = useLocation().pathname.split("-")[0];
    return(      
        <div className="rounded bg-stone-100 hover:cursor-pointer drop-shadow-xl border-2" onClick={() => {navigate(`${pathname}/${item._id}`)}}>
            <div className="font-bold text-[#EF4444] pb-1">{item.name}</div>
            <div className="mx-5 relative w-40 h-48 overflow-hidden">
                <img className="absolute inset-0 w-full h-full object-none" src={item.image}/>
            </div>
            {
                pathname !== "pizzaTopping" ? 
                    <button className="bg-[#EF4444] font-bold my-5 p-2 rounded-full hover:bg-[#EF4444]/[0.8]">Add cart</button>
                : <div></div>
            }
            
        </div>
    )
}

export default ProductItem;