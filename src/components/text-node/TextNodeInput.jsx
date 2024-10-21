import { useDispatch } from "react-redux";

import {
  removeTextNode,
  updateTextNodes,
} from "../../store/slices/editor-slice";

import styles from "./TextNode.module.css";
import { MAX_TEXT_NODE_HEIGHT } from "../../store/constants/text-node-constraints";

export default function TextNodeInput({ node }) {
  const dispatch = useDispatch();

  const handleRemoveTextNode = (nodeId) => {
    dispatch(
      removeTextNode({
        id: nodeId,
      })
    );
  };

  return (
    <div className={styles.textNodeInputContainer}>
      <div className={styles.textNodeInputHeader}>
        <span>{node.title}</span>

        <button
          className={styles.buttonIcon}
          type="button"
          onClick={() => handleRemoveTextNode(node.id)}
        >
          {/* <IconTrash stroke={1.2} color="red" size={18} /> */}
          <i className="fa fa-trash" style={{ color: "#ef7474" }} />
        </button>
      </div>

      <input
        className={styles.textNodeInput}
        type="text"
        value={node.value}
        placeholder="Type something..."
        onChange={(e) => {
          dispatch(updateTextNodes({ ...node, value: e.target.value }));
        }}
      />

      <div className={styles.textNodeInputControls}>
        <div className={styles.labelledControl}>
          <label htmlFor="color" className={styles.srOnly}>
            Color
          </label>
          <input
            className={styles.colorInput}
            type="color"
            id="color"
            value={node.color}
            onChange={(e) => {
              dispatch(updateTextNodes({ ...node, color: e.target.value }));
            }}
          />
          <p>{node.color}</p>
        </div>

        <div className={styles.labelledControl}>
          <label htmlFor="fontSize" className={styles.srOnly}>
            Font size
          </label>
          <input
            name="fontSize"
            id="fontSize"
            type="number"
            value={node.fontSize}
            max={MAX_TEXT_NODE_HEIGHT}
            className={styles.fontSizeInput}
            placeholder="Font Size"
            onChange={(e) => {
              dispatch(updateTextNodes({ ...node, fontSize: e.target.value }));
            }}
          />
        </div>
      </div>
    </div>
  );
}
