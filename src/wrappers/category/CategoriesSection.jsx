import PropTypes from "prop-types";
import clsx from "clsx";
import SectionTitle from "../../components/section-title/SectionTitle";
import CategoryGrid from "./CategoryGrid";
import { Row } from "react-bootstrap";

const CategoriesSection = ({
  spaceTopClass,
  spaceBottomClass,
  bgColorClass,
}) => {
  return (
    <div
      className={clsx(
        "product-area",
        spaceTopClass,
        spaceBottomClass,
        bgColorClass
      )}
    >
      <div className="container">
        <SectionTitle
          titleText="PRODUCT CATEGORIES"
          positionClass="text-center"
        />
        <Row className="pt-55">
          <CategoryGrid type="new" limit={8} spaceBottomClass="mb-25" />
        </Row>
      </div>
    </div>
  );
};

CategoriesSection.propTypes = {
  bgColorClass: PropTypes.string,
  category: PropTypes.string,
  spaceBottomClass: PropTypes.string,
  spaceTopClass: PropTypes.string,
};

export default CategoriesSection;
