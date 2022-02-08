import styles from "./AvailableMeals.module.css";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import {useEffect, useState} from "react";

const AvailableMeals = () => {
    const [meals, setMeals] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState();

    useEffect(() => {
        const fetchMeals = async () => {
            const response = await fetch(
                "https://react-http-e6d4c-default-rtdb.europe-west1.firebasedatabase.app/meals.json");
            if (!response.ok) {
                throw new Error('Something went wrong!');
            }

            const data = await response.json();

            const loadedMeals = [];

            for (const key in data) {
                loadedMeals.push({
                    id: key,
                    name: data[key].name,
                    description: data[key].description,
                    price: data[key].price
                })
            }

            setMeals(loadedMeals);
            setIsLoading(false);
        }

        fetchMeals().catch((error) => {
            setIsLoading(false);
            setError(error.message);
        });

    }, [])

    if (isLoading) {
        return (
            <section className={styles.mealsLoading}>
                <p>Loading...</p>
            </section>
        );
    }

    if (error) {
        return (
            <section className={styles.mealsError}>
                <p>Error during fetching data</p>
            </section>
        )
    }

    const mealsList = meals.map((meal) => (
        <MealItem
            id={meal.id}
            key={meal.id}
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
