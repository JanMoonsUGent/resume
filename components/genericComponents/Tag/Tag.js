import css from "./tag.module.scss";
import PropTypes from "prop-types";
import {modifyStoryBlokImage} from "../../../functions/StoryBlokImageHelper";

export default function Tag({className, tag, variation, children, icon, href, target, src, alt}){
	let defaultStyling = css["tag--" + (variation || "primary") ];
	let styles = [defaultStyling, className || ""].join("\r\n");
	const TagType = href ? "a" : (tag || "div");
	return <TagType className={styles} href={href} target={target}>
		{
			icon ? <span className={["mdi", "mdi-" + icon, css["tag__icon"]].join(" ")}/> :
				src ? <img src={modifyStoryBlokImage(src, {width: 50})} alt={alt} className={css["tag__image"]}/> :
					<span className={css["tag__icon--empty"]}/>
		}
		<span className={css["tag__text"]}>{children}</span>
	</TagType>;    
}

Tag.propTypes = {
	className: PropTypes.string,
	tag: PropTypes.object,
	variation: PropTypes.string,
	children: PropTypes.node,
	icon: PropTypes.string,
	href: PropTypes.string,
	src: PropTypes.string,
	alt: PropTypes.string,
	target: PropTypes.string
};