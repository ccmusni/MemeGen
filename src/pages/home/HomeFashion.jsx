import { Fragment } from "react";
import LayoutOne from "../../layouts/LayoutOne";
import CategoriesSection from "../../wrappers/category/CategoriesSection";

const HomeFashion = () => {
  return (
    <Fragment>
      <LayoutOne
        headerContainerClass="container-fluid"
        headerPaddingClass="header-padding-1"
      >
        <CategoriesSection spaceBottomClass="pb-60" />
      </LayoutOne>
    </Fragment>
  );
};

export default HomeFashion;
