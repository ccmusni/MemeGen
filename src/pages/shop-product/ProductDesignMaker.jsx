import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useLocation } from "react-router-dom";
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import { fetchProducts } from "../../store/actions/product-actions";
import DesignMakerComponent from "../../components/printful-design-marker/DesignMakerComponent";

const ProductDesignMaker = () => {
  const dispatch = useDispatch();
  let { pathname } = useLocation();
  let { id } = useParams();
  const { products } = useSelector((state) => state.product);
  const product = products?.find((product) => product.id === +id);

  useEffect(() => {
    if (!products?.length) {
      dispatch(fetchProducts({}));
    }
  }, []);

  return (
    <Fragment>
      <SEO
        titleTemplate="Product Page"
        description="Product Page of flone react minimalist eCommerce template."
      />

      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb
          pages={[
            { label: "Home", path: process.env.PUBLIC_URL + "/" },
            { label: "Shop Product", path: process.env.PUBLIC_URL + pathname },
          ]}
        />

        <div className="product-designer-area pt-25 pb-100">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                {product && (
                  <div style={{ textAlign: "right" }}>
                    <DesignMakerComponent productId={id} />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

export default ProductDesignMaker;
