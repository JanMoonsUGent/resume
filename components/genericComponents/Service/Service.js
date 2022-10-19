import React, { Component } from "react";
import PropTypes from "prop-types";
import HeadComponent from "../HeadComponent/HeadComponent";
import MainFooter from "../MainFooter/MainFooter";
import ServiceHero from "../ServiceHero/ServiceHero";
import InternalIntro from "../InternalIntro/InternalIntro";
import Acquisition from "../Acquisition/Acquisition";
import ServiceLeftRightBlock from "../ServiceLeftRightBlock/ServiceLeftRightBlock";
import HowCanWeHelp from "../HowCanWeHelp/HowCanWeHelp";
import { storyblokEditable, StoryblokComponent } from "@storyblok/react";
import Headermenu from "../Headermenu/Headermenu";
import Jobtitles from "../Jobtitles/Jobtitles";
import CasesGrid from "../CasesGrid/CasesGrid";


export default class Service extends Component {

	constructor(props) {
		super(props);
		this.socialTags = props.socialTags;
		// if (props.consultingacquisition) {
		// 	this.acquisitionblok = props.consultingacquisition.content;
		// }

		if (this.props.blok.jobtitles) {
			this.jobtitlesblok = {
				noClickableCards: true,
				title: "Who will help you?",
				jobtitles: this.props.blok.jobtitles.map(jt => jt.content),
				introText: "We will pick a world-class team to help you with your project. These are some of the roles that might come to the rescue..."
			}
		}
		if (this.props.blok.stories) {
			this.storiesblok = {
				noClickableCards: true,
				title: "Learn how we helped others",
				items: this.props.blok.stories.map(item => item),
				showmorebutton: true
			}
		}

	}

	render() {
		return (
			<>
				<HeadComponent
					socialTags={this.socialTags}
				/>
				<Headermenu blok={this.props.menu.content}></Headermenu>

				<main {...storyblokEditable(this.props.blok)}>
					<ServiceHero {...storyblokEditable(this.props.blok)} heroData={this.props.blok} contentTypeTag="Service" />
					{this.props.blok.shortdescription && <InternalIntro blok={this.props.blok.shortdescription} />}

					{this.props.blok.serviceleftrightblocks && this.props.blok.serviceleftrightblocks.map((x, index, array) =>
						<ServiceLeftRightBlock blok={x} key={x._uid}
							content={x}
							direction={x.direction}
							colorcode={x.colorcode}
							lastcomponent={index + 1 === array.length} />
					)}
					{/* {this.props.blok.tools && this.props.blok.tools.length > 0 && <ListOfTechniques title="How we do it" techniques={this.props.blok.tools.map(tool => tool.content)}/>} */}
					{this.props.blok.howcanwehelp && <HowCanWeHelp {...storyblokEditable(this.props.blok)} blok={this.props.blok.howcanwehelp} />}
					{/* {this.props.blok.jobtitles && this.props.blok.jobtitles.length > 0 && <Jobtitles blok = {this.jobtitlesblok} />} */}
					{/* {serviceData.testimonials && serviceData.testimonials.length > 0 && <TitledTestimonialCarousel testimonials={serviceData.testimonials.map(t => t.content)} titleParts={["Testimonials"]}/>} */}
					{this.props.blok.connectedcases && this.props.blok.connectedcases[0] && <CasesGrid blok={this.props.blok.connectedcases[0]}></CasesGrid>}
					{this.props.blok.bottombloks && this.props.blok.bottombloks.map((nestedBlok) => (
						<StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
					))}
					{/* <Acquisition blok={this.acquisitionblok} /> */}
					{this.props.blok.acquisition && <Acquisition  blok={this.props.blok.acquisition.content} id="position-page__acquisition"/>}
				</main>
				<MainFooter />
			</>
		);
	}
}

Service.propTypes = {
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

Service.defaultProps = {
	direction: "normal"
};