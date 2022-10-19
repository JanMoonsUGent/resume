import React from "react";
import css from "./RichTextSection.module.scss";
import PropTypes from "prop-types";
import {RichTextToHTML} from "../../../functions/storyBlokRichTextRenderer";
import { storyblokEditable } from "@storyblok/react";

export default function RichTextSection({blok, title, richText, forWithPageNavigator, smaller}) {
	let variant = forWithPageNavigator ? "--with-navigator" : (smaller ? "--smaller" : "");

	return (
		<section {...storyblokEditable(blok)} className={css["rich-text-section" + variant]}>
			<h2 className={css["rich-text-section__title"]}>{title}</h2>
			<div className={css["rich-text-section__rich-text"]}>{RichTextToHTML({document: richText})}</div>
		</section>
	);
}

RichTextSection.propTypes = {
	title: PropTypes.string,
	richText: PropTypes.object,
	forWithPageNavigator: PropTypes.bool,
	smaller: PropTypes.bool
};