import React from "react";
import css from "./FeatureListNew.module.scss";
import { storyblokEditable } from "@storyblok/react";
import { RichTextToHTML } from "../../../functions/storyBlokRichTextRenderer";
import FeatureNew from "../FeatureNew/FeatureNew";
import GetColorCode from "../../../functions/colorCodeHelper";

export default function FeatureListNew({ blok }) {
	let size = blok.forwithnavigator ? "--with-navigator" : "";
	let colorCssName = GetColorCode(blok.colorcode.content.Description);

	return (
		<>
			<section {...storyblokEditable(blok)} id={blok.id} className={[css["open-positions" + size], css["open-positions--" + colorCssName + "--" + blok.lightness]].join(" ")}>
				<h2 className={css["open-positions__title"]}>{blok.title}</h2>
				<div className={css["open-positions__text"]}>{RichTextToHTML({ document: blok.intro })}</div>
				<div className={css["open-positions__positions" + size]}>
					{blok.features.map((feature, i) => <FeatureNew blok={feature} key={i}/>)}
				</div>
			</section>
		</>
	);
}