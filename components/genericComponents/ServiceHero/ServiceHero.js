import React from "react";
import css from "./ServiceHero.module.scss";
import PropTypes from "prop-types";
import {modifyStoryBlokImage} from "../../../functions/StoryBlokImageHelper";
import "lazysizes";
import {RichTextToHTML} from "../../../functions/storyBlokRichTextRenderer";
import GetColorCode from "../../../functions/colorCodeHelper";
import TagList from "../TagList/TagList";
import IntroVideo from "../IntroVideo/IntroVideo";


export default function ServiceHero({ heroData, contentTypeTag, transparent }) {
	let showIntroVideo = (heroData.introductionvideo && heroData.introductionvideo.videoId && heroData.introductionvideo.videoType);
	let showHeroImage = (!showIntroVideo && heroData.heroimage && heroData.heroimage.filename);
	let colorCssName = "--" + GetColorCode(heroData.color_code?.content.Description);
	let hasMedia = showIntroVideo || showHeroImage;
	let hasMediaModifier = hasMedia ? "" : "--no-media";
	let mediaTypeModifier = showIntroVideo ? "--with-video" : "";
	let titleString = typeof heroData.title === "string" ? heroData.title : undefined;
	let taglineString = typeof heroData.Tagline === "string" ? heroData.Tagline : undefined;
	
	return (
		<>
			<div className={css["hero" + (transparent ? "--transparent" : colorCssName)]}>
				<div className={[css["hero__container" + hasMediaModifier + mediaTypeModifier], css["hero__container" + (transparent ? "--transparent" : "")]].join(" ")}>
					<div className={[css["hero__title-group" + hasMediaModifier + mediaTypeModifier], css["hero__title-group" + (transparent ? "--transparent" : "")]].join(" ")}>
						<p className={css["hero__tag"]}>{contentTypeTag}</p>
						<h1 className={css["hero__title" + hasMediaModifier]}>{titleString || RichTextToHTML({document: heroData.title, textClassName: css["hero__title"], boldClassName: css["hero__title--highlighted" + colorCssName]})}</h1>
						<div className={css["hero__subtitle" + hasMediaModifier]}>{taglineString || RichTextToHTML({document: heroData.Tagline, textClassName: css["hero__subtitle"]})}</div>
						{heroData.tags && heroData.tags.length > 0 && <TagList tags={heroData.tags} variation={transparent ? "primary" : "white"} center/>}
					</div>
					{hasMedia ?
						<>
							{showIntroVideo &&
								<figure className={css["hero__media-container--with-video"]}>
									<IntroVideo
										video={heroData.introductionvideo}
										hasUnderText={false}
									/>
								</figure>
							}
							{showHeroImage &&
								<figure className={css["hero__media-container"]}>
									<img className={[css["hero__media-image"], "lazyload"].join(" ")}
										data-src={modifyStoryBlokImage(heroData.heroimage.filename, { width: 800})}
										alt={heroData.heroimage.alt}/>
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

ServiceHero.propTypes = {
	heroData: PropTypes.object,
	contentTypeTag: PropTypes.string,
	transparent: PropTypes.bool
};