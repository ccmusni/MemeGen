import React, { useRef, useEffect } from "react";

const ResponsiveText = ({ containerRef, fontSize, text, customClassName }) => {
  const textRef = useRef();

  useEffect(() => {
    const adjustFontSize = () => {
      const container = containerRef.current;
      const textElement = textRef.current;

      if (container && textElement) {
        let containerWidth = container.offsetWidth;
        let textWidth = textElement.offsetWidth;
        let newFontSize = parseInt(container.style.fontSize);

        // Reduce font size until text fits within the container
        while (textWidth > containerWidth) {
          newFontSize -= 1;
          container.style.fontSize = `${newFontSize}px`;
          textWidth = textElement.offsetWidth;
        }
      }
    };

    adjustFontSize();
    window.addEventListener("resize", adjustFontSize);

    return () => {
      window.removeEventListener("resize", adjustFontSize);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, fontSize]);

  return (
    <span className={customClassName} ref={textRef}>
      {text}
    </span>
  );
};

export default ResponsiveText;
