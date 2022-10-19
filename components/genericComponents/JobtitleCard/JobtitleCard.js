

import React from "react";
import css from "../PositionCard/PositionCard.module.scss";
import PropTypes from "prop-types";
import { modifyStoryBlokImage } from "../../../functions/StoryBlokImageHelper";
import { RichTextToHTML } from "../../../functions/storyBlokRichTextRenderer";
import Tag from "../Tag/Tag.js";
import Link from "next/link";


export default function JobtitleCard({ data }) {


	return (
		<>
			<div className={css["position-card--not-clickable"]}>
				{data.image && <img className={css["position-card__figure"]} src={modifyStoryBlokImage(data.image.filename, { width: 230, height: 288, smart: true })} alt={data.image.alt} />}
				<p className={css["position-card__name"]}>{data.title}</p>
				<div className={css["position-card__description"]}>{RichTextToHTML({ document: data.shortestdescription, textClassName: css["position-card__description-text"] })}</div>
			</div>
		</>
	);
}