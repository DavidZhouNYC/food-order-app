import { useRef, useState } from "react";
import Input from "../../UI/Input";
import styles from "./MealItemForm.module.css";

const MealItemForm = (props) => {
    const [amountIsValid, setAmountIsValid] =  useState(true);
    const amountInputRef = useRef();

    const submitHanlder = (event) => {
        event.preventDefault();

        const enteredAmount = amountInputRef.current.value; // Expects string
        const enteredAmountNumber = +enteredAmount; // Convert string to int

        if (
            enteredAmount.trim().length === 0 ||
            enteredAmountNumber < 1 ||
            enteredAmountNumber > 5
        ) {
            setAmountIsValid(false);
            return;
        }

        props.onAddToCart(enteredAmountNumber);
    };

    return (
        <form className={styles.form} onSubmit={submitHanlder}>
            <Input
                ref={amountInputRef}
                label="Amount"
                input={{
                    id: "amount",
                    type: "number",
                    min: "1",
                    max: "5",
                    step: "1",
                    defaultValue: "1",
                }}
            />
            <button>+ Add</button>
            {!amountIsValid && <p>Please enter a valid amount (1 - 5)</p>}
        </form>
    );
};

export default MealItemForm;
