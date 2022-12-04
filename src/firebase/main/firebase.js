import { initializeApp } from "firebase/app";
import firebaseConfig from "./config.json";
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  addDoc,
  query,
  getDocs,
  getDoc,
  where,
  onSnapshot
} from "firebase/firestore";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { useState, useEffect } from "react";

console.log("initializing firebase...");
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default {
  getRestaurantWithItems: getRestaurantWithItems,
  getAllRestaurants: getAllRestaurants,
  addMenuItem: addMenuItem,
  createOrder: createOrder
};

export async function getRestaurantWithItems(restaurantID) {
  var output;

  const docRef = doc(db, "restaurants", restaurantID);
  const restaurantDocSnap = await getDoc(docRef);
  if (!restaurantDocSnap.exists()) return null;

  output = {
    id: restaurantDocSnap.id,
    ...restaurantDocSnap.data(),
    menuItems: []
  };

  const itemsQuery = query(
    collection(db, `restaurants/${restaurantDocSnap.id}/menuItems`)
  );

  const querySnapshot = await getDocs(itemsQuery);

  querySnapshot.forEach((doc) =>
    output.menuItems.push({ ...doc.data(), id: doc.id })
  );
  return output;
}

export async function getAllRestaurants() {
  const output = [];

  const restaurantsSnapshot = await getDocs(
    query(collection(db, "restaurants"))
  );

  restaurantsSnapshot.forEach((doc) =>
    output.push({ ...doc.data(), id: doc.id })
  );
  return output;
}

export async function addMenuItem(restaurantID, item) {
  const restaurantMenuItemsRef = collection(
    db,
    `restaurants/${restaurantID}/menuItems`
  );
  await setDoc(doc(restaurantMenuItemsRef), { ...item, created: new Date() });
}

export async function createOrder(order) {
  const ordersRefRef = collection(db, `orders`);
  const docRef = await addDoc(ordersRefRef, {
    ...order,
    created: new Date()
  });
  return docRef.id;
}

export async function getUserOrders(uid) {
  const output = [];

  const ordersSnapshot = await getDocs(
    query(collection(db, "orders"), where("uid", "==", uid))
  );

  ordersSnapshot.forEach((doc) => output.push({ ...doc.data(), id: doc.id }));
  return output;
}

export function OrdersObserver(props) {
  const ordersQuery = query(collection(props.db, `orders`));
  const [snapshot, loading, error] = useCollection(ordersQuery);
  const orders = [];
  snapshot?.forEach((doc) => orders.push({ ...doc.data(), id: doc.id }));
  return (
    <div>
      {loading && <span>Collection: Loading...</span>}
      {snapshot && orders.map((el) => <p key={el.id}>{el.id}</p>)}
    </div>
  );
}

export function ObserverNoHook(props) {
  console.log("rendering observer with no hook");
  const ordersQuery = query(collection(props.db, `orders`));
  const [orders, setOrders] = useState([]);
  console.log(orders);
  useEffect(() => {
    const unsubscribe = onSnapshot(ordersQuery, (querySnapshot) => {
      const tempOrders = [];
      querySnapshot.forEach((doc) => {
        tempOrders.push(doc.id);
      });
      setOrders([...tempOrders]);
    });
    return unsubscribe;
  }, []);

  return orders.map((el) => <h1 key={"nohook" + el}>{el}</h1>);
}

export async function googleAuth() {
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const authData = signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      // const credential = GoogleAuthProvider.credentialFromResult(result);
      // const token = credential.accessToken;

      // The signed-in user info.

      const { uid, displayName, photoURL } = result.user;
      const user = { uid: uid, displayName: displayName, photoURL: photoURL };
      // ...
      return user;
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
      console.log(errorCode, errorMessage);
    });

  return authData;
}
