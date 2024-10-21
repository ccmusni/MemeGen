import { useState } from "react";
import { useDispatch } from "react-redux";
import classNames from "classnames";

import { addTextNode } from "../../store/slices/editor-slice";
import TextNodeInput from "../text-node/TextNodeInput";

import styles from "./styles.module.css";
import { setSelectedMeme } from "../../store/slices/meme-slice";

export default function MemeSidebar({ meme, textNodes, onApplyMeme }) {
  const dispatch = useDispatch();
  const [isDownloading, setIsDownloading] = useState(false);
  const [error, setError] = useState();

  const generateMeme = async () => {
    setIsDownloading(true);
    try {
      const textUrl = encodeURI(
        textNodes?.map((node) => node.value)?.join("/")
      );
      const response = await fetch(
        `https://api.memegen.link/images/${meme.id}/${textUrl}.png`,
        {
          method: "GET",
        }
      )
        .then((res) => {
          return { data: { url: res.url, page_url: "" } };
        })
        .catch((e) => {
          return { error_message: e.message };
        });

      if (!response?.data) {
        setError({ message: response?.error_message });

        return;
      }

      onApplyMeme?.();
      dispatch(setSelectedMeme(response.data.url));
    } catch (error) {
      setError(error);
    } finally {
      setIsDownloading(false);
    }
  };

  const handleAddTextNode = () => {
    dispatch(addTextNode());
  };

  return (
    <aside className={classNames(styles.editorSidebar)}>
      <div className={styles.header}>
        <div className="product-designer-btn-container">
          <button className={styles.newTextButton} onClick={handleAddTextNode}>
            Add text
          </button>
        </div>
      </div>

      {
        <>
          {!!textNodes?.length && (
            <>
              <div className={styles.nodes}>
                {textNodes?.map((node) => (
                  <TextNodeInput key={`input-${node.id}`} node={node} />
                ))}
              </div>

              <div className="product-designer-btn-container btn-hover">
                <button onClick={generateMeme} disabled={isDownloading}>
                  {isDownloading ? "Loading..." : "Apply Meme"}
                </button>
              </div>
            </>
          )}
        </>
      }
    </aside>
  );
}
