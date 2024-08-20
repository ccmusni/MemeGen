import PropTypes from "prop-types";
import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import SubCategoriesGridListSingle from "./SubCategoriesGridListSingle";

const SubCategoriesGridList = ({ categories, spaceBottomClass }) => {
  const currency = useSelector((state) => state.currency);
  const { cartItems } = useSelector((state) => state.cart);
  const { wishlistItems } = useSelector((state) => state.wishlist);
  const { compareItems } = useSelector((state) => state.compare);

  return (
    <Fragment>
      {categories?.slice(0, 12)?.map((category) => {
        return (
          <div className="col-xl-1 col-sm-1" key={category.id}>
            <SubCategoriesGridListSingle
              spaceBottomClass={spaceBottomClass}
              category={category}
              currency={currency}
              cartItem={cartItems.find(
                (cartItem) => cartItem.id === category.id
              )}
              wishlistItem={wishlistItems.find(
                (wishlistItem) => wishlistItem.id === category.id
              )}
              compareItem={compareItems.find(
                (compareItem) => compareItem.id === category.id
              )}
            />
          </div>
        );
      })}
    </Fragment>
  );
};

SubCategoriesGridList.propTypes = {
  categories: PropTypes.array,
  spaceBottomClass: PropTypes.string,
};

export default SubCategoriesGridList;
