import { useDispatch } from "react-redux";
import { fetchCartThunk } from "../../stores/cart";

const useFetchCart = () => {
  const dispatch = useDispatch();
  const fetchCart = () => {
    dispatch(fetchCartThunk());
  };
  return fetchCart;
}
export default useFetchCart;