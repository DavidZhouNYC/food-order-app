import { useEffect, useState } from "react";
import Card from "../UI/Card";
import styles from "./AvailableMeals.module.css";
import MealItem from "./MealItem/MealItem";

const AvailableMeals = () => {
	const [meals, setMeals] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [httpError, setHttpError] = useState();

	useEffect(() => {
		fetch(
			"https://food-order-app-81583-default-rtdb.firebaseio.com/meals.json"
		)
			.then((response) => {
				if (!response.ok) throw new Error("Something went wrong!");
				return response.json();
			})
			.then((data) => {
				const loadedMeals = [];

				for (const key in data) {
					loadedMeals.push({
						id: key,
						name: data[key].name,
						description: data[key].description,
						price: data[key].price,
					});
				}
				setMeals(loadedMeals);
			})
			.catch((error) => {
				setHttpError(error.message);
                
			});

		setIsLoading(false);
	}, []);

	if (isLoading) {
		return (
			<section className={styles["meals-loading"]}>
				<p>Loading...</p>
			</section>
		);
	}

	if (httpError) {
		return (
			<section className={styles['meals-error']}>
				<p>{httpError}</p>
			</section>
		);
	}

	const mealsList = meals.map((meal) => (
		<MealItem
			key={meal.id}
			id={meal.id}
			name={meal.name}
			description={meal.description}
			price={meal.price}
		/>
	));

	return (
		<section className={styles.meals}>
			<Card>
				<ul>{mealsList}</ul>
			</Card>
		</section>
	);
};

export default AvailableMeals;
