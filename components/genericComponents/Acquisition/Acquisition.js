import React from "react";
import css from "./Acquisition.module.scss";
import "lazysizes";
import "lazysizes/plugins/attrchange/ls.attrchange";
import ChatBubble from "../../../public/images/chatbubble.svg";
import PropTypes from "prop-types";
import {RichTextToHTML} from "../../../functions/storyBlokRichTextRenderer";
import { storyblokEditable } from "@storyblok/react";


export default function Acquisition({blok, id}) {
	return (
		<>
			<section {...storyblokEditable(blok)}  id={id} className={css["acquisition"]}>
				<h2 className={css["acquisition__title"]}>{blok.title}</h2>
				<div className={css["acquisition__text"]}>{RichTextToHTML({document: blok.content, textClassName: css["acquisition__text"], linkClassName:["acquisition__emphmail"], imgClassName:["acquisition__chatbubble"]})}</div>
				{/* <p className={css["acquisition__text"]}>Contact us at <a className={css["acquisition__emphmail"]} href={"mailto:" + "jobs@tml.com"}>jobs@tml.com</a> or use the <span><ChatBubble className={css["acquisition__chatbubble"]}/></span> below.</p> */}
			</section>
		</>
	);
}


Acquisition.propTypes = {
	title: PropTypes.string,
	email: PropTypes.string
};