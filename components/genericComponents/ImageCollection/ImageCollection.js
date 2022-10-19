import React from "react";
import css from "./ImageCollection.module.scss";
import PropTypes from "prop-types";
import "lazysizes";
import "lazysizes/plugins/attrchange/ls.attrchange";
import {modifyStoryBlokImage} from "../../../functions/StoryBlokImageHelper";

/* Randomize array in-place using Durstenfeld shuffle algorithm */
function shuffleArray(array) {
	let arrayCopy = JSON.parse(JSON.stringify(array)); 
    for (var i = arrayCopy.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = arrayCopy[i];
        arrayCopy[i] = arrayCopy[j];
        arrayCopy[j] = temp;
    }
	return arrayCopy;
}

export default function ImageCollection( {images} ) {
	let shuffledImages = shuffleArray(images);
	return (
		<>
			<div className={css["image-collection"]}>
				<div className={css["image-collection__container"]}>
					<div className={css["image-collection__visual-container"]}>
						<img
							className={[css["image-collection__visual-item"], css["image-collection__visual-item-one"], "floating", "lazyload"].join(" ")}
							data-src={modifyStoryBlokImage(shuffledImages[0].filename, {width: 500})}
							alt={shuffledImages[0].alt}
						/>
						<img
							className={[css["image-collection__visual-item"], css["image-collection__visual-item-two"], "floating2", "lazyload"].join(" ")}
							data-src={modifyStoryBlokImage(shuffledImages[1].filename, {width: 500})}
							alt={shuffledImages[1].alt}
						/>
						<img
							className={[css["image-collection__visual-item"], css["image-collection__visual-item-three"], "floating3", "lazyload"].join(" ")}
							data-src={modifyStoryBlokImage(shuffledImages[2].filename, {width: 500})}
							alt={shuffledImages[2].alt}
						/>
						<img
							className={[css["image-collection__visual-item"], css["image-collection__visual-item-four"], "floating4", "lazyload"].join(" ")}
							data-src={modifyStoryBlokImage(shuffledImages[3].filename, {width: 500})}
							alt={shuffledImages[3].alt}
						/>
						<img
							className={[css["image-collection__visual-item"], css["image-collection__visual-item-five"], "floating5", "lazyload"].join(" ")}
							data-src={modifyStoryBlokImage(shuffledImages[4].filename, {width: 500})}
							alt={shuffledImages[4].alt}
						/>
						<img
							className={[css["image-collection__visual-item"], css["image-collection__visual-item-six"], "floating6", "lazyload"].join(" ")}
							data-src={modifyStoryBlokImage(shuffledImages[5].filename, {width: 500})}
							alt={shuffledImages[5].alt}
						/>
						<img
							className={[css["image-collection__visual-item"], css["image-collection__visual-item-seven"], "floating7", "lazyload"].join(" ")}
							data-src={modifyStoryBlokImage(shuffledImages[6].filename, {width: 500})}
							alt={shuffledImages[6].alt}
						/>
						<img
							className={[css["image-collection__visual-item"], css["image-collection__visual-item-eight"], "floating8", "lazyload"].join(" ")}
							data-src={modifyStoryBlokImage(shuffledImages[7].filename, {width: 500})}
							alt={shuffledImages[7].alt}
						/>
						<img
							className={[css["image-collection__visual-item-deco"], css["image-collection__visual-item-deco-one"], "floating", "lazyload"].join(" ")}
							data-src="/images/componentImages/imageCollection/deco-speechbubble.svg"
							alt="deco speech bubble"
						/>
						<img
							className={[css["image-collection__visual-item-deco"], css["image-collection__visual-item-deco-two"], "floating", "lazyload"].join(" ")}
							data-src="/images/componentImages/imageCollection/deco-hat.svg"
							alt="deco hat"
						/>
						<img
							className={[css["image-collection__visual-item-deco"], css["image-collection__visual-item-deco-three"], "floating", "lazyload"].join(" ")}
							data-src="/images/componentImages/imageCollection/deco-lamp.svg"
							alt="deco lamp"
						/>
						<img
							className={[css["image-collection__visual-item-deco"], css["image-collection__visual-item-deco-four"], "floating", "lazyload"].join(" ")}
							data-src="/images/componentImages/imageCollection/deco-heart.svg"
							alt="deco heart"
						/>
					</div>
				</div>
			</div>
		</>
	);
}

ImageCollection.propTypes = {
	images: PropTypes.array
};