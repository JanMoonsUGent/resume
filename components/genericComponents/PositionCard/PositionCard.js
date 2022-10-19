

import React from "react";
import css from "./PositionCard.module.scss";
import PropTypes from "prop-types";
import { modifyStoryBlokImage } from "../../../functions/StoryBlokImageHelper";
import { RichTextToHTML } from "../../../functions/storyBlokRichTextRenderer";
import Tag from "../Tag/Tag.js";
import Link from "next/link";


export default function PositionCard({ positionData, notClickable }) {
	let position = positionData.content;
	let description = position.shortestdescription;
	let experienceTags = [];
	if(position.positionlevel || position.internallevel){
		experienceTags = position.positionlevel.concat(position.internallevel);
	}
	let roleTags = [];
	if(position.jobtitle){
		roleTags = position.jobtitle && position.jobtitle.map(jt => {
			let title;
			if(jt.content){
				title = jt.content.title;
			} else {
				title = ""
			}
			return title;
		  });
	}


	let cardContent = <>
		{position.image && <img className={css["position-card__figure"]} src={modifyStoryBlokImage(position.image.filename, { width: 230, height: 288, smart: true })} alt={position.image.alt} />}
		<p className={css["position-card__name"]}>{position.title}</p>
		<div className={css["position-card__description"]}>{RichTextToHTML({ document: description, textClassName: css["position-card__description-text"] })}</div>
		{experienceTags && experienceTags.length > 0 &&
			<>
				<p className={css["position-card__tags-title"]}>Experience:</p>
				<div className={css["position-card__tags"]}>
					{experienceTags.map((tag, i) =>
						<Tag key={i} className={css["position-card__tag"]}>
							{tag}
						</Tag>)}
				</div>
			</>}
		{roleTags && roleTags.length > 0 &&
			<>
				<p className={css["position-card__tags-title"]}>Possible roles:</p>
				<div className={css["position-card__tags"]}>
					{roleTags.map((tag, i) =>
						<Tag key={i} className={css["position-card__tag"]}>
							{tag}
						</Tag>)}
				</div>
			</>}
	</>;

	return (
		<>
			{notClickable ?
				<div className={css["position-card--not-clickable"]}>
					{cardContent}
				</div> :
				positionData.spontaneous? <Link href={`${positionData.slug}`} >
					<a className={css["position-card"]}>
						{cardContent}
					</a>
				</Link>:
				<Link href={`/positions/${positionData.slug}`}>
				<a className={css["position-card"]}>
					{cardContent}
				</a>
			</Link>
			}
		</>
	);
}