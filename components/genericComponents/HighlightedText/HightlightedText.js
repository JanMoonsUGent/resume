import React from "react";
import css from "./HighlightedText.module.scss";
import {RichTextToHTML} from "../../../functions/storyBlokRichTextRenderer";



export default function HighlightedText({blok}) {
	return (
		<>
			<div className={css["highlighted-text"]} >
				<p className={css["highlighted-text__text"]}>
					<span>Here&apos;s how we can </span>
					<span className={css["highlighted-text__highlighted-text"]}>help </span>
					<span>you</span>
					{/* {RichTextToHTML({document: blok, textClassName: css["highlighted-text__text"], boldClassName: css["highlighted-text__highlighted-text"]})} */}
					<img className={[css["highlighted-text__image"], "lazyload"].join(" ")}
						data-src="https://img2.storyblok.com/100x0/f/117280/110x96/6b444d9a07/raised_hands_x2.png"
						alt="raised hands"
					/>
					<img className={[css["highlighted-text__arrow"], "lazyload"].join(" ")}
						data-src="https://a.storyblok.com/f/117280/x/14ebf0ffa2/first_arrow.svg"
						alt="intro arrow"
					/>
				</p>
			</div>
		</>
	);
}