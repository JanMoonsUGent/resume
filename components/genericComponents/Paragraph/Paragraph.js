import { storyblokEditable } from "@storyblok/react";
import React from "react";
import css from "./Paragraph.module.scss";
import {RichTextToHTML} from "../../../functions/storyBlokRichTextRenderer";

export default function Paragraph( {blok} ) {
	return (
		<>
			<div {...storyblokEditable(blok)} className={[css["paragraph"]].join(" ")}>
				{RichTextToHTML({document: blok.paragraph, textClassName: css["paragraph__text"]})}
			</div>
		</>
	);
}

Paragraph.propTypes = {
	
};