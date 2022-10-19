import React from "react";
import {CarouselProvider, Slider, Slide, ButtonBack, ButtonNext} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import css from "./TestimonialCarousel.module.scss";
import TestimonialCard from "../TestimonialCard/TestimonialCard";
import PropTypes from "prop-types";
import {useMediaQuery} from "../../../functions/mediaQueryHelper";

export default function TestimonialCarousel({testimonials, className, transparent, fontColor, accentColor, variant}) {
	const isForHomePage = variant === "for-home-page";
	const isMobile = isForHomePage ? useMediaQuery(849) : useMediaQuery(799);
	let screenSize = "xl";
  if (isForHomePage && useMediaQuery(1399)) {screenSize = "l";}
	if (isForHomePage ? useMediaQuery(1249) : useMediaQuery(899)) {screenSize = "m";}
	if (isForHomePage ? useMediaQuery(849) : useMediaQuery(799)) {screenSize = "s";}
	if (useMediaQuery(449)) {screenSize = "xs";}

	const isTransparentModifier = transparent ? "--transparent" : "";
	const isTransparentColor = transparent ? "black" : "white";
	fontColor = fontColor ? fontColor : isTransparentColor;
	const isForTopTestimonials = variant === "for-testimonials-page";
	let __variant = variant ? "--"+variant : "";
	let slideHeight;
	if (isForTopTestimonials) switch (screenSize) {
	case "xs":
		slideHeight = 72;
		break;
	case "s":
		slideHeight = 63;
		break;
	case "m":
		slideHeight = 62;
		break;
	default:
		slideHeight = 70;
		break;
	} else switch (screenSize) {
	case "xs" || "s":
		slideHeight = 72;
		break;
	case "m":
		slideHeight = 112;
		break;
  case "l":
    slideHeight = 90;
    break;
	default:
		slideHeight = 80;
		break;
	}


	return (
		<>
			{
				!isMobile ?
					(<CarouselProvider
						naturalSlideWidth={82}
						naturalSlideHeight={slideHeight}
						totalSlides={testimonials.length}
						className={[css["testimonial-carousel"+isTransparentModifier], css["testimonial-carousel"+__variant], className].join(" ")}
						orientation="vertical"
					>
						<div className={css["testimonial-carousel__buttons"+__variant]}>
							<ButtonBack className={[css["testimonial-carousel__button-back"+isTransparentModifier], css["testimonial-carousel__button-back"+__variant]].join(" ")}>
								<span className="mdi mdi-arrow-up"/>
							</ButtonBack>
							<ButtonNext className={[css["testimonial-carousel__button-next"+isTransparentModifier], css["testimonial-carousel__button-next"+__variant]].join(" ")}>
								<span className="mdi mdi-arrow-down"/>
							</ButtonNext>
						</div>

						<Slider className={css["testimonial-carousel__slider"]}>
							{
								testimonials.map((testimonial, index) => {
									return (
										<Slide key={`testimonial_${index}`} index={index}>
											<TestimonialCard
												fontColor={fontColor}
												accentDomainColor={accentColor}
												imgShadowDomainColor={accentColor}
												speakerName={testimonial.content.testimonialgiver}
												speakerFunction={testimonial.content.testimonialgiverrole}
												speakerImg={testimonial.content.testimonialpicture}
												testimonialText={testimonial.content.testimonial}
												basicLayout={variant}/>
										</Slide>);
								})
							}
						</Slider>
					</CarouselProvider>) :
					(<CarouselProvider
						naturalSlideWidth={82}
						naturalSlideHeight={slideHeight}
						isIntrinsicHeight={true}
						totalSlides={testimonials.length}
						infinite={true}
						className={[css["testimonial-carousel--mobile"+isTransparentModifier], css["testimonial-carousel--mobile"+__variant], className].join(" ")}
						orientation="horizontal"
					>
						<div className={css["testimonial-carousel__buttons--mobile"]}>
							<ButtonBack className={css["testimonial-carousel__button-back"+isTransparentModifier]}>
								<span className="mdi mdi-arrow-left"/>
							</ButtonBack>
							<ButtonNext className={css["testimonial-carousel__button-next"+isTransparentModifier]}>
								<span className="mdi mdi-arrow-right"/>
							</ButtonNext>
						</div>

						<Slider className={css["testimonial-carousel__slider"]}>
							{
								testimonials.map((testimonial, index) => {
									return (
										<Slide className={css["testimonial-carousel__slider-item"]} key={`testimonial_${index}`} index={index}>
											<TestimonialCard
												fontColor={fontColor}
												accentDomainColor={accentColor}
												imgShadowDomainColor={accentColor}
												speakerName={testimonial.content.testimonialgiver}
												speakerFunction={testimonial.content.testimonialgiverrole}
												speakerImg={testimonial.content.testimonialpicture}
												testimonialText={testimonial.content.testimonial}
												basicLayout={variant}/>
										</Slide>);
								})
							}
						</Slider>
					</CarouselProvider>)
			}
		</>
	);
}

TestimonialCarousel.propTypes = {
	testimonials: PropTypes.array,
	className: PropTypes.string,
	transparent: PropTypes.bool,
	domain: PropTypes.string,
	variant: PropTypes.string,
	fontColor: PropTypes.string,
	accentColor: PropTypes.string
};

TestimonialCarousel.defaultProps = {
	transparent: false
};
