import React, { useEffect, useState } from "react";
import cogoToast from "cogo-toast";

import "./styles.css";
import Spinner from "../spinner/Spinner";
import { useNavigate } from "react-router-dom";
import { fetchProductTemplate } from "../../store/actions/product-actions";
import { useDispatch, useSelector } from "react-redux";
import { setProductTemplate } from "../../store/slices/product-slice";
import axios from "axios";
import { addToCart } from "../../store/slices/cart-slice";

const DesignMakerComponent = ({ productId = 438 }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { productTemplate } = useSelector((state) => state.product);
  const [productTemplateId, setProductTemplateId] = useState();
  const [isLoading, setIsLoading] = useState(true);

  // Function to initialize PFDesignMaker
  const initializeDesignMaker = (nonce) => {
    if (window?.PFDesignMaker && !!nonce) {
      // Create a new instance of PFDesignMaker
      const designMaker = new window.PFDesignMaker({
        elemId: "edm",
        nonce,
        externalProductId: "some_id",
        initProduct: {
          productId,
        },
        applyImageFromUrl: process.env.REACT_APP_PRINTFUL_EXTERNAL_IMAGE_URL,
        onIframeLoaded: () => setIsLoading(false),
        onTemplateSaved: (templateId) => {
          setProductTemplateId(templateId);
        },
      });

      window.designMaker = designMaker;
    }
  };

  const getNonce = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_PRINTFUL_BASE_URL_NONCES}/embedded-designer/nonces`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer E3YTXw9uLSUvcAmHi4r77ek3YqoXUoBsdFFB02cY`, // notice the Bearer before your token
        },
        body: JSON.stringify({
          external_product_id: "some_id",
        }),
      }
    );

    if (!response.ok) {
      console.error(await response.text());
      return;
    }

    const newNonce = (await response.json())?.result?.nonce?.nonce;
    initializeDesignMaker(newNonce);
  };

  const getProductTemplate = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_PRINTFUL_BASE_URL}/product-templates/${productTemplateId}`
    );

    if (!response.ok) {
      console.error(await response.text());
      return;
    }

    const template = (await response.json())?.result;
    dispatch(setProductTemplate(template));
  };

  useEffect(() => {
    getNonce();
  }, []);

  useEffect(() => {
    if (productTemplateId) {
      setIsLoading(true);
      setTimeout(() => {
        getProductTemplate();
      }, 3500);
    }
  }, [productTemplateId]);

  useEffect(() => {
    if (productTemplate) {
      setIsLoading(false);

      dispatch(
        addToCart({
          ...productTemplate,
          id: productTemplate.product_id,
          image: [productTemplate.mockup_file_url],
          quantity: 1,
          price: 100,
          discount: 0,
        })
      );

      cogoToast.success("Design saved and added to cart.");
      navigate(`/cart`);
      dispatch(setProductTemplate(null));
    }
  }, [productTemplate]);

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        {isLoading && <Spinner />}
      </div>

      {/* Design Maker Container */}
      <div id="edm" style={{ display: isLoading ? "none" : "inherit" }}></div>

      {!isLoading && (
        <div className="product-designer-btn-container btn-hover">
          <button
            onClick={() => {
              if (window.designMaker) {
                window.designMaker.sendMessage({
                  event: "saveDesign",
                });
              }
            }}
          >
            Save
          </button>
        </div>
      )}
    </div>
  );
};

export default DesignMakerComponent;
