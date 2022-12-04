import { useState } from "react";
import styles from "./Restaurant.module.css";
import Card from "../UI/Card/Card";
import dummyBeerImage from "./images/dummy/beer.jpg";
import NumberPicker from "../UI/NumberPicker/NumberPicker";
import FreepikImage from "../UI/FreepikImage/FreepikImage";

const RestaurantMenuItem = (props) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const totalValue = (props.item.qty || 0) * props.item.price;

  function toggleExpansion() {
    setIsExpanded((prev) => !prev);
  }

  const itemImageElement = (
    <div className={styles["restaurant-menu-item__image-container"]}>
      {props.item.image ? (
        <img src={props.item.image} alt="item" />
      ) : (
        <FreepikImage
          src={dummyBeerImage}
          alt="item"
          attributionURL="https://www.freepik.com/free-psd/beer-bottle-with-label-mockup_23967827.htm#page=4&query=beer%20bottle&position=17&from_view=keyword"
        />
      )}
    </div>
  );
  const displayedValue = props.item.qty || 0;

  return (
    <Card
      className={styles["restaurant-menu-item"]}
      onClickHandler={toggleExpansion}
    >
      <div className={styles["restaurant-menu-item__main"]}>
        <h3 className={styles["restaurant-menu-item__name"]}>
          {props.item.name}
        </h3>
        <h2 className={styles["restaurant-menu-item__price"]}>
          {props.item.price} {props.currency}
        </h2>
      </div>
      {isExpanded && (
        <div className={styles["restaurant-menu-item__extra"]}>
          {itemImageElement}
          <p>{props.item.description}</p>
        </div>
      )}
      <div className={styles["restaurant-menu-item__footer"]}>
        <NumberPicker
          onPlusHandler={() => props.updateOrder(displayedValue + 1)}
          onMinusHandler={() => {
            if (displayedValue === 0) return;
            props.updateOrder(Math.max(displayedValue - 1, 0));
          }}
          value={displayedValue}
        />
        <h3>
          Total: {totalValue} {props.currency}
        </h3>
      </div>
    </Card>
  );
};

export default RestaurantMenuItem;
