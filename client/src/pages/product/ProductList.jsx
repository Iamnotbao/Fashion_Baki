import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import "./ProductList.css";
import Product from "../../components/Product/Product";
import SideBar from "../../components/SideBar/SideBar";
import Paging from "../../components/Paging/Paging";
import { getProductBySubByPage } from "../../services/productServices";

const ProductList = () => {
  const [totalPage, setTotalPage] = useState(0);
  const [products, setProducts] = useState([]);
  const [brand, setBrand] = useState([]);
  const [cat, setCat] = useState([]);
  const [selectedSubCat, setSelectedSubCat] = useState(null);
  const [brandID, setBrandID] = useState({});
  const navigation = useNavigate();
  const url = import.meta.env.VITE_API_URL;
  const [search, setSearch] = useState("");
  const location = useLocation();
  const { id } = location.state?.id ? location.state : 1;
  const { subId } = location.state?.subId ? location.state : {};
  const { categoryName } = useParams();
  const [type, setType] = useState("category");


  const handleBuy = (id) => {
    navigation("/product/" + id);
  };
 const handleToList = (categoryID, categoryName) => {
        navigation(`/product/all/${categoryName}`, { state: { id: categoryID } });
    }
  useEffect(() => {
    if (subId) {
      fetchSubPro(subId);
      fetchCategory().then(() => {
      const subCat = cat.find(c => c.id === subId);
      setSelectedSubCat(subCat || { id: subId });
      });
    } else {
      fetchData();
      setSelectedSubCat(null);
    }
  }, [subId, id]);

  const handleSearch = (event) => {
    event.preventDefault();
    const filteredProduct = products.filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase())
    );
    if (filteredProduct.length > 0) {
      setProducts(filteredProduct);
    } else {
      fetchData();
    }
  };

  const handleCategoryClick = (subcategory,catID) => {
    setSelectedSubCat(subcategory);
    console.log(catID);
    
    navigation(`/product/all/${categoryName}?collection=${encodeURIComponent(subcategory.name)}`,
      { state: { subId: subcategory.id, id: catID } }
    );
    fetchSubPro(subcategory.id);

  };

  const fetchSubPro = async (ID) => {
    try {
      const res = await getProductBySubByPage(ID, 0, 8);
      setProducts(res.content);
      setTotalPage(res.totalPages);
      setType("subcategory");
    } catch (error) {
      console.log(error);
    }
  };

  const fetchBrand = async (id) => {
    try {
      const response = await axios.get(`${url}/service/products/brand/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
     
      setSelectedSubCat({});
      setProducts(response.data.content);
      setTotalPage(response.data.totalPages);
      setType("brand");
      setBrandID(id);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(`${url}/service/products/category/${id}?page=0&size=8`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setTotalPage(response.data.totalPages);
      setType("category");
      setProducts(response.data.content);
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = (event) => {
    setSearch(event.target.value);
  };

  const fetchCategory = async () => {
    try {
      const res = await axios.get(`${url}/service/subcategories/category/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const normalizedData = Array.isArray(res.data) ? res.data : [res.data];
      setCat(normalizedData);
      return normalizedData;
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  useEffect(() => {
    const fetchAllBrand = async () => {
      try {
        const catResponse = await axios.get(`${url}/service/brands`);
        setBrand(catResponse.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCategory();
    fetchAllBrand();
    fetchData();
  }, [id]);

  return (
    <>
      <section className="product-list" style={{ marginTop: "50px", marginBottom: "100px" }}>
        <h1 className="text-center" style={{ marginBottom: "50px" }}>
          All Products Of {categoryName}
        </h1>
        <div className="search">
          <div className="search-search__box">
            <label htmlFor="" className="search-search__field">
              <input
                value={search}
                onChange={handleInputChange}
                type="text"
                className="search-search__input"
                placeholder="Find your product..."
              />
              <Link to="" className="search-search__button" onClick={handleSearch}>
                <i className="fa-solid fa-magnifying-glass"></i>
              </Link>
            </label>
          </div>
        </div>
        <div className="category__content" style={{ margin: "0", padding: "10px 0px", width: "100%" }}>
          <div className="category__title" onClick={fetchData}>
            <Link
              style={{
                cursor: "pointer",
                fontSize: "20px",
                textTransform: "uppercase",
                textDecoration: "none",
                fontWeight: "bold",
                color: "black",
              }}
            >
              Thời Trang Nam(<span>{products.length}</span>)
            </Link>
          </div>
          <div className="category__action">
            <div>
              <button>Hide Sort</button>
              <span>
                <i className="fa-solid fa-arrow-down-wide-short"></i>
              </span>
            </div>
            <div className="sort">
              Sort By
              <ul className="sort__actions">
                <li>
                  <Link to="">Featured</Link>
                </li>
                <li>
                  <Link to="">Newest</Link>
                </li>
                <li>
                  <Link to="">Price: High-Low</Link>
                </li>
                <li>
                  <Link to="">Price: Low-High</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="container-fluid">
          <div className="row">
            <SideBar
              cat={cat}
              brand={brand}
              fetchBrand={fetchBrand}
              handleCategoryClick={handleCategoryClick}
              selectedSubCat={selectedSubCat}
              categoryName={categoryName}
              catID={selectedSubCat?selectedSubCat.categoryId:id}
              handleToList={handleToList}
            />
            <div className="col-md-10">
              <div className="row">
                {products.map((item, colIndex) => (
                  <div key={colIndex} className="col-md-3" id={item.id} onClick={() => handleBuy(item.id)}>
                    <Product item={item} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        {totalPage > 0 && <Paging totalPage={totalPage} setProduct={setProducts} id={id} type={type} subId={subId} brandID={brandID}/>}
      </section>
    </>
  );
};
export default ProductList;