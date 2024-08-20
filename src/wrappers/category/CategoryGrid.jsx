import { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import CategoryGridListSingle from "../../components/category/CategoryGridListSingle";
import { fetchCategories } from "../../store/actions/category-actions";
import Spinner from "../../components/spinner/Spinner";

const CategoryGrid = ({ spaceBottomClass }) => {
  const dispatch = useDispatch();
  const { categories, status } = useSelector((state) => state.category);
  const currency = useSelector((state) => state.currency);
  const { cartItems } = useSelector((state) => state.cart);
  const { wishlistItems } = useSelector((state) => state.wishlist);
  const { compareItems } = useSelector((state) => state.compare);

  useEffect(() => {
    if (!categories?.length) {
      dispatch(fetchCategories());
    }
  }, [dispatch, categories]);

  return (
    <Fragment>
      {status === "pending" ? (
        <div style={{ display: "flex", placeContent: "center" }}>
          <Spinner />
        </div>
      ) : (
        !!categories?.length &&
        categories?.map((category) => {
          return (
            <div
              className="col-xl-3 col-md-6 col-lg-4 col-sm-6"
              key={category.id}
            >
              <CategoryGridListSingle
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
        })
      )}
    </Fragment>
  );
};

CategoryGrid.propTypes = {
  spaceBottomClass: PropTypes.string,
  category: PropTypes.string,
  type: PropTypes.string,
  limit: PropTypes.number,
};

export default CategoryGrid;
