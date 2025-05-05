import HomeBrand from "../../sections/HomeBrand/HomeBrand";
import HomeCategory from "../../sections/HomeCategory/HomeCategory";
import Banner from "../../assets/images/banner_1.jpg"

import "./ProductAll.css"

const ProductAll = () => {
    return (
        <section className="productAll">
            <div className="banner_introduction" >
                <img src={Banner} alt="banner_product" />
            </div>
            <div className="container">

                <div className="row">

                    <div className="col-12">
                        <HomeCategory eachBanner={true} />
                    </div>

                    <div className="col-12">
                        <HomeBrand />
                    </div>
                </div>
            </div>


        </section>
    );
}

export default ProductAll;