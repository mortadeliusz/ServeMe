import "./styles.css";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { useState } from "react";
import { loader as myOrdersLoader } from "./components/MyOrders/myOrders";
import { loader as restaurantsLoader } from "./components/Restaurants/restaurants";
import { loader as restaurantDataLoader } from "./components/Restaurant/restaurant";
import NavBar from "./components/NavBar/NavBar";
import Hero from "./components/Hero/hero";
import Restaurants from "./components/Restaurants/restaurants";
import MyOrders from "./components/MyOrders/myOrders";
import ErrorElement from "./components/errorRoute/errorElement";
import Restaurant from "./components/Restaurant/restaurant";

export default function App() {
  console.log("rendering App");

  const [user, setUser] = useState(restoreUser());

  const routes = [
    {
      path: "/",
      id: "rootRoute",
      element: (
        <>
          <NavBar />
          <div style={{ padding: "5px 25px" }}>
            <Outlet />
          </div>
        </>
      ),
      loader: () => {
        return {
          user: user,
          logInHandler: logInHandler,
          logOutHandler: logOutHandler
        };
      },
      children: [
        {
          path: "/",
          element: <Hero />
        },
        {
          path: "/restaurants",
          id: "restaurant",
          element: <Restaurants />,
          loader: restaurantsLoader
        },
        {
          path: "/restaurants/:rid/*",
          element: <Restaurant />,
          loader: ({ params }) => restaurantDataLoader(params.rid, params["*"])
        },
        {
          path: "/myorders",
          element: <MyOrders />,
          loader: () => myOrdersLoader(user)
        }
      ],
      errorElement: (
        <>
          <NavBar />
          <ErrorElement />
        </>
      )
    }
  ];
  const mainRouter = createBrowserRouter(routes);

  return (
    <div className="App">
      <RouterProvider router={mainRouter} />
    </div>
  );

  function logInHandler(user) {
    setUser(user);
    window.localStorage.setItem("user", JSON.stringify(user));
  }
  function logOutHandler() {
    setUser(null);
    window.localStorage.removeItem("user");
  }

  function restoreUser() {
    // for now it's from local storage but it's open for redisgning
    return JSON.parse(window.localStorage.getItem("user"));
  }
}
