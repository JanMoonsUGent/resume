import React, {Component} from "react";
import css from "./ServiceLeftRightBlock.module.scss";
import PropTypes from "prop-types";
import {getDefaultStoryBlokImageSet} from "../../../functions/StoryBlokImageHelper";
import {RichTextToHTML} from "../../../functions/storyBlokRichTextRenderer";
import GetColorCode from "../../../functions/colorCodeHelper";
import { storyblokEditable } from "@storyblok/react";

export default class HighlightedContent extends Component {
	constructor(props) {
		super(props);

		this.cssDirection = this.props.direction === "ImageRight" ?  "--reverse": "";
		this.size = this.props.forWithPageNavigator ? "--with-navigator" : "";
		let color = "Blue";
		if (this.props.colorcode && this.props.colorcode.content){
			color = GetColorCode(this.props.colorcode.content.Description);
		}
		this.cssColorBg = "--" + color;
		this.cssColorFont = "--highlighted-" + color;
	}

	render() {
		return (
			<>
				<section {...storyblokEditable(this.props.blok)} className={[css["highlighted-content" + this.size], css["highlighted-content" + (this.props.lastComponent ? "--last" : "")]].join(" ")}>
					<div className={[css["highlighted-content__image-container" + this.cssDirection + this.size], css["highlighted-content__image-container" + this.cssColorBg]].join(" ")}>
						{this.props.content.image && this.props.content.image.filename && <div className={css["highlighted-content__image-responsive-wrapper"]}>
							{getDefaultStoryBlokImageSet(this.props.content.image.filename, this.props.content.image.alt, {largestImageWidth: 870, largestImageHeigth: 870}, 850, css["highlighted-content__image"])}
						</div>}
					</div>

					<div className={css["highlighted-content__text-container" + this.cssDirection + this.size]}>
						{RichTextToHTML({
							document: this.props.content.description,
							textClassName: css["highlighted-content__large-text" + this.size],
							boldClassName: css["highlighted-content__large-text" + this.cssColorFont + this.size]
						})}
					</div>
				</section>
			</>
		);
	}
}

HighlightedContent.propTypes = {
	direction: PropTypes.string,
	colorCode: PropTypes.string,
	lastComponent: PropTypes.bool,
	forWithPageNavigator: PropTypes.bool,
	content: PropTypes.object
};