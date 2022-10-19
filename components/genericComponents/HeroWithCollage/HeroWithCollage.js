import { storyblokEditable } from "@storyblok/react";
import React from "react";
import css from "./HeroWithCollage.module.scss";
import PropTypes from "prop-types";
import {TmlButton} from "../TmlButton/TmlButton";
import ImageCollection from "../ImageCollection/ImageCollection";
import {RichTextToHTML} from "../../../functions/storyBlokRichTextRenderer";
import {ConvertToButtonVariant} from "../../../functions/colorCodeHelper";

export default function HeroWithCollage( {blok} ) {
	let buttonVariant = ConvertToButtonVariant(blok.button[0].colorcode?.Description);
	
	return (
		<>
			<div {...storyblokEditable(blok)}  className={css["hero-with-collage"]}>
				<div className={css["hero-with-collage__text"]}>
					<h1 className={css["hero-with-collage__title"]}>{blok.title}</h1>
					<div className={css["hero-with-collage__info"]}>
						{RichTextToHTML({document: blok.intro, textClassName: css["hero-with-collage__info-text"], boldClassName: css["hero-with-collage__info-text--highlighted-blue"]})}
					</div>
					{blok.button[0] && <TmlButton className={css["hero-with-collage__subscribe-button"]}
										  variant={buttonVariant}
										  to={blok.button[0].link.url}
										  smooth={blok.button[0].smoothscroll}
										  spy={blok.button[0].smoothscroll}
										  duration={blok.button[0].smoothscroll ? 500 : undefined}
										  text={blok.button[0].text}>
						
					</TmlButton>}
				</div>
				<div className={css["hero-with-collage__image-collection"]}>
					<ImageCollection images={blok.imagecollection}/>
				</div>
			</div>
		</>
	);
}

HeroWithCollage.propTypes = {
	title: PropTypes.string,
	richText: PropTypes.object,
	button: PropTypes.object,
	imageCollection: PropTypes.arrayOf(PropTypes.shape({
		filename: PropTypes.string,
		alt: PropTypes.string
	}))
};