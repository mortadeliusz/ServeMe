const { useLoaderData } = require("react-router-dom");

const RestaurantsList = () => {
  const restaurants = useLoaderData();
  if (!restaurants) return <p>No restaurants found</p>;
  return restaurants.map((restaurant) => <p>{restaurant.name}</p>);
};

export default RestaurantsList;
