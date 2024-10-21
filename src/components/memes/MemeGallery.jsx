import { useState } from "react";
import { useDispatch } from "react-redux";

import { setSelectedMeme } from "../../store/slices/meme-slice";

import styles from "./styles.module.css";
import MemeContextMenu from "./MemeContextMenu";

export default function MemeGallery({ memes, onEditMeme }) {
  const dispatch = useDispatch();
  const [menuAnchor, setMenuAnchor] = useState();
  const [selectedMemeToEdit, setSelectedMemeToEdit] = useState();

  const handleOnSelectMeme = (img) => {
    dispatch(setSelectedMeme(img));
  };

  const handleOnContextMenu = (e, meme) => {
    e.preventDefault();

    setSelectedMemeToEdit(meme);
    setMenuAnchor((prev) => ({
      ...prev,
      left: (e.pageX ?? e.clientX) - 40 + "px",
      top: (e.pageY ?? e.clientY) - 50 + "px",
    }));
  };

  const handleOnCloseMenu = () => {
    setMenuAnchor(null);
  };

  return (
    <div className={styles.container}>
      <div className={styles.templates}>
        {memes?.map((meme) => (
          <figure
            key={meme.id}
            className={styles.figure}
            onClick={() => handleOnSelectMeme(meme?.example?.url)}
            onContextMenu={(e) => handleOnContextMenu(e, meme)}
          >
            <img className={styles.image} src={meme.blank} alt={meme.name} />

            <figcaption className={styles.caption}>{meme.name}</figcaption>

            <div className={styles.overlay} />
          </figure>
        ))}
      </div>

      {menuAnchor && (
        <MemeContextMenu
          menuAnchor={menuAnchor}
          item={selectedMemeToEdit}
          onEdit={onEditMeme}
          onClose={handleOnCloseMenu}
        />
      )}
    </div>
  );
}
