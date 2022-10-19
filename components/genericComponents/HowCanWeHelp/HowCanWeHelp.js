import React from "react";
import css from "./HowCanWeHelp.module.scss";
import PropTypes from "prop-types";
import {RichTextToHTML} from "../../../functions/storyBlokRichTextRenderer";

export default function HowCanWeHelp( {blok} ) {
	return (
		<>
			<div className={[css["howcanwehelp" + (true ? "--with-navigator" : "")], 'red'].join(" ")}>
				<h3 className={css["howcanwehelp__title"]}>How can we help?</h3>
				{RichTextToHTML({document: blok, textClassName: css["howcanwehelp__text"]})}
			</div>
		</>
	);
}

HowCanWeHelp.propTypes = {
	trackStory: PropTypes.object,
	forWithPageNavigator: PropTypes.bool,
	className: PropTypes.object,
	description: PropTypes.object
};