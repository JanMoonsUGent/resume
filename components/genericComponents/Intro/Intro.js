import { storyblokEditable } from "@storyblok/react";
import React from "react";
import css from "./Intro.module.scss";
import {RichTextToHTML} from "../../../functions/storyBlokRichTextRenderer";

export default function Intro( {blok} ) {
	return (
			<div {...storyblokEditable(blok)} className={[css["intro"]].join(" ")}>
				{RichTextToHTML({document: blok.intro, textClassName: css["intro__text"]})}
			</div>
	);
}