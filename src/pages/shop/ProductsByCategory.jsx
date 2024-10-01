import { Fragment, useState, useEffect } from "react";
import Paginator from "react-hooks-paginator";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { getSortedProducts } from "../../helpers/product";
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import ShopProducts from "../../wrappers/product/ShopProducts";
import { fetchProducts } from "../../store/actions/product-actions";
import SubCategories from "../../components/category/SubCategories";
import DesignMakerComponent from "../../components/printful-design-marker/DesignMakerComponent";

const ProductsByCategory = () => {
  const dispatch = useDispatch();
  let { id } = useParams();
  const [layout, setLayout] = useState("grid three-column");
  const sortType = "";
  const sortValue = "";
  const [filterSortType, setFilterSortType] = useState("");
  const [filterSortValue, setFilterSortValue] = useState("");
  const [offset, setOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentData, setCurrentData] = useState([]);
  const [sortedProducts, setSortedProducts] = useState([]);
  const { categories } = useSelector((state) => state.category);
  const { products, status } = useSelector((state) => state.product);

  const pageLimit = 15;
  let { pathname } = useLocation();

  useEffect(() => {
    // if (!products) {
    dispatch(fetchProducts({ category_id: id }));
    // }
  }, [dispatch, id]);

  useEffect(() => {
    if (!!products?.length) {
      let sortedProducts = getSortedProducts(products, sortType, sortValue);
      const filterSortedProducts = getSortedProducts(
        sortedProducts,
        filterSortType,
        filterSortValue
      );
      sortedProducts = filterSortedProducts;
      setSortedProducts(sortedProducts);
      setCurrentData(sortedProducts.slice(offset, offset + pageLimit));
    }
  }, [offset, products, sortType, sortValue, filterSortType, filterSortValue]);

  return (
    <Fragment>
      <SEO
        titleTemplate="Shop Page"
        description="Shop page of flone react minimalist eCommerce template."
      />

      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb
          pages={[
            { label: "Categories", path: process.env.PUBLIC_URL + "/" },
            { label: "Products", path: process.env.PUBLIC_URL + pathname },
          ]}
        />

        <div className="shop-area pt-25 pb-100">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <SubCategories layout={layout} categories={categories} />
                <ShopProducts
                  layout={layout}
                  products={currentData}
                  loading={status === "pending"}
                />
              </div>
            </div>
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

export default ProductsByCategory;
