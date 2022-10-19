import React, {Component} from "react";
import css from "./ServiceBlock.module.scss";
// import LazyLottie from "../lazyLottie/lazyLottie";
import PropTypes from "prop-types";
import {modifyStoryBlokImage} from "../../../functions/StoryBlokImageHelper";
import {RichTextToHTML} from "../../../functions/storyBlokRichTextRenderer";
import GetColorCode from "../../../functions/colorCodeHelper";
import {TmlButton} from "../TmlButton/TmlButton";
import { storyblokEditable } from "@storyblok/react";
import LazyLottie from "../LazyLottie/LazyLottie";

export async function getStaticProps(props) {
	return {
		props: {
			direction: props.direction,
			video: props.video,
			color: props.color,
			image: props.image,
			title: props.title,
			tagline: props.tagline,
			description: props.description,
			toolList: props.toolList,
			path: props.path
		}
	};
}


export default class ServiceBlock extends Component {

	constructor(props) {
		super(props);
		this.service = this.props.blok.service.content;
		this.direction = this.props.blok.direction;
		let color = GetColorCode(this.service.color_code.content.Description);
		this.buttonColor = "black-" + color;
		this.colorCssName = "--" + color;
	}
	
	render() {
		return (
			<>
				<section {...storyblokEditable(this.props.blok)} className={css["service-block"]} id={this.props.blok._uid}>
					<div className={[css["service-block__animation-container--" + this.direction], css["service-block__animation-container" + this.colorCssName]].join(" ")}>
						{this.props.video ?
							<LazyLottie animationClassName={css["service-block__animation"]} video={this.props.video} lazyLoadMargin={"200px"} minimumVisible={0.25} /> :
							<img
								src={modifyStoryBlokImage(this.service.heroimage.filename, { width: 1000})}
								alt={this.service.heroimage.alt}
								className={css["service-block__image"]}
							/>}
					</div>
					<div className={css["service-block__text-content--" + this.direction]}>
						<h2 className={css["service-block__title"]}>{RichTextToHTML({document: this.service.title, textClassName: css["service-block__title"], boldClassName: css["service-block__title--highlighted" + (this.colorCssName)]})}</h2>
						<h3 className={css["service-block__tagline"]}>{this.service.tagline}</h3>
						<div className={css["service-block__description"]}>{RichTextToHTML({document: this.service.shorterdescription, textClassName: css["service-block__description"], boldClassName: css["service-block__description--highlighted" + (this.colorCssName)]})}</div>
						{this.service.tools ? (
							<>
								<h3 className={[css["service-block__tools-list-title"], css["service-block__tools-list-title" + this.colorCssName]].join(" ")}>What we bring to the table</h3>
								<ul className={css["service-block__tools-list"]}>
									{this.service.tools.map((tool, i) => (
										<li key={i} className={css["service-block__tools-list-item"]}>{tool.content.title}</li>
									))}
								</ul>
							</>
						) : (<></>)}
						<TmlButton className={css["service-block__button"]} link href={'/'+this.props.blok.service.full_slug} variant={this.buttonColor}>Discover more</TmlButton>
					</div>
				</section>
			</>
		);
	}
}

ServiceBlock.propTypes = {
	id: PropTypes.string,
	color: PropTypes.string,
	direction: PropTypes.string,
	video: PropTypes.string,
	image: PropTypes.object,
	title: PropTypes.object,
	tagline: PropTypes.string,
	description: PropTypes.object,
	toolList: PropTypes.arrayOf(PropTypes.object),
	path: PropTypes.string
};

ServiceBlock.defaultProps = {
	direction: "normal"
};