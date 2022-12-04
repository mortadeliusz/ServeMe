import { useLoaderData } from "react-router-dom";
import { getUserOrders } from "../../firebase/main/firebase";
import Card from "../../UI/Card/Card";
import classes from "./myOrders.module.css";

export default function MyOrders(props) {
  // const [orders, setOrders] = useState([]);
  const orders = useLoaderData();

  if (orders.length === 0) return <h3>No orders found.</h3>;
  return (
    <div className={classes.wrapper}>
      {orders.map((order) => (
        <Order order={order} key={order.id} />
      ))}
    </div>
  );
}
export function loader(user) {
  if (!user) return [];
  return getUserOrders(user.uid);
}

function Order({ order }) {
  return <Card>{order.id}</Card>;
}
