import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useLocation } from "react-router-dom";
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import ProductImageDescription from "../../wrappers/product/ProductImageDescription";
import { fetchProducts } from "../../store/actions/product-actions";

const Product = () => {
  const dispatch = useDispatch();
  let { pathname } = useLocation();
  let { id } = useParams();
  const { products } = useSelector((state) => state.product);
  const product = products?.find((product) => product.id === +id);

  useEffect(() => {
    if (!products) {
      dispatch(fetchProducts({}));
    }
  }, [dispatch, products]);

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
        {product && (
          <ProductImageDescription
            spaceTopClass="pt-100"
            spaceBottomClass="pb-100"
            product={product}
          />
        )}
      </LayoutOne>
    </Fragment>
  );
};

export default Product;
