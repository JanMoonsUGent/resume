import React from "react";
import css from "./PageNavigator.module.scss";
import PropTypes from "prop-types";
import { Link } from "react-scroll";

export default function PageNavigator({title, navigationLinks}) {
	return (
		<>
			<nav className={css["page-navigator"]}>
				<h2 className={css["page-navigator__title"]}>{title}</h2>
				{navigationLinks.map((nav, i) =>
					<Link to={nav.id}
						key={"page-navigator__" + nav.id + "__" + i}
						spy={true}
						smooth={true}
						duration={500}
						activeClass={css["page-navigator__section-name--active"]}
						className={css["page-navigator__section-name"]}>
						{nav.title}
					</Link>)}
			</nav>
		</>
	);
}

PageNavigator.propTypes = {
	title: PropTypes.string,
	navigationLinks: PropTypes.arrayOf(PropTypes.shape({
		id: PropTypes.string,
		title: PropTypes.string
	}))
};