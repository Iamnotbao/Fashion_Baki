
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import NotificationsIcon from '@mui/icons-material/Notifications';
import Logo from "../../assets/images/logo/logo.png";
import "../Header/Header.css";
import { useSelector } from "react-redux";
import useFetchCart from "../Cart/fetchCart";
import RemoveCart from "../Cart/removeCart";
import Logout from "../Logout/Logout";
import { createShipping } from "../../services/shippingServices";
import { checkStatus } from "../../services/paymentServices";

const Header = () => {

    const [category, setCategory] = useState([]);
    const [brand, setBrand] = useState([]);
    const [subCategory, setSubCategory] = useState([]);
    const navigation = useNavigate();
    const username = localStorage.getItem("username");
      const [open, setOpen] = useState(false);
    const [length, setLength] = useState(0);
    const { items, status, error } = useSelector((state) => state.cart);
    const fetchCart = useFetchCart();
    const [loading,setLoading] = useState(false);
    const {removeCart} = RemoveCart();
    const baseURL = import.meta.env.VITE_API_URL;
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const orderId = queryParams.get("orderId");
    const resultCode = queryParams.get("resultCode");
    console.log(items);
    
    useEffect(() => {
        const processShipping = async () => {
          if (orderId) {
            try {
                console.log("bebeb", orderId);
                const match = orderId.match(/^(\d+)MOMO/);
                checkStatusMomo(match[1]);
            } catch (error) {
                console.log(error);        
            }
          }
        };
        processShipping();
      }, [orderId]);
  const checkStatusMomo =async(id)=>{
    console.log("id",id);
    const response = await checkStatus(id);
    console.log(response);
    if(response && resultCode === "0"){
    console.log("after check",response);
    checkShippingStatus(id);
    }else{
        console.log("not yet payment");
    }
  }
  const checkShippingStatus = async (id) => {
    console.log("id", id);  
    const response = await createShipping(id);
    console.log("after shipping", response);
  }
    const handleBuy = (id) => {
        navigation("/product/" + id);
      };
      const handleClickOpen = () => {
        setOpen(!open);
      };
      const handleRemove =(id)=>{
        removeCart(id);
        setLoading(false);
        
      }
    useEffect(() => {
        fetchCart();
        setLoading(true)
    }, [loading]);
    useEffect(() => {
        if (loading&&items&&items.cartDetails) {
            setLength(items.cartDetails.length);
        }
    }, [items]);
    
    const handleUser = () => {  
        navigation("/user/info");

    }
    
    const handleOrder =()=>{
        navigation("/product/cart_detail");
    }
    const handleToList =(category)=>{
        navigation(`/product/all/${category.name}`,{state:{id:category.id}});
    }
    const handleToSub=(sub,category)=>{
        navigation(`/product/all/${category.name}?collection=${sub.name}`,{state:{subId:sub.id, id:category.id}});
    }
    useEffect(() => {
        const fetchData = async (type) => {
            try {
                const response = await axios.get(`${baseURL}/service/${type}`, {
                    headers: {
                        "Content-Type": "application/json"
                    }
                })

                switch (type) {
                    case "categories":
                        setCategory(response.data);
                        break;

                    case "brands":
                        setBrand(response.data);
                        break;
                    case "subcategories":
                        setSubCategory(response.data);
                        break;
                    default:
                        break;
                }


            } catch (error) {
                console.log(error);

            }
        }
        fetchData("categories");
        fetchData("subcategories");
        fetchData("brands");
    }, [])

    return (
        <header>
            <div className="header__inner">
                <div className="header__logo">
                    <Link to="/"><img src={Logo} width={70} height={70} style={{ borderRadius: "50%" }} alt="Logo" loading="lazy" /></Link>
                </div>
                <div className="header_nav">
                    <ul>
                        <li>
                            <Link to="/product/all">Clothes</Link>
                            <ul className="sub-menu">
                                <div className="container">
                                    <div className="row">
                                        <div className="col-md-3">
                                            <p>Theo Sản Phẩm</p>
                                            <ul>
                                                <li><Link to="/product/all">Tất cả</Link></li>
                                                <li><Link to="">Sản Phẩm Mới</Link></li>
                                                <li><Link to="">Sản Phẩm Bán Chạy</Link></li>
                                                <li><Link to="">Set Combo</Link></li>
                                            </ul>
                                        </div>

                                        {category && subCategory && category.map((c) => (
                                            
                                            <div className="col-md-3" key={c.id}>
                                                <p>{c.name}</p>
                                                <ul>
                                                <li onClick={()=>handleToList(c)}><Link>All {c.name}</Link></li>
                                                    {subCategory.filter((sub) => sub.categoryId === c.id)
                                                        .map((sub) => (
                                                            <li onClick={()=>handleToSub(sub,c)}><Link to="">{sub.name}</Link></li>
                                                        ))
                                                    }
                                                </ul>

                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </ul>
                        </li>
                        <li><Link to="">Daily Sport</Link></li>
                        <li><Link to="">Casual</Link></li>
                        <li><Link to="">Local Brand</Link>
                            <ul className="sub-menu" style={{ width: "180px" }}>
                                <div className="container">
                                    <div className="row" >
                                        <div className="col-md-12">
                                            <ul>{brand && brand.map((b) => (
                                                <li><Link to="/product/all">{b.name}</Link></li>
                                            ))}

                                            </ul>
                                        </div>
                                    </div>
                                </div></ul>
                        </li>
                        <li><Link to="">Contact</Link>
                            <ul className="sub-menu" style={{ width: "180px" }}>
                                <div className="container">
                                    <div className="row" >
                                        <div className="col-md-12">
                                            <ul>
                                                <li><Link to="/product/all">About US</Link></li>
                                                <li><Link to="">FAQ</Link></li>
                                                <li><Link to="">Event</Link></li>
                                                <li><Link to="">Promotion</Link></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div></ul>
                        </li>
                    </ul>
                </div>
                <div className="header__actions">
                    <div className="header-actions-search__box">
                        <label htmlFor="" className="header-actions-search__field">
                            <input type="text" className="header-actions-search__input" placeholder="Find product ..." />
                            <Link to="" className="header-actions-search__button">
                                <i class="fa-solid fa-magnifying-glass"></i>
                            </Link>
                        </label>
                    </div>
                    <div className="header-actions__button">
                        <Link onClick={handleUser} className="user">
                            <i class="fa-solid fa-user"></i></Link>
                        <ul style={{ width: "100px" }}>
                            <li  className="profile" onClick={() => navigation("/user/info")}><Link>{(username !== null) ? (username) : ("no-data")}</Link></li>
                            {(username !== null) ? (<li className="logout" style={{marginBottom:"0"}}  onClick={handleClickOpen}><Link>Log out</Link></li>) : (<li className="logout" style={{marginBottom:"0"}}><Link to={"/authentication/signIn"}>Log In</Link></li>)}

                        </ul>
                    </div>
                    <div className="header-actions__cart" >
                        <i class="fa-solid fa-cart-shopping"  onClick={handleOrder}>
                            <span>{length > 0 ? length : 0}</span>
                        </i>
                        <div className="header-actions-cart__popup">
                                <div className="header-actions-cart-popup__inner">
                                    <div className="header-actions-cart-popup__wrapper">
                                        <div className="header-actions-cart-popup__header">
                                            <span to="">{length > 0 ? length : 0} products</span>
                                            <Link to="/product/cart_detail">Watch All</Link>
                                        </div>
                                        {length > 0 ? (
                                            items.cartDetails?( items.cartDetails.map((item) => (
                                                <div className="mini-cart__item" key={item.id}>
                                                    <div className="mini-cart__item-thumbnail">
                                                        <img src={item.product.image} alt={item.name} loading="lazy" />
                                                    </div>
                                                    <div className="mini-cart__item-content">
                                                        <div className="mini-cart__item-remove" onClick={()=>handleRemove(item.id)} >
                                                            X
                                                        </div>
                                                        <div className="mini-cart__item-title">
                                                            <Link style={{color:"black"}} onClick={()=>handleBuy(item.product.id)}>{item.product.name}</Link>
                                                        </div>
                                                        <div className="mini-cart__item-appearances">   
                                                            <span>{item.color}</span><span> / </span><span>{item.size}</span>
                                                        </div>
                                                        <div className="mini-cart__item-variant-info">
                                                            {item.product.rating}<span><i class="fa-solid fa-star"></i></span>
                                                        </div>
                                                        <div className="mini-cart__item-price">
                                                                <span className="mini-cart__item-discount__price">{(item.product.price).toFixed(2)}$</span>
                                                                <del className="mini-cart__item-compare__price">{(item.product.price-(0.15*item.product.price)).toFixed(2)}$</del>
                                                        </div>
                                                        
                                                        <div className="mini-cart__item-quantity">
                                                            <span>x{item.quantity}</span>
                                                        </div>
                                                    </div>

                                                </div>


                                            ))):(<div>Loading...</div>)
                                           
                                        ) : (<div className="mini-cart__item">Loading...</div>)}
                                    </div>
                                </div>


                            </div>

                    </div>
                    <div className="header-actions__notification" >
                    <i class="fa-solid fa-bell"></i>
                        {/* <div className="header-actions-cart__popup">
                                <div className="header-actions-cart-popup__inner">
                                    <div className="header-actions-cart-popup__wrapper">
                                        <div className="header-actions-cart-popup__header">
                                            <span to="">{length > 0 ? length : 0} products</span>
                                            <Link to="/product/cart_detail">Watch All</Link>
                                        </div>
                                        {length > 0 ? (
                                            items.cartDetails?( items.cartDetails.map((item) => (
                                                <div className="mini-cart__item" key={item.id}>
                                                    <div className="mini-cart__item-thumbnail">
                                                        <img src={item.product.image} alt={item.name} loading="lazy" />
                                                    </div>
                                                    <div className="mini-cart__item-content">
                                                        <div className="mini-cart__item-remove" onClick={()=>handleRemove(item.id)} >
                                                            X
                                                        </div>
                                                        <div className="mini-cart__item-title">
                                                            <Link style={{color:"black"}} onClick={()=>handleBuy(item.product.id)}>{item.product.name}</Link>
                                                        </div>
                                                        <div className="mini-cart__item-appearances">   
                                                            <span>{item.color}</span><span> / </span><span>{item.size}</span>
                                                        </div>
                                                        <div className="mini-cart__item-variant-info">
                                                            {item.product.rating}<span><i class="fa-solid fa-star"></i></span>
                                                        </div>
                                                        <div className="mini-cart__item-price">
                                                                <span className="mini-cart__item-discount__price">{(item.product.price).toFixed(2)}$</span>
                                                                <del className="mini-cart__item-compare__price">{(item.product.price-(0.15*item.product.price)).toFixed(2)}$</del>
                                                        </div>
                                                        
                                                        <div className="mini-cart__item-quantity">
                                                            <span>x{item.quantity}</span>
                                                        </div>
                                                    </div>

                                                </div>


                                            ))):(<div>Loading...</div>)
                                           
                                        ) : (<div className="mini-cart__item">Loading...</div>)}
                                    </div>
                                </div>


                            </div> */}

                    </div>
                  
                </div>
            </div>
            {open&&<Logout open={open} handleClickOpen={handleClickOpen}/>}
        </header>

    )



}
export default Header;