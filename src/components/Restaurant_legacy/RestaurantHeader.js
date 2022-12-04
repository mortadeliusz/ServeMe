import dummyRestaurantImage from "./images/dummy/pub.jpg";
import styles from "./Restaurant.module.css";
import Card from "../UI/Card/Card";
import FreepikImage from "../UI/FreepikImage/FreepikImage";

const RestaurantHeader = (props) => {
  return (
    <Card className={styles["restaurant-header"]}>
      {props.image ? (
        <img
          className={styles["restaurant-header__image"]}
          src={props.image}
          alt="restaurant"
          onClick={props.onClick}
        />
      ) : (
        <FreepikImage
          className={styles["restaurant-header__image"]}
          src={props.image || dummyRestaurantImage}
          alt="restaurant"
          attributionURL="https://www.freepik.com/free-vector/music-bar-pub-cartoon-empty-interior-with-illuminated-signboard_5467486.htm#query=bar&position=18&from_view=search"
        />
      )}
      <h2 className={styles["restaurant-header__name"]} onClick={props.onClick}>
        {props.name}
      </h2>
    </Card>
  );
};

export default RestaurantHeader;
