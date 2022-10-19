import { storyblokEditable } from "@storyblok/react";
import React from "react";
import "pure-react-carousel/dist/react-carousel.es.css";
import css from "./TitledTestimonialCarousel.module.scss";
import TestimonialCarousel from "../TestimonialCarousel/TestimonialCarousel";
import PropTypes from "prop-types";
import {RichTextToHTML} from "../../../functions/storyBlokRichTextRenderer";

export default function TitledTestimonialCarousel({blok}) {
	let size = blok.forwithnavigator ? "--with-navigator" : "";
	
	return (
		<>
			<section {...storyblokEditable(blok)}  id={blok.id} className={css["titled-testimonial-carousel" + size]}>
				<h2 className={css["titled-testimonial-carousel__title" + size]}>
					{RichTextToHTML({document: blok.title, textClassName: css["titled-testimonial-carousel__title" + size], boldClassName: css["titled-testimonial-carousel__title--highlighted" + size]})}
					{/* {blok.titleParts.map((tp, i) => <span key={i} className={css[i%2===0 ? "" : "titled-testimonial-carousel__title--highlighted" + size]}>{tp}</span>)} */}
				</h2>
				{size === "--with-navigator" ? <TestimonialCarousel variant="for-home-page" transparent={true} testimonials={blok.testimonials}/> :
					<TestimonialCarousel className={css["titled-testimonial-carousel__carousel"]} testimonials={blok.testimonials} variant="for-home-page" fontColor={"black"}/>}
			</section>
		</>
	);
}

TitledTestimonialCarousel.propTypes = {
	id: PropTypes.string,
	testimonials: PropTypes.arrayOf(PropTypes.object),
	titleParts: PropTypes.arrayOf(PropTypes.string),
	forWithNavigator: PropTypes.string
};