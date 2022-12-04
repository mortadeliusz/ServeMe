import { useLoaderData, useRouteLoaderData } from "react-router-dom";
import { getRestaurantWithItems } from "../../firebase/main/firebase";
import dummyRestaurantImage from "./images/pub.jpg";
import styles from "./restaurant.module.css";
import Card from "../../UI/Card/Card";
import FreepikImage from "../../UI/FreepikImage/FreepikImage";

export default function Restaurant() {
  const restaurant = useLoaderData();
  if (!restaurant)
    return <h3>We can't find this restaurant in our database.</h3>;

  return (
    <div className={styles.restaurant}>
      <RestaurantHeader />
      <RestaurantMenu />
    </div>
  );
}

export function loader(restaurantId, tableId) {
  return getRestaurantWithItems(restaurantId);
}

const RestaurantHeader = () => {
  const { image, name } = useLoaderData();
  const { user } = useRouteLoaderData("rootRoute");

  return (
    <Card className={styles["restaurant-header"]}>
      {image ? (
        <img
          className={styles["restaurant-header__image"]}
          src={image}
          alt="restaurant"
        />
      ) : (
        <FreepikImage
          className={styles["restaurant-header__image"]}
          src={dummyRestaurantImage}
          alt="restaurant"
          attributionURL="https://www.freepik.com/free-vector/music-bar-pub-cartoon-empty-interior-with-illuminated-signboard_5467486.htm#query=bar&position=18&from_view=search"
        />
      )}
      <h2 className={styles["restaurant-header__name"]}>{name}</h2>
    </Card>
  );
};
const RestaurantMenu = () => {
  const { menuItems, currencySymbol } = useLoaderData();
  return (
    <div className={styles["restaurant-menu"]}>
      {menuItems.map((item) => (
        <ul>
          <Card key={item.id}>
            {item.name} - {item.price} {currencySymbol}
          </Card>
        </ul>
      ))}
    </div>
  );
};
