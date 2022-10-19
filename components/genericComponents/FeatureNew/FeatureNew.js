

import React from "react";
import css from "./FeatureNew.module.scss";
import { modifyStoryBlokImage } from "../../../functions/StoryBlokImageHelper";
import { RichTextToHTML } from "../../../functions/storyBlokRichTextRenderer";
import { storyblokEditable } from "@storyblok/react";


export default function FeatureNew({ blok }) {

	let cardContent = <>
		{blok.image && <img className={css["position-card__figure"]} src={modifyStoryBlokImage(blok.image.filename, { width: 230, height: 288, smart: true })} alt={blok.image.alt} />}
		<p className={css["position-card__name"]}>{blok.title}</p>
		<div className={css["position-card__description"]}>{RichTextToHTML({ document: blok.description, textClassName: css["position-card__description-text"] })}</div>
	</>;

	return (
		<>
			
				<div {...storyblokEditable(blok)} className={css["position-card--not-clickable"]}>
					{cardContent}
				</div>
				
			
		</>
	);
}