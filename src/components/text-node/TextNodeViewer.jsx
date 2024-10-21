import { useRef, useMemo } from "react";
import classNames from "classnames";

import {
  FONT_SCALE,
  MAX_TEXT_NODE_HEIGHT,
  MAX_TEXT_NODE_WIDTH,
  MIN_TEXT_NODE_HEIGHT,
  MIN_TEXT_NODE_WIDTH,
} from "../../store/constants/text-node-constraints";
import { getNumberMinMax } from "../../utils/get-number-min-max";

import styles from "./TextNode.module.css";
import ResponsiveText from "./ResponsiveText";

export default function TextNodeViewer({
  node,
  movingSettings,
  resizingSettings,
  containerRef,
}) {
  const nodeRef = useRef();

  const nodePosition = useMemo(() => {
    let leftChange = movingSettings ? node.x - (movingSettings.x || 0) : node.x;
    let topChange = movingSettings ? node.y - (movingSettings.y || 0) : node.y;

    const left = getNumberMinMax({
      value: leftChange,
      min: 0,
      max:
        containerRef?.current?.clientWidth -
        (nodeRef.current?.offsetWidth || 0),
    });
    const top = getNumberMinMax({
      value: topChange,
      min: 0,
      max:
        containerRef?.current?.clientHeight ??
        0 - (nodeRef.current?.offsetHeight || 0),
    });

    return {
      left: `${left}px`,
      top: `${top}px`,
    };
  }, [containerRef, movingSettings, node.x, node.y]);

  const nodeDimensions = useMemo(() => {
    const widthChange = resizingSettings
      ? node.width - (resizingSettings.width || 0)
      : node.width;
    const heightChange = resizingSettings
      ? node.height - (resizingSettings.height || 0)
      : node.height;

    const width = getNumberMinMax({
      value: widthChange,
      min: MIN_TEXT_NODE_WIDTH,
      max: MAX_TEXT_NODE_WIDTH - (nodeRef.current?.offsetLeft || 0),
    });
    const height = getNumberMinMax({
      value: heightChange,
      min: MIN_TEXT_NODE_HEIGHT,
      max: MAX_TEXT_NODE_HEIGHT,
    });

    return {
      width: `${width}px`,
      height: `${height}px`,
    };
  }, [containerRef, node.width, node.height, resizingSettings]);

  const calculateFontSize = () => {
    const fontSize = resizingSettings
      ? (node.width - (resizingSettings?.width || 0)) * FONT_SCALE
      : node.fontSize;

    return `${fontSize}px`;
  };

  return (
    <div
      ref={nodeRef}
      id={`node-container-${node.id}`}
      className={styles.textNodeViewer}
      style={{
        whiteSpace: "nowrap",
        color: node.color,
        fontSize: calculateFontSize(),
        ...nodePosition,
        ...nodeDimensions,
      }}
    >
      <ResponsiveText
        containerRef={nodeRef}
        fontSize={calculateFontSize()}
        customClassName={styles.textNodeViewerValue}
        text={node.value}
      />

      <div
        id={`resize-handle-right-${node.id}`}
        className={classNames(styles.resizeHandle, styles.resizeHandleRight)}
      ></div>
      <div
        id={`resize-handle-bottom-${node.id}`}
        className={classNames(styles.resizeHandle, styles.resizeHandleBottom)}
      ></div>
    </div>
  );
}
