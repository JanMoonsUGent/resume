import React from "react";
import css from "./HeroPeopleCollection.module.scss";
import "lazysizes";
import "lazysizes/plugins/attrchange/ls.attrchange";
import PropTypes from "prop-types";

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

export default function HeroPeopleCollection( {peopleImages} ) {
	let shuffledImages = shuffleArray(peopleImages);
	return (
		<>
			<div className={css["hero-people-collection"]}>
				<div className={css["hero-people-collection__container"]}>
					<div className={css["hero-people-collection__visual-container"]}>
						<img
							className={[css["hero-people-collection__visual-item"], css["hero-people-collection__visual-item-one"], "floatupandfloat", "lazyload"].join(" ")}
							data-src={shuffledImages[0].filename}
							alt={shuffledImages[0].alt}
						/>
						<img
							className={[css["hero-people-collection__visual-item"], css["hero-people-collection__visual-item-two"], "floatupandfloat2", "lazyload"].join(" ")}
							data-src={shuffledImages[1].filename}
							alt={shuffledImages[1].alt}
						/>
						<img
							className={[css["hero-people-collection__visual-item"], css["hero-people-collection__visual-item-three"], "floatupandfloat3", "lazyload"].join(" ")}
							data-src={shuffledImages[2].filename}
							alt={shuffledImages[2].alt}
						/>
						<img
							className={[css["hero-people-collection__visual-item-deco"], css["hero-people-collection__visual-item-deco-one"], "floatupandfloat2", "lazyload"].join(" ")}
							data-src="/images/pageImages/home/heroPeopleCollection/deco-callout.svg"
							alt="deco callout"
						/>
						<img
							className={[css["hero-people-collection__visual-item-deco"], css["hero-people-collection__visual-item-deco-two"], "floatupandfloat3", "lazyload"].join(" ")}
							data-src="/images/pageImages/home/heroPeopleCollection/deco-data.svg"
							alt="deco data"
						/>
						<img
							className={[css["hero-people-collection__visual-item-deco"], css["hero-people-collection__visual-item-deco-three"], "floatupandfloat", "lazyload"].join(" ")}
							data-src="/images/pageImages/home/heroPeopleCollection/deco-stars.svg"
							alt="deco stars"
						/>
						<img
							className={[css["hero-people-collection__visual-item-deco"], css["hero-people-collection__visual-item-deco-four"], "floatupandfloat3", "lazyload"].join(" ")}
							data-src="/images/pageImages/home/heroPeopleCollection/deco-trendline.svg"
							alt="deco trendline"
						/>
					</div>
				</div>
			</div>
		</>
	);
}

HeroPeopleCollection.propTypes = {
	peopleImages: PropTypes.arrayOf(PropTypes.shape({
		filename: PropTypes.string,
		alt: PropTypes.string
	}))
};