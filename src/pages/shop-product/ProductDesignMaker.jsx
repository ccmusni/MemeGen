import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useLocation } from "react-router-dom";

import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import MemeList from "../../components/memes/MemeList";
import MemeEditor from "../../components/memes/MemeEditor";
import DesignMakerComponent from "../../components/printful-design-marker/DesignMakerComponent";

import { fetchProducts } from "../../store/actions/product-actions";
import { setSelectedMeme } from "../../store/slices/meme-slice";
import { resetTextNode } from "../../store/slices/editor-slice";

const ProductDesignMaker = () => {
  const dispatch = useDispatch();
  let { pathname } = useLocation();
  let { id } = useParams();
  const { products } = useSelector((state) => state.product);
  const product = products?.find((product) => product.id === +id);
  const { selectedMeme } = useSelector((state) => state.meme);
  const [isEditingMeme, setIsEditingMeme] = useState(false);

  useEffect(() => {
    dispatch(setSelectedMeme(null));
    dispatch(resetTextNode());
    setIsEditingMeme(false);

    if (!products?.length) {
      dispatch(fetchProducts({}));
    }
  }, []);

  return (
    <Fragment>
      <SEO
        titleTemplate="Product Page"
        description="Product Page of flone react minimalist eCommerce template."
      />

      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb
          pages={[
            { label: "Home", path: process.env.PUBLIC_URL + "/" },
            { label: "Shop Product", path: process.env.PUBLIC_URL + pathname },
          ]}
        />

        <div className="product-designer-area pt-25 pb-100">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                {product && (
                  <>
                    {selectedMeme ? (
                      isEditingMeme ? (
                        <MemeEditor
                          onApplyMeme={() => setIsEditingMeme(false)}
                        />
                      ) : (
                        <div style={{ textAlign: "right" }}>
                          <DesignMakerComponent
                            productId={id}
                            meme={selectedMeme}
                          />
                        </div>
                      )
                    ) : (
                      <MemeList
                        onEditMeme={(item) => {
                          dispatch(setSelectedMeme(item));
                          setIsEditingMeme(true);
                        }}
                      />
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

export default ProductDesignMaker;
