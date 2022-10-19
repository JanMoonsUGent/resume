import React from "react";
import css from "./TagList.module.scss";
import PropTypes from "prop-types";
import Tag from "../Tag/Tag";

export default function TagList({tags, variation, center}) {
	return(
		<ul className={css["tag-list" + (center ? "--centered" : "")]}>
			{tags.map((tag, i) =>
				<li key={tag.name+i}>
					<Tag icon={tag.icon} variation={variation}>{tag.name}</Tag>
				</li>)}
		</ul>
	);
}

TagList.propTypes = {
	tags: PropTypes.arrayOf(PropTypes.object),
	variation: PropTypes.string,
	center: PropTypes.bool
};