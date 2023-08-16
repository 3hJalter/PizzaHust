import { useLocation, useNavigate } from "react-router-dom";

const ProductItem = (props) => {
    const navigate = useNavigate()
    const item = props.item;
    const pathname = useLocation().pathname.split("-")[0];

    const AddCart = (pathname) => {
        if (pathname === "/pizzaTopping" || pathname === "/voucher")  
            return <div></div>
        else
            return <button className="bg-[#EF4444] font-bold mb-5 p-2 rounded-full hover:bg-[#EF4444]/[0.8]" onClick={() => {navigate(`${pathname}/${item._id}`)}}>Add cart</button>
    }

    return(      
        <div className="rounded bg-stone-100 hover:cursor-pointer drop-shadow-xl border-2 text-center">
            <div className="font-bold text-[#EF4444] pb-1" onClick={() => {navigate(`${pathname}/${item._id}`)}}>{item.name}</div>
            <div className="mx-5 relative w-40 h-48 overflow-hidden mb-5" onClick={() => {navigate(`${pathname}/${item._id}`)}}>
                <img className="absolute inset-0 w-full h-full" src={item.image}/>
            </div>
            {
                AddCart(pathname)
            }
        </div>
    )
}

export default ProductItem;