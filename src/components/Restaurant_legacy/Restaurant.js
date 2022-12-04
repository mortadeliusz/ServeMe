import RestaurantHeader from "./RestaurantHeader";
import classes from "./Restaurant.module.css";
import RestaurantMenu from "./RestaurantMenu";
import RestaurantMenuItem from "./RestaurantMenuItem";
import OrderConfirmation from "../Ordering/Confirmation/OrderConfirmation";
import { createOrder, getRestaurantData } from "../../firebase/main/firebase";
import { useState, useEffect } from "react";

const Restaurant = (props) => {
  const [data, setData] = useState({ restaurant: {}, menuItems: [] });
  const [showPreview, setShowPreview] = useState(false);
  let displayOrderIcon = data.menuItems.some((el) => el.qty > 0);

  const togglePreview = () => setShowPreview((prev) => !prev);
  const fetchDataFromDB = () => {
    props.firebase.getRestaurantData(props.restaurantId).then((resp) => {
      setData(resp);
      console.log("fetching restaurant data...");
    });
  };
  const updateOrder = (menuItem, amount) => {
    setData((prev) => {
      const result = { ...prev };
      const itemToUpdate = result.menuItems.find((el) => el.id === menuItem.id);

      itemToUpdate.qty = Math.max(amount, 0);
      return result;
    });
  };
  function confirmOrder() {
    if (data.menuItems.filter((el) => el.qty > 0).length === 0) return;
    createOrder(props.fb.db, {
      uid: props.uid,
      rid: data.restaurant.id,
      items: data.menuItems
        .filter((el) => el.qty > 0)
        .map((el) => ({
          id: el.id,
          name: el.name,
          cat: el.category,
          price: el.price,
          qty: el.qty
        }))
    }).then((resp) => {
      alert("The order was successfully created.");
      setData((prev) => {
        const result = { ...prev };
        result.menuItems.forEach((el) => (el.qty = 0));
        return result;
      });
    });
  }

  useEffect(fetchDataFromDB, [props]);

  console.log("rendering restaurant", "(Resturant.js module)");

  return (
    <div className={classes.restaurant}>
      <RestaurantHeader
        name={data.restaurant.name}
        image={data.restaurant.image}
      />
      <RestaurantMenu>
        {data.menuItems.map((item) => (
          <li key={item.id}>
            <RestaurantMenuItem
              item={item}
              currency={data.restaurant.currencySymbol || "coins"}
              updateOrder={(amount) => {
                updateOrder(item, amount);
              }}
            />
          </li>
        ))}
      </RestaurantMenu>
      {showPreview && (
        <OrderConfirmation
          toggle={togglePreview}
          orderDraft={{
            restaurant: data.restaurant,
            menuItems: data.menuItems.filter((el) => el.qty > 0)
          }}
          confirm={confirmOrder}
        />
      )}
      {displayOrderIcon && (
        <div className={classes["restaurant--order-bell"]}>
          <span
            className="material-icons-two-tone md-50"
            onClick={togglePreview}
          >
            room_service
          </span>
        </div>
      )}
    </div>
  );
};
export default Restaurant;
