import React from "react";
import css from "./CaseCardNew.module.scss";
import PropTypes from "prop-types";
import BigAccent from "../../../public/images/big-accent--cut-off.svg";
import BigTextBalloon from "../../../public/images/componentImages/caseCard/big-text-balloon.svg";
import { modifyStoryBlokImage } from "../../../functions/StoryBlokImageHelper";
import "lazysizes";
import "lazysizes/plugins/attrchange/ls.attrchange";
import ClientCaseType from "../ClientCaseType/ClientCaseType";
import { storyblokEditable } from "@storyblok/react";
import { RichTextToHTML } from "../../../functions/storyBlokRichTextRenderer";
import Link from "next/link";

export default function CaseCardNew({ blok, isQuote, mainContent, info, extraInfo, logo, order, tags, joinus, younexttext, slug, widthclass }) {
	let orderColor;
	switch (order % 4) {
		case 0:
			orderColor = "--green";
			break;
		case 1:
			orderColor = "--yellow";
			break;
		case 2:
			orderColor = "--purple";
			break;
		default:
			orderColor = "--red";
	}
	let backgroundImageStyle = {}
	if (blok && blok.cardimage && blok.cardimage.filename) {
		backgroundImageStyle = {
			width: "100%",
			height: "400px",
			backgroundImage: `url(${blok.cardimage.filename})`
		}
	}
	return (<>{
		isQuote ?
			<div {...storyblokEditable(blok)} className={css["case-quote-card" + orderColor]}>
				<p className={css["case-quote-card__title"]}>{mainContent}</p>
				<p className={css["case-quote-card__person-name"]}>{info}</p>
				<p className={css["case-quote-card__person-profession"]}>{extraInfo}</p>
				<figure className={css["case-quote-card__big-accent" + orderColor]}>
					<BigAccent />
				</figure>
				<figure className={css["case-quote-card__logo-container"]}>
					{logo && logo.filename && <img className={[css["case-quote-card__logo"], "lazyload"].join(" ")} data-src={modifyStoryBlokImage(logo.filename, { width: 1000 })} alt={logo.alt} />}
				</figure>
			</div>
			:
			!joinus ? <div {...storyblokEditable(blok)} className={[css["case-card" + orderColor], css["case-card--" + widthclass]].join(" ")}>
				<div className={css["case-card__textcontainer"]}>
					<figure className={css["case-card__logo-container-above"]}>
						{logo && logo.filename && <img className={[css["case-card__logo"], "lazyload"].join(" ")} data-src={modifyStoryBlokImage(logo.filename, { width: 1000 })} alt={logo.alt} />}
					</figure>
					<p className={[css["case-card__title"], css["case-card__title--" + widthclass]].join(" ")}>{mainContent}</p>
					<p className={css["case-card__info"]}>{blok.cardintro}</p>
					{(Object.prototype.toString.call(tags) == '[object Array]') && tags && tags.length > 0 && <div className={css["case-card__tags"]}>
						{tags.map((tag, i) => {
							return (tag.content && <ClientCaseType key={i} className={css["case-card__tag"]} >
								{tag.content.title}
							</ClientCaseType>)
						})
						}
					</div>}
					{blok.readmore && <div>
						<Link href={`${slug}`}>
							<a className={css["case-card__readmore"]}>
								Read more
							</a>
						</Link>
					</div>}
				</div>

				{blok.blocktype != "one" && blok.cardimage && blok.cardimage.filename &&
					<figure className={[css["case-card__media-container"], css["case-card__media-container" + orderColor]].join(" ")}>
						<img className={[css["case-card__media-image"], "lazyload"].join(" ")}
							data-src={modifyStoryBlokImage(blok.cardimage.filename, { width: 800 })}
							alt={blok.cardimage.alt} />
					</figure>
				
				}
				{/* <img className={[css["case-card__cardimage"], "lazyload"].join(" ")} data-src={modifyStoryBlokImage(blok.cardimage.filename, { width: 1000 })} alt={blok.cardimage.alt} />} */}

				{/* <figure className={css["case-card__big-text-balloon" + orderColor]}>
					<BigTextBalloon />
				</figure>
				<figure className={css["case-card__logo-container"]}>
					{logo && logo.filename && <img className={[css["case-card__logo"], "lazyload"].join(" ")} data-src={modifyStoryBlokImage(logo.filename, { width: 1000 })} alt={logo.alt} />}
				</figure> */}
			</div>
				:
				<div className={css["case-card-younext"]}>
					<div className={css["case-card-younext__title"]}>{RichTextToHTML({ document: younexttext, textClassName: css["case-card__title"], linkClassName: ["acquisition__emphmail"], imgClassName: ["acquisition__chatbubble"] })}</div>
				</div>

	}</>);
}

CaseCardNew.propTypes = {
	isQuote: PropTypes.bool,
	mainContent: PropTypes.string,
	info: PropTypes.string,
	extraInfo: PropTypes.string,
	logo: PropTypes.object,
	order: PropTypes.number
};