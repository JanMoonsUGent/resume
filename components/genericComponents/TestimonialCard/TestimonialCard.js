import React from "react";
import css from "./TestimonialCard.module.scss";
import PropTypes from "prop-types";
import BigAccent from "../../../public/images/big-accent.svg";
import BigCroppedAccent from "../../../public/images/big-accent--cut-off.svg";
import {modifyStoryBlokImage} from "../../../functions/StoryBlokImageHelper";
import "lazysizes";
import "lazysizes/plugins/attrchange/ls.attrchange";

export default function TestimonialCard({
	className,
	speakerImg,
	speakerName,
	speakerFunction,
	testimonialText,
	basicLayout,
	boxedInAccent,
	fontColor,
	accentDomainColor,
	imgShadowDomainColor,
	logo
}) {
	let cardLayout = "";
	if (boxedInAccent) {
		cardLayout = "--rich-text";
	} else switch (basicLayout) {
	case "compact":
		cardLayout = "--compact";
		break;
	case "caseIntro":
		cardLayout = "--case-intro";
		break;
	case "card":
		cardLayout = "--basic-card";
		break;
	case "for-video-carousel":
		cardLayout = "--for-video-carousel";
		break;
	case "for-testimonials-page":
		cardLayout = "--for-testimonials-page";
		break;
	case "for-home-page":
		cardLayout = "--for-home-page";
		break;
	case "top-accent":
		cardLayout = "--top-accent";
		break;
	default:
		break;
	}
	let speakerImgPath = speakerImg ? speakerImg.filename : null;
	accentDomainColor = accentDomainColor ? "--"+accentDomainColor : "";
	imgShadowDomainColor = imgShadowDomainColor ? "--"+imgShadowDomainColor : "";
	
	return (
		<>
			<div className={[css["testimonial-card"+cardLayout], className].join(" ")} style={{
				"--font-color": fontColor
			}}>
				<div className={css["testimonial-card__content"+cardLayout]}>{testimonialText}</div>
				<div className={css["testimonial-card__speaker"+cardLayout]} style={{"--grid-template-columns": speakerImgPath ? "max-content auto": "auto"}}>
					{speakerImgPath &&
						<div className={css["testimonial-card__speaker-image-real-wrapper"]}>
							<img
								className={[css["testimonial-card__speaker-image-real"+imgShadowDomainColor], "lazyload"].join(" ")}
								data-src={modifyStoryBlokImage(speakerImgPath, {width: 156, height: 190, smart: true})}
								alt={speakerImg.alt}
							/>
						</div>
					}
					<p className={css["testimonial-card__speaker-name"+cardLayout]}>{speakerName}</p>
					<p className={css["testimonial-card__speaker-function"+cardLayout]}>{speakerFunction}</p>
				</div>
				<figure className={[
					css["testimonial-card__big-accent"+cardLayout],
					css["testimonial-card__big-accent"+accentDomainColor]
				].join(" ")}>
					{cardLayout==="--basic-card" ? <BigCroppedAccent/> : <BigAccent/>}
					{logo ? <img className={[css["testimonial-card__logo"], "lazyload"].join(" ")} data-src={logo.filename} alt={logo.alt}/> : <></>}
				</figure>
			</div>
		</>
	);
}

TestimonialCard.propTypes = {
	speakerImg: PropTypes.object,
	speakerName: PropTypes.string,
	speakerFunction: PropTypes.string,
	testimonialText: PropTypes.string,
	basicLayout: PropTypes.string,
	fontColor: PropTypes.string,
	backgroundColor: PropTypes.string,
	accentDomainColor: PropTypes.string,
	imgBorderColor: PropTypes.string,
	imgBorderDomainColor: PropTypes.string,
	className: PropTypes.string,
	boxedInAccent: PropTypes.bool,
	logo: PropTypes.object,
	imgShadowDomainColor: PropTypes.string
};

TestimonialCard.defaultProps = {
	basicLayout: "",
	fontColor: "white",
	accentDomainColor: "",
	imgBorderDomainColor: ""
};