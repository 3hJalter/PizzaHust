import MenuList from "../components/MenuList";

const PizzaToppingListPage = () => {
    return (
        <div className="flex">
            <div className="w-2/3 p-2">
                <MenuList/>
            </div>  
            <div className="w-1/3 p-2">
                Something
            </div>
        </div>
    )
}

export default PizzaToppingListPage;