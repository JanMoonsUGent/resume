import React, { Component } from "react";
import css from "./CasesCarousel.module.scss";
import PropTypes from "prop-types";
import CaseCard from "../CaseCard/CaseCard";
import RelatedItems from "../RelatedItems/RelatedItems";
import { storyblokEditable } from "@storyblok/react";

export default class CasesCarousel extends Component {

	constructor(props) {
		super(props);
	}

	// ToDo !! Er is een vreemde bug bij 1 card en 320px, deze is dan scrollbaar en zou dat niet mogen zijn -> Ook bij academy
	render() {
		return (
			<>
				<section {...storyblokEditable(this.props.blok)} className={css["cases-carousel"]}>
					<div className={css["cases-carousel__container"]}>
						<h2 className={css["cases-carousel__title"]}>{this.props.blok.title}</h2>
						{this.props.blok.cases && <RelatedItems className={css["cases-carousel__case-cards"]} relatedItems={this.props.blok.cases}>
							{
								this.props.blok.cases.map((x, key) => {
									let printablelogo= {}
									if(x.content.client.content){
										printablelogo = x.content.client.content.logo;
									} else {

									}
									return (
										this.props.noClickableCards ?
											<div key={key + "_businessPage-caseCard"} className={css["cases-carousel__case-card--not-clickable"]}>
												<div>
													<CaseCard
														isQuote={false}
														mainContent={x.content.title}
														info={x.content.tagline}
														logo={printablelogo}
														order={key}
													/>
												</div>
											</div> :
											<div key={key + "_businessPage-caseCard"} className={css["cases-carousel__case-card"]}>
												<a href={`/cases/${x.slug}`}>
													<CaseCard
														isQuote={false}
														mainContent={x.content.title}
														info={x.content.tagline}
														logo={printablelogo}
														order={key}
													/>
												</a>
											</div>
									);
								})
							}
						</RelatedItems>
						}
					</div>
				</section>
			</>
		);
	}
}

CasesCarousel.propTypes = {
	title: PropTypes.string,
	casesData: PropTypes.array,
	noClickableCards: PropTypes.bool
};