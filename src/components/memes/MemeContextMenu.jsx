import { useEffect } from "react";
import styles from "./styles.module.css";

const MemeContextMenu = ({ menuAnchor, item, onEdit, onClose }) => {
  const handleEditMeme = () => {
    if (item) onEdit(item);
    onClose();
  };

  useEffect(() => {
    document.addEventListener("click", onClose);

    return () => {
      document.removeEventListener("click", onClose, true);
    };
  });

  return (
    <menu
      id="contextMenu"
      key={item}
      className={styles.contextMenu}
      style={{
        display: menuAnchor ? "block" : "none",
        left: menuAnchor?.left,
        top: menuAnchor?.top,
      }}
      onClose={onClose}
    >
      <ul>
        <li key={"Edit"} onClick={handleEditMeme}>
          Edit
        </li>
      </ul>
    </menu>
  );
};

export default MemeContextMenu;
