import { useCallback, useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import styles from "./styles.module.css";

import { moveTextNode, resizeTextNode } from "../../store/slices/editor-slice";

import MemeSidebar from "./MemeSidebar";
import TextNodeViewer from "../text-node/TextNodeViewer";

export default function MemeEditor({ onApplyMeme }) {
  const dispatch = useDispatch();
  const { textNodes } = useSelector((state) => state.editor);
  const { selectedMeme: meme } = useSelector((state) => state.meme);
  const [resizingSettings, setResizingSettings] = useState();
  const [movingSettings, setMovingSettings] = useState();
  const imageRef = useRef();

  const handleTextNodeResize = useCallback(
    (event) => {
      const element = event.target;

      if (!resizingSettings || !element.id) {
        return;
      }

      const horizontalChange = resizingSettings?.startX - event.clientX;
      const verticalChange = resizingSettings?.startY - event.clientY;

      setResizingSettings({
        ...resizingSettings,
        ...(resizingSettings.handle === "right" && { width: horizontalChange }),
        ...(resizingSettings.handle === "bottom" && { height: verticalChange }),
      });
    },
    [resizingSettings]
  );

  const handleTextNodeMove = useCallback(
    (event) => {
      const element = event.target;

      if (!movingSettings || !element.id) {
        return;
      }

      let horizontalChange = movingSettings?.startX - event.clientX;
      let verticalChange = movingSettings?.startY - event.clientY;

      setMovingSettings({
        ...movingSettings,
        x: horizontalChange,
        y: verticalChange,
      });
    },
    [movingSettings]
  );

  const handleMouseMove = useCallback(
    (event) => {
      handleTextNodeResize(event);
      handleTextNodeMove(event);
    },
    [handleTextNodeMove, handleTextNodeResize]
  );

  const handleMouseUp = useCallback(
    (event) => {
      if (resizingSettings) {
        dispatch(
          resizeTextNode({
            id: resizingSettings.nodeId,
            width: resizingSettings.width,
            height: resizingSettings.height,
          })
        );

        setResizingSettings(null);
      }

      if (movingSettings) {
        const element = event.target;

        dispatch(
          moveTextNode({
            id: movingSettings?.nodeId,
            x: element.offsetLeft,
            y: element.offsetTop,
          })
        );

        setMovingSettings(null);
      }
    },
    [movingSettings, resizingSettings]
  );

  const handleMouseDown = useCallback((event) => {
    const element = event.target;

    if (element.id.includes("resize-handle")) {
      const [, , handle, nodeId] = element.id.split("-");

      setResizingSettings({
        nodeId: nodeId,
        startX: event.clientX,
        startY: event.clientY,
        handle,
      });

      return;
    }

    if (element.id.includes("node-container")) {
      setMovingSettings({
        nodeId: element.id.split("node-container-")[1],
        startX: event.clientX,
        startY: event.clientY,
      });
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleMouseDown);

    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
    };
  }, [handleMouseDown]);

  useEffect(() => {
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [handleMouseUp]);

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, [handleMouseMove]);

  return (
    <div className={styles.editorContainer}>
      <MemeSidebar
        meme={meme}
        textNodes={textNodes}
        onApplyMeme={onApplyMeme}
      />

      <main className={styles.mainContent}>
        <div className={styles.imageContainer}>
          <img
            id="image"
            ref={imageRef}
            className={styles.memeContainer}
            src={meme.blank}
            alt={meme.name}
            draggable="false"
          />

          {textNodes?.map((node) => {
            return (
              <TextNodeViewer
                key={node.id}
                node={node}
                movingSettings={
                  node.id === movingSettings?.nodeId ? movingSettings : null
                }
                resizingSettings={
                  node.id === resizingSettings?.nodeId ? resizingSettings : null
                }
                containerRef={imageRef}
              />
            );
          })}
        </div>
      </main>
    </div>
  );
}
