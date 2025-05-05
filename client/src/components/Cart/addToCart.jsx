import { useDispatch } from "react-redux";
import { addCartItemThunk } from "../../stores/cart";

const AddToCart = () => {
    const dispatch = useDispatch();
    const addToCart = (productId,quantity,size,color) => {
        dispatch(addCartItemThunk({ productId, quantity,size,color }));
       
    };

    return addToCart;
};

export default AddToCart;