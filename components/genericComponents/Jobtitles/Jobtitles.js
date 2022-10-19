import React from "react";
import css from "../OpenPositions/OpenPositions.module.scss";
import { storyblokEditable } from "@storyblok/react";
import {RichTextToHTML} from "../../../functions/storyBlokRichTextRenderer";
import JobtitleCard from "../JobtitleCard/JobtitleCard";

export default function Jobtitles({ blok }) {
	let size = blok.forwithnavigator ? "--with-navigator" : "";

	return (
		<>
			<section {...storyblokEditable(blok)} id={blok.id} className={css["open-positions" + size]}>
				<h2 className={css["open-positions__title"]}>{blok.title}</h2>
				{RichTextToHTML({document: blok.introtext, textClassName: css["open-positions__text"]})}
				<div className={css["open-positions__positions" + size]}>
					{blok.jobtitles.map((jobtitle, i) => <JobtitleCard data={jobtitle} key={i}/>)}
				</div>
			</section>
		</>
	);
}