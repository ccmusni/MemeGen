import { Suspense, lazy } from "react";
import ScrollToTop from "./helpers/scroll-top";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeFashion from "./pages/home/HomeFashion";
import ShopGridNoSidebar from "./pages/shop/ShopGridNoSidebar";
import ProductsByCategory from "./pages/shop/ProductsByCategory";
import Product from "./pages/shop-product/Product";
import ProductDesignMaker from "./pages/shop-product/ProductDesignMaker";
import Cart from "./pages/other/Cart";
import Checkout from "./pages/other/Checkout";

const App = () => {
  return (
    <Router>
      <ScrollToTop>
        <Suspense
          fallback={
            <div className="flone-preloader-wrapper">
              <div className="flone-preloader">
                <span></span>
                <span></span>
              </div>
            </div>
          }
        >
          <Routes>
            <Route
              path={process.env.PUBLIC_URL + "/"}
              element={<HomeFashion />}
            />

            {/* Homepages */}
            <Route
              path={process.env.PUBLIC_URL + "/home"}
              element={<HomeFashion />}
            />

            {/* Shop pages */}
            <Route
              path={process.env.PUBLIC_URL + "/shop-products"}
              element={<ShopGridNoSidebar />}
            />

            <Route
              path={process.env.PUBLIC_URL + "/category/:id/products"}
              element={<ProductsByCategory />}
            />

            <Route
              path={process.env.PUBLIC_URL + "/product/:id"}
              element={<Product />}
            />

            <Route
              path={process.env.PUBLIC_URL + "/product/:id/design-maker"}
              element={<ProductDesignMaker />}
            />

            <Route path={process.env.PUBLIC_URL + "/cart"} element={<Cart />} />

            <Route
              path={process.env.PUBLIC_URL + "/checkout"}
              element={<Checkout />}
            />

            {/* Shop product pages */}
            {/* <Route
              path={process.env.PUBLIC_URL + "/product/:id"}
              element={<Product />}
            />
            <Route
              path={process.env.PUBLIC_URL + "/product-tab-left/:id"}
              element={<ProductTabLeft />}
            />
            <Route
              path={process.env.PUBLIC_URL + "/product-tab-right/:id"}
              element={<ProductTabRight />}
            />
            <Route
              path={process.env.PUBLIC_URL + "/product-sticky/:id"}
              element={<ProductSticky />}
            />
            <Route
              path={process.env.PUBLIC_URL + "/product-slider/:id"}
              element={<ProductSlider />}
            />
            <Route
              path={process.env.PUBLIC_URL + "/product-fixed-image/:id"}
              element={<ProductFixedImage />}
            /> */}

            {/* Blog pages */}
            {/* <Route
              path={process.env.PUBLIC_URL + "/blog-standard"}
              element={<BlogStandard />}
            />
            <Route
              path={process.env.PUBLIC_URL + "/blog-no-sidebar"}
              element={<BlogNoSidebar />}
            />
            <Route
              path={process.env.PUBLIC_URL + "/blog-right-sidebar"}
              element={<BlogRightSidebar />}
            />
            <Route
              path={process.env.PUBLIC_URL + "/blog-details-standard"}
              element={<BlogDetailsStandard />}
            /> */}

            {/* Other pages */}
            {/* <Route
              path={process.env.PUBLIC_URL + "/about"}
              element={<About />}
            />
            <Route
              path={process.env.PUBLIC_URL + "/contact"}
              element={<Contact />}
            />
            <Route
              path={process.env.PUBLIC_URL + "/my-account"}
              element={<MyAccount />}
            />
            <Route
              path={process.env.PUBLIC_URL + "/login-register"}
              element={<LoginRegister />}
            />

            <Route path={process.env.PUBLIC_URL + "/cart"} element={<Cart />} />
            <Route
              path={process.env.PUBLIC_URL + "/wishlist"}
              element={<Wishlist />}
            />
            <Route
              path={process.env.PUBLIC_URL + "/compare"}
              element={<Compare />}
            />
            <Route
              path={process.env.PUBLIC_URL + "/checkout"}
              element={<Checkout />}
            />

            <Route path="*" element={<NotFound />} /> */}
          </Routes>
        </Suspense>
      </ScrollToTop>
    </Router>
  );
};

export default App;
