import React, {Component} from "react";
import css from "./JourneyBlock.module.scss";
import PropTypes from "prop-types";
import {getDefaultStoryBlokImageSet} from "../../../functions/StoryBlokImageHelper";
import Collapsible from "react-collapsible";
import { storyblokEditable } from "@storyblok/react";

export default class JourneyBlock extends Component {
	constructor(props) {
		super(props);

		this.cssDirection = this.props.direction === "reverse" ? "--reverse" : "";
		let items = this.getDefaultItems();
		items[0] = true;
		this.state = {
			itemStates: items
		};
	}

	getDefaultItems() {
		return this.props.content.map(() => false);
	}

	openItem(itemIndex) {
		let items = this.getDefaultItems();
		items[itemIndex] = true;

		this.setState(() => ({
			itemStates: items
		}));
	}
	
	render() {
		return(
			<>
				<section {...storyblokEditable(this.props.blok)} className={css["dynamic-browser"]}>
					<div className={css["dynamic-browser__image-container" + this.cssDirection]}>
						<div className={css["dynamic-browser__image-responsive-wrapper"]}>
							{this.props.content.map((item, i) =>
								<div key={i+"content-item-responsive-image"}>
									{getDefaultStoryBlokImageSet(item.image.filename, item.image.alt, {largestImageWidth: 870, largestImageHeigth: 870, fit: true}, 850, css["dynamic-browser__image"+(this.state.itemStates[i] ? "" : "--hidden")])}
								</div>
							)}
						</div>
					</div>

					<div className={css["dynamic-browser__text-container" + this.cssDirection]}>
						{this.props.content.map((item, i) =>
							<div key={i+"content-item-text"}>
								<Collapsible
									open={this.state.itemStates[i]}
									contentContainerTagName={"section"}
									easing={"ease"}
									transitionTime={600}
									trigger={
										<div onClick={() => this.openItem(i)} className={css["dynamic-browser__item-title-container"]} key={i+"_blended-learning-item"} role="button" tabIndex={0}>
											<h3 className={css["dynamic-browser__item-title"+(this.state.itemStates[i] ? "--selected" : "")]}>{item.title}</h3>
											<span className={["mdi", "mdi-chevron-down", css["dynamic-browser__item-title-arrow"+(this.state.itemStates[i] ? "--selected" : "")]].join(" ")} />
										</div>
									}
									triggerWhenOpen={
										<div onClick={() => this.openItem(i)} className={css["dynamic-browser__item-title-container"]} key={i+"_blended-learning-item"} role="button" tabIndex={0}>
											<h3 className={css["dynamic-browser__item-title"+(this.state.itemStates[i] ? "--selected" : "")]}>{item.title}</h3>
											<span className={["mdi", "mdi-chevron-up", css["dynamic-browser__item-title-arrow"+(this.state.itemStates[i] ? "--selected" : "")]].join(" ")} />
										</div>
									}
								>
									<p className={css["dynamic-browser__item-text"]}>{item.description}</p>
								</Collapsible>
							</div>
						)}
					</div>
				</section>
			</>
		);
	}
}

JourneyBlock.propTypes = {
	content: PropTypes.arrayOf(PropTypes.shape({
		title: PropTypes.string,
		description: PropTypes.string,
		image: PropTypes.shape({
			filename: PropTypes.string,
			alt: PropTypes.string
		})
	})),
	direction: PropTypes.string
};