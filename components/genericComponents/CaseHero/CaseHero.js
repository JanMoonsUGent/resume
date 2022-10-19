import React from "react";
import css from "./CaseHero.module.scss";
import PropTypes from "prop-types";
import TestimonialCard from "../TestimonialCard/TestimonialCard";


export default function CaseHero({ caseData }) {
	return (
		<>
			<div className={css["case-hero"]}>
				<p className={css["case-hero__tags"]}>
					<span className={css["case-hero__tag--link"]}>Stories</span>
					{caseData.client && <span className={css["case-hero__tag"]}> | {caseData.client.content.title}</span>}
				</p>
				<h1 className={css["case-hero__title"]}>{caseData.title}</h1>
				<p className={css["case-hero__tagline"]}>{caseData.tagline}</p>
				{caseData.introquote && caseData.introquote[0].testimonial && <TestimonialCard
					className={css["case-hero__testimonial-card"]}
					testimonialText={caseData.introquote[0].testimonial}
					speakerName={caseData.introquote[0].testimonialgiver}
					speakerFunction={caseData.introquote[0].testimonialgiverrole}
					speakerImg={caseData.introquote[0].testimonialpicture}
					fontColor="$color-grey-normal"
					accentDomainColor="yellow"
					basicLayout="caseIntro"
					logo={caseData.client.content.logo}
				/>}
			</div>
		</>
	);
}

CaseHero.propTypes = {
	caseData: PropTypes.object
};