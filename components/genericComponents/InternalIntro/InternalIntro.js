import React from "react";
import css from "./InternalIntro.module.scss";
import {RichTextToHTML} from "../../../functions/storyBlokRichTextRenderer";

export default function InternalIntro( {blok} ) {
	return (
		<>
			<div className={[css["intro"]].join(" ")}>
				{RichTextToHTML({document: blok, textClassName: css["intro__text"]})}
			</div>
		</>
	);
}