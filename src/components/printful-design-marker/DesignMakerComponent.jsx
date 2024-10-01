import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./styles.css";

const DesignMakerComponent = () => {
  const location = useLocation();
  const productId = +(location.pathname.split("/")[2] ?? 438);

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
      });

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
      <div id="edm"></div>
    </div>
  );
};

export default DesignMakerComponent;
