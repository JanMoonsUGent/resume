import { storyblokEditable } from "@storyblok/react";
import React from "react";
import css from "./Hero.module.scss";
import PropTypes from "prop-types";
import {modifyStoryBlokImage} from "../../../functions/StoryBlokImageHelper";
import "lazysizes";
import "lazysizes/plugins/attrchange/ls.attrchange";
import {RichTextToHTML} from "../../../functions/storyBlokRichTextRenderer";
import GetColorCode from "../../../functions/colorCodeHelper";
import TagList from "../TagList/TagList";
import IntroVideo from "../IntroVideo/IntroVideo";


export default function Hero({ blok }) {
	let showVideo = (blok.video && blok.video.videoId && blok.video.videoType);
	let showImage = (!showVideo && blok.image && blok.image.filename);
	let colorCssName = "--" + GetColorCode(blok.color_code?.content.Description);
	let hasMedia = showVideo || showImage;
	let hasMediaModifier = hasMedia ? "" : "--no-media";
	let mediaTypeModifier = showVideo ? "--with-video" : "";
	let titleString = typeof blok.title === "string" ? blok.title : undefined;
	let taglineString = typeof blok.tagline === "string" ? blok.tagline : undefined;
	
	return (
		<>
			<div {...storyblokEditable(blok)} className={css["hero" + colorCssName]}>
				<div className={[css["hero__container" + hasMediaModifier + mediaTypeModifier], css["hero__container"]].join(" ")}>
					<div className={[css["hero__title-group" + hasMediaModifier + mediaTypeModifier], css["hero__title-group"]].join(" ")}>
						<p className={css["hero__tag"]}>{blok.supertitle}</p>
						<h1 className={css["hero__title" + hasMediaModifier]}>{titleString || RichTextToHTML({document: blok.title, textClassName: css["hero__title"], boldClassName: css["hero__title--highlighted" + colorCssName]})}</h1>
						<div className={css["hero__subtitle" + hasMediaModifier]}>{taglineString || RichTextToHTML({document: blok.Tagline, textClassName: css["hero__subtitle"]})}</div>
						{blok.tags && blok.tags.length > 0 && <TagList tags={blok.tags} variation={"white"} center/>}
					</div>
					{hasMedia ?
						<>
							{showVideo &&
								<figure className={css["hero__media-container--with-video"]}>
									<IntroVideo
										video={blok.video}
										hasUnderText={false}
									/>
								</figure>
							}
							{showImage &&
								<figure className={css["hero__media-container"]}>
									<img className={[css["hero__media-image"], "lazyload"].join(" ")}
										data-src={modifyStoryBlokImage(blok.image.filename, { width: 800})}
										alt={blok.image.alt}/>
								</figure>
							}
						</> :
						<></>
					}
				</div>
			</div>
		</>
	);
}

Hero.propTypes = {
	blok: PropTypes.object
};