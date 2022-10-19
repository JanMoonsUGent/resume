import React from "react";
import css from "./OpenPositions.module.scss";
import PropTypes from "prop-types";
import PositionCard from "../PositionCard/PositionCard";
import { storyblokEditable } from "@storyblok/react";
import {RichTextToHTML} from "../../../functions/storyBlokRichTextRenderer";
import {ST} from "next/dist/shared/lib/utils";

export default function OpenPositions({ blok, id }) {
	let size = blok.forwithnavigator ? "--with-navigator" : "";
  let _id = id ? id : blok._uid;
	let spontaneousPositionData = {
		content:{
			title:"You want to start a spontaneous application",
			image:{
				filename:"https://img2.storyblok.com/230x288/smart/f/148683/500x500/893dfa0f2b/katrienmaskedbg.png",
				alt:""
			},
			internallevel:["All levels"],
			positionlevel:["All roles"],
			shortestdescription:"Did not quite find what you are looking for in the open positions? Start a spontaneous application instead."
		},
		slug:"/pages/spontaneous-application",
		spontaneous:true
	}
	return (
		<>
			<section {...storyblokEditable(blok)} id={_id} className={css["open-positions" + size]}>
				<h2 className={css["open-positions__title"]}>{blok.title}</h2>
				{RichTextToHTML({document: blok.introtext, textClassName: css["open-positions__text"]})}
				<div className={css["open-positions__positions" + size]}>
					{blok.positions.map((position, i) => <PositionCard positionData={position} key={i}/>)}
					<PositionCard positionData={spontaneousPositionData} key={"spontaneousapplicationcard"}/>
				</div>
			</section>
		</>
	);
}
