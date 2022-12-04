import styles from "./Restaurant.module.css";

const RestaurantMenu = (props) => {
  return (
    <div className={styles["restaurant-menu"]}>
      <ul>{props.children}</ul>
    </div>
  );
};
export default RestaurantMenu;
