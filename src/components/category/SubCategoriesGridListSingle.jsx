import PropTypes from "prop-types";
import { Fragment, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import clsx from "clsx";
import { addToCart } from "../../store/slices/cart-slice";
import { addToWishlist } from "../../store/slices/wishlist-slice";

const SubCategoriesGridListSingle = ({
  category,
  currency,
  cartItem,
  wishlistItem,
  compareItem,
  spaceBottomClass,
}) => {
  const dispatch = useDispatch();

  return (
    <Fragment>
      <div className={clsx("subcategory-wrap", spaceBottomClass)}>
        <div className="subcategory-img">
          <Link
            to={`${process.env.PUBLIC_URL}/category/${category.id}/products`}
          >
            <img className="default-img" src={category.image_url} alt="" />
          </Link>
          {category.discount || category.new ? (
            <div className="subcategory-img-badges">
              {category.discount ? (
                <span className="pink">-{category.discount}%</span>
              ) : (
                ""
              )}
              {category.new ? <span className="purple">New</span> : ""}
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="subcategory-content text-center">
          <h3>
            <Link
              to={`${process.env.PUBLIC_URL}/category/${category.id}/products`}
            >
              {category.name}
            </Link>
          </h3>
        </div>
      </div>
    </Fragment>
  );
};

SubCategoriesGridListSingle.propTypes = {
  cartItem: PropTypes.shape({}),
  compareItem: PropTypes.shape({}),
  currency: PropTypes.shape({}),
  category: PropTypes.shape({}),
  spaceBottomClass: PropTypes.string,
  wishlistItem: PropTypes.shape({}),
};

export default SubCategoriesGridListSingle;
