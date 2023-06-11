
            <div className="flex justify-between items-center">
                <h2 className="my-4">
                    Total Price: ${totalPrice}{" "}
                </h2>
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={handlePayment}
                >
                    Place Order
                </button>
            </div>
        </div>
    );
}