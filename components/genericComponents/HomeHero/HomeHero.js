import React, {Component} from "react";
import css from "./HomeHero.module.scss";
import "lazysizes";
import "lazysizes/plugins/attrchange/ls.attrchange";
import PropTypes from "prop-types";
import HeroPeopleCollection from "../HeroPeopleCollection/HeroPeopleCollection";
import HighlightedText from "../HighlightedText/HightlightedText";
import TypeWriterBlock from "../TypeWriterBlock/TypeWriterBlock";
import { storyblokEditable } from "@storyblok/react";
import { RichTextToHTML } from "../../../functions/storyBlokRichTextRenderer";

export default class HomeHero extends Component {

	constructor(props) {
		super(props);
	}

	render(){
		return (
			<>
				<div {...storyblokEditable(this.props.blok)} className={css["main-hero"]}>
					<div className={css["main-hero__pretitle-part"]}>
						<div className={css["main-hero__pretitle"]}>{this.props.blok.title}</div>
					</div>
					<div className={css["main-hero__title-part"]}>
						<div className={css["main-hero__title"]}><TypeWriterBlock typewriter={this.props.blok.typewriter}/></div>
					</div>
					<div className={css["main-hero__posttitle-part"]}>
						<div className={css["main-hero__posttitle"]}>{RichTextToHTML({ document: this.props.blok.bottomtext, textClassName: css["main-hero__posttitle"] })}</div>
					</div>
					<figure className={css["main-hero__animation"]}>
						<div className={css["main-hero__larger-animation"]}><HeroPeopleCollection peopleImages={this.props.blok.imagecollection}/></div>
					</figure>
					<HighlightedText blok={this.props.blok.bottomtext}/>
				</div>
			</>
		);
	}
}