import React, { Component } from "react";
import PropTypes from "prop-types";
import HeadComponent from "../HeadComponent/HeadComponent";
import MainFooter from "../MainFooter/MainFooter";
import Acquisition from "../Acquisition/Acquisition";
import Headermenu from "../Headermenu/Headermenu";
import { storyblokEditable } from "@storyblok/react";
import CaseHero from "../CaseHero/CaseHero";
import RichTextSection from "../RichTextSection/RichTextSection";


export default class ClientCase extends Component {

	constructor(props) {
		super(props);
		this.socialTags = props.socialTags;
		this.acquisitionblok = props.consultingacquisition.content;


	}

	render() {

		return (
			<>
				{/* <HeadComponent
					socialTags={this.socialTags}
				/> */}
				<Headermenu blok={this.props.menu.content}></Headermenu>

				<main {...storyblokEditable(this.props.blok)}>
					<CaseHero caseData={this.props.blok} />
					{this.props.blok.challenge && <RichTextSection smaller title="The Challenge" richText={this.props.blok.challenge} />}
					{this.props.blok.collaboration && <RichTextSection smaller title="The Collaboration" richText={this.props.blok.collaboration} />}
					{this.props.blok.result && <RichTextSection smaller title="The Result" richText={this.props.blok.result} />}
					{this.props.blok.about && <RichTextSection smaller title={"About " + this.props.blok.client.content.title} richText={this.props.blok.client.content.about} />}
					<Acquisition blok={this.acquisitionblok} />
				</main>
				<MainFooter />
			</>
		);
	}
}

ClientCase.propTypes = {
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

ClientCase.defaultProps = {
	direction: "normal"
};