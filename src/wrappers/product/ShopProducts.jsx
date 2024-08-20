import PropTypes from "prop-types";
import clsx from "clsx";
import ProductgridList from "./ProductgridList";
import Spinner from "../../components/spinner/Spinner";

const ShopProducts = ({ products, layout, loading }) => {
  return (
    <div className="shop-bottom-area mt-35">
      <div className={clsx("row", layout)}>
        {loading ? (
          <div style={{ display: "flex", placeContent: "center" }}>
            <Spinner />
          </div>
        ) : (
          <ProductgridList products={products} spaceBottomClass="mb-25" />
        )}
      </div>
    </div>
  );
};

ShopProducts.propTypes = {
  layout: PropTypes.string,
  products: PropTypes.array,
};

export default ShopProducts;
