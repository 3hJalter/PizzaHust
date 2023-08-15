import { useNavigate } from "react-router-dom";

const MenuList = () => {
    const navigate = useNavigate();
    return (
        <>
            <h1 className="font-bold text-xl text-[#EF4444] pb-3">Menu</h1>
            <div className="grid grid-cols-4 gap-4 px-4">
                <div className="rounded bg-red-100 hover:cursor-pointer border-stone-200 border-2" onClick={() => navigate("/pizza-list")}>
                    <div className="font-bold text-[#EF4444] pb-1">Pizza</div>
                    <img className="rounded-b" src="https://img.freepik.com/free-photo/mix-pizza-chicken-tomato-bell-pepper-olives-mushroom-side-view_141793-3167.jpg?w=826&t=st=1692087210~exp=1692087810~hmac=378a82802c0390033fa6b515eede3df639ea939ffebf5ae45dcc9c69accccb68"/>
                </div>
                <div className="rounded bg-red-100 hover:cursor-pointer border-stone-200 border-2" onClick={() => navigate("/combo-list")}>
                    <div className="font-bold text-[#EF4444] pb-1">Combo</div>
                    <img className="rounded-b" src="https://img.freepik.com/free-photo/mix-pizza-chicken-tomato-bell-pepper-olives-mushroom-side-view_141793-3167.jpg?w=826&t=st=1692087210~exp=1692087810~hmac=378a82802c0390033fa6b515eede3df639ea939ffebf5ae45dcc9c69accccb68"/>
                </div>
                <div className="rounded bg-red-100 hover:cursor-pointer border-stone-200 border-2" onClick={() => navigate("/side-dish-list")}>
                    <div className="font-bold text-[#EF4444] pb-1">Side Dish</div>
                    <img className="rounded-b" src="https://img.freepik.com/free-photo/mix-pizza-chicken-tomato-bell-pepper-olives-mushroom-side-view_141793-3167.jpg?w=826&t=st=1692087210~exp=1692087810~hmac=378a82802c0390033fa6b515eede3df639ea939ffebf5ae45dcc9c69accccb68"/>
                </div>
                <div className="rounded bg-red-100 hover:cursor-pointer border-stone-200 border-2">
                    <div className="font-bold text-[#EF4444] pb-1" onClick={() => navigate("/pizza-topping-list")}>Pizza Topping</div>
                    <img className="rounded-b" src="https://img.freepik.com/free-photo/mix-pizza-chicken-tomato-bell-pepper-olives-mushroom-side-view_141793-3167.jpg?w=826&t=st=1692087210~exp=1692087810~hmac=378a82802c0390033fa6b515eede3df639ea939ffebf5ae45dcc9c69accccb68"/>
                </div>
            </div>
        </>
    );
};

export default MenuList;