import React from "react";

const CartContent = React.createContext({
    items: [],
    totalAmount: 0,
    addItems: (item) => {},
    remoItems: (id) => {},
});

export default CartContent;
