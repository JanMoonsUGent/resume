import React, { Component } from "react";
import css from "./Experience.module.scss";
import { storyblokEditable } from "@storyblok/react";
import {RichTextToHTML} from "../../../functions/storyBlokRichTextRenderer";

export default class Experience extends Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<>
				<div {...storyblokEditable(this.props.blok)} className={css["experienceitem"]}>
					<div className={css["experienceheader"]}>
						<span className={css["experiencedate"]}>{this.props.blok.startdate} - {this.props.blok.enddate}</span>
						<span className={css["experiencetitle"]}>{this.props.blok.title}</span>
					</div>
					<div className={css["experienceitemcontent"]}>
						{RichTextToHTML({ document: this.props.blok.description })}
					</div>
				</div>
			</>
		);
	}
}