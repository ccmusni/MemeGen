import PropTypes from "prop-types";
import { Fragment, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import clsx from "clsx";
import { addToCart } from "../../store/slices/cart-slice";
import { addToWishlist } from "../../store/slices/wishlist-slice";
import { addToCompare } from "../../store/slices/compare-slice";

const CategoryGridListSingle = ({
  category,
  currency,
  cartItem,
  wishlistItem,
  compareItem,
  spaceBottomClass,
}) => {
  const [modalShow, setModalShow] = useState(false);
  const dispatch = useDispatch();

  return (
    <Fragment>
      <div className={clsx("category-wrap", spaceBottomClass)}>
        <div className="category-img">
          <Link
            to={`${process.env.PUBLIC_URL}/category/${category.id}/products`}
          >
            <img className="default-img" src={category.image_url} alt="" />
          </Link>
          {category.discount || category.new ? (
            <div className="category-img-badges">
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
        <div className="category-content text-center">
          <h3>
            <Link
              to={`${process.env.PUBLIC_URL}/category/${category.id}/products`}
            >
              {category.title}
            </Link>
          </h3>
        </div>
      </div>
    </Fragment>
  );
};

CategoryGridListSingle.propTypes = {
  cartItem: PropTypes.shape({}),
  compareItem: PropTypes.shape({}),
  currency: PropTypes.shape({}),
  category: PropTypes.shape({}),
  spaceBottomClass: PropTypes.string,
  wishlistItem: PropTypes.shape({}),
};

export default CategoryGridListSingle;
