import PropTypes from "prop-types";
import clsx from "clsx";
import SubCategoriesGridList from "./SubCategoriesGridList";

const SubCategories = ({ categories, layout }) => {
  return (
    <div className="shop-bottom-area mt-35">
      <div className={clsx("row", layout)}>
        <SubCategoriesGridList
          categories={categories}
          spaceBottomClass="mb-25"
        />
      </div>
    </div>
  );
};

SubCategories.propTypes = {
  layout: PropTypes.string,
  products: PropTypes.array,
};

export default SubCategories;
