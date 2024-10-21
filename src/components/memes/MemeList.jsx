import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchMemes } from "../../store/actions/meme-actions";

import "../../assets/scss/style.scss";
import MemeHero from "./MemeHero";
import MemeGallery from "./MemeGallery";

export default function MemeList({ onEditMeme }) {
  const dispatch = useDispatch();
  const { memes } = useSelector((state) => state.meme);

  useEffect(() => {
    if (!memes?.length) {
      dispatch(fetchMemes());
    }
  }, [dispatch, memes]);

  return (
    <>
      {memes && (
        <>
          <MemeHero />
          <MemeGallery memes={memes} onEditMeme={onEditMeme} />
        </>
      )}
    </>
  );
}
