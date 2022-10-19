import React, { Component } from "react";
import css from "./Position.module.scss";
import HeadComponent from "../HeadComponent/HeadComponent";
import MainFooter from "../MainFooter/MainFooter";
import Acquisition from "../Acquisition/Acquisition";
import Headermenu from "../Headermenu/Headermenu";
import PageNavigator from "../PageNavigator/PageNavigator";
import Hero from "../Hero/Hero";
import OpenPositions from "../OpenPositions/OpenPositions";
import { storyblokEditable } from "@storyblok/react";
import { RichTextToHTML } from "../../../functions/storyBlokRichTextRenderer";

export default class Position extends Component {

	constructor(props) {
		super(props);
		this.sections = [{
			id: "position-page__short-description",
			title: "About this position",
			navTitle: "Short description",
			content: this.props.blok.shortdescription
		}];

		[
			{
				id: "position-page__mountain-philosophy",
				title: "Our mountain philosophy",
				navTitle: "Mountain philosophy",
				content: this.props.blok.mountainphilosophy
			},
			{
				id: "position-page__what-we-value",
				title: "Here is what we value in you",
				navTitle: "What we value",
				content: this.props.blok.whatwevalue
			},
			{
				id: "position-page__helpful-skills",
				title: "These are the roles you might perform",
				navTitle: "Roles you might perform",
				content: this.props.blok.whatskills
			},
			{
				id: "position-page__what-we-offer",
				title: "This is what we can offer you",
				navTitle: "What we offer",
				content: this.props.blok.whatweoffer
			}
		].forEach(sectionData => {
			if (sectionData.content) {
				this.sections = this.sections.concat(sectionData);
			}
		});
		this.navigationLinks = this.sections.map(section => ({ id: section.id, title: section.navTitle })).concat([
      { id: "position-page__other-positions", title: "Other positions" },
			{ id: "position-page__contact", title: "Contact us" }
		]);
		var filteredpositions = this.props.positions.filter(function (el) {
			return el.slug != props.slug
		});
		this.positionsblok = {
			positions: filteredpositions,
			title: "Not what you are looking for? You might be interested in these other positions",
			introtext: "",
			forwithnavigator: false
		}
	}

	render() {
		return (
			<div {...storyblokEditable(this.props.blok)}>
				<HeadComponent
					socialTags={this.props.socialTags}
				/>
				<Headermenu blok={this.props.menu.content}></Headermenu>

				<main>
					<Hero blok={this.props.blok} contentTypeTag="Position" />
					<div className={css["position-page__main-content"]}>
						<aside className={css["position-page__page-navigator"]}>
							<PageNavigator title="ON THIS PAGE" navigationLinks={this.navigationLinks} />
						</aside>
						<div id="position-page__short-description" key="position-page__short-description" className={css["position-page__short-description"]}>
							<section className={css["rich-text-section--with-navigator"]}>
								<h2 className={css["rich-text-section__title"]}>About this position</h2>
								<div className={css["rich-text-section__rich-text"]}>{RichTextToHTML({ document: this.props.blok.shortdescription })}</div>
							</section>
						</div>
						<div id="position-page__mountain-philosophy" key="position-page__mountain-philosophy" className={css["position-page__mountain-philosophy"]}>
							<section className={css["rich-text-section--with-navigator"]}>
								<h2 className={css["rich-text-section__title"]}>Our mountain philosophy</h2>
								<div className={css["rich-text-section__rich-text"]}>{RichTextToHTML({ document: this.props.blok.mountainphilosophy })}</div>
							</section>
						</div>
						<div id="position-page__what-we-value" key="position-page__what-we-value" className={css["position-page__what-we-value"]}>
							<section className={css["rich-text-section--with-navigator"]}>
								<h2 className={css["rich-text-section__title"]}>Here is what we value in you</h2>
								<div className={css["rich-text-section__rich-text"]}>{RichTextToHTML({ document:  this.props.blok.whatwevalue })}</div>
							</section>
						</div>
						<div id="position-page__helpful-skills" key="position-page__helpful-skills" className={css["position-page__helpful-skills"]}>
							<section className={css["rich-text-section--with-navigator"]}>
								<h2 className={css["rich-text-section__title"]}>These are the roles you might perform</h2>
								<div className={css["rich-text-section__rich-text"]}>{RichTextToHTML({ document: this.props.blok.whatskills })}</div>
							</section>
						</div>

						<div id="position-page__what-we-offer" key="position-page__what-we-offer" className={css["position-page__what-we-offer"]}>
							<section className={css["rich-text-section--with-navigator"]}>
								<h2 className={css["rich-text-section__title"]}>What we offer</h2>
								<div className={css["rich-text-section__rich-text"]}>{RichTextToHTML({ document: this.props.blok.whatweoffer })}</div>
							</section>
						</div>
						{/* {this.sections.map(section => <div id={section.id} key={section.id} className={css[section.id]}>
							<RichTextSection blok={this.props.blok} forWithPageNavigator title={section.title} richText={section.content} />
						</div>)} */}
					</div>
					{/* <Acquisition  blok={this.props.consultingacquisition.content} id="position-page__contact"/> */}
					<OpenPositions id="position-page__other-positions" title="Other positions" blok={this.positionsblok} />
					{this.props.blok.bottombloks && this.props.blok.bottombloks.map((nestedBlok) => (
						<StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
					))}
					{this.props.blok.acquisition && <Acquisition  blok={this.props.blok.acquisition.content} id="position-page__contact"/>}
				</main>
				<MainFooter />
			</div>
		);
	}
}
