import React, { useEffect, useState } from "react";
import cogoToast from "cogo-toast";

import "./styles.css";
import Spinner from "../spinner/Spinner";
import { useNavigate } from "react-router-dom";

const DesignMakerComponent = ({ productId = 438 }) => {
  const navigate = useNavigate();
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
        onTemplateSaved: () => {
          cogoToast.success("Template saved!");
          navigate(`/product/${productId}`);
        },
      });

      window.designMaker = designMaker;

      // setDesignMaker(newDesignMaker);

      // You can call any design maker methods here, if needed
      console.log("Design Maker initialized", designMaker);
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

  useEffect(() => {
    getNonce();
  }, []);

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        {isLoading && <Spinner />}
      </div>

      {/* Design Maker Container */}
      <div id="edm"></div>

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
