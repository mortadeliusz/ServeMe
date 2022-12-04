import { getAllRestaurants } from "../../firebase/main/firebase";
import classes from "./restaurants.module.css";
import Card from "../../UI/Card/Card";
import { Link, useLoaderData } from "react-router-dom";

export default function Restaurants(props) {
  const restaurants = useLoaderData();

  if (!restaurants?.length) return <h3>No restaurants found.</h3>;
  return (
    <div className={classes.restaurants}>
      {restaurants.map((restaurant) => (
        <Link to={restaurant.id} key={restaurant.id}>
          <Card className={classes["restaurant-card"]}>{restaurant.name}</Card>
        </Link>
      ))}
    </div>
  );
}
export function loader() {
  return getAllRestaurants();
}
