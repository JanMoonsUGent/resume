import React, { Component } from "react";
import { storyblokEditable } from "@storyblok/react";
import css from "./LeftRightBlock.module.scss";
import { getDefaultStoryBlokImageSet } from "../../../functions/StoryBlokImageHelper";
import { RichTextToHTML } from "../../../functions/storyBlokRichTextRenderer";
import GetColorCode from "../../../functions/colorCodeHelper";

export default function LeftRightBlock({ blok }) {
	let cssDirection = blok.direction === "ImageRight" ? "--reverse" : "";
	let size = blok.forWithPageNavigator ? "--with-navigator" : "";
	let color = GetColorCode(blok.colorCode);
	let cssColorBg = "--" + color;
	let cssColorFont = "--highlighted-" + color;

	return (
		<>
			<section {...storyblokEditable(blok)} className={[css["highlighted-content" + size], css["highlighted-content"]].join(" ")}>
				<div className={[css["highlighted-content__image-container" + cssDirection + size], css["highlighted-content__image-container" + cssColorBg]].join(" ")}>
					<div className={css["highlighted-content__image-responsive-wrapper"]}>
						{getDefaultStoryBlokImageSet(blok.image.filename, blok.image.alt, { largestImageWidth: 870, largestImageHeigth: 870 }, 850, css["highlighted-content__image"])}
					</div>
				</div>

				<div className={css["highlighted-content__text-container" + cssDirection + size]}>
					{RichTextToHTML({
						document: blok.text,
						textClassName: css["highlighted-content__large-text" + size],
						boldClassName: css["highlighted-content__large-text" + cssColorFont + size]
					})}
				</div>
			</section>
		</>
	);
}