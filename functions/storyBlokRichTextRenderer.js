import { render, MARK_BOLD, MARK_LINK, NODE_PARAGRAPH, NODE_HEADING, NODE_OL, NODE_UL, NODE_LI, NODE_IMAGE } from "storyblok-rich-text-react-renderer";
import css from "../styles/RichTextToHTML.module.scss";
import PropTypes from "prop-types";
import {modifyStoryBlokImage, GetOriginalDimensions} from "./StoryBlokImageHelper";
import "lazysizes";
import "lazysizes/plugins/attrchange/ls.attrchange";

function MarkBoldResolver(children, boldClassName) {
	return (
		<span className={[css["rich-text__highlighted-text"], boldClassName].join(" ")}>{children}</span>
	);
}

function MarkLinkResolver(children, { href, target, linktype }, linkClassName) {
	if (linktype === "email") {
		return <a className={[css["rich-text__link"], linkClassName].join(" ")} href={`mailto:${href}`}>{children}</a>;
	}
	if (href.match(/^(https?:)?\/\//)) {
		return <a className={[css["rich-text__link"], linkClassName].join(" ")} href={href} target={target}>{children}</a>;
	}
	return <a href={href} className={[css["rich-text__link"], linkClassName].join(" ")}>{children}</a>;
}

function NodeParagraphResolver(children, textClassName) {
	return (
		<p className={[css["rich-text__text"], textClassName].join(" ")}>{children}</p>
	);
}

function NodeHeadingResolver(children, { level }, h1className, h2className, h3className, h4className, h5className, h6className) {
	switch (level) {
	case 1:
		return <h1 className={[css["rich-text__title"], h1className].join(" ")}>{children}</h1>;
	case 2:
		return <h2 className={[css["rich-text__title"], h2className].join(" ")}>{children}</h2>;
	case 3:
		return <h3 className={[css["rich-text__subtitle"], h3className].join(" ")}>{children}</h3>;
	case 4:
		return <h4 className={[css["rich-text__small-title"], h4className].join(" ")}>{children}</h4>;
	case 5:
		return <h5 className={[css["rich-text__small-title"], h5className].join(" ")}>{children}</h5>;
	default:
		return <h6 className={[css["rich-text__small-title"], h6className].join(" ")}>{children}</h6>;
	}
}

function NodeOlResolver(children, olClassName) {
	return (
		<ol className={[css["rich-text__ordered-list"], olClassName].join(" ")}>{children}</ol>
	);
}

function NodeUlResolver(children, ulClassName) {
	return (
		<ul className={[css["rich-text__unordered-list"], ulClassName].join(" ")}>{children}</ul>
	);
}

function NodeLiResolver(children, liClassName) {
	return (
		<li className={liClassName}><div>{children}</div></li>
	);
}

function NodeImageResolver(children, { src, alt, title }, imgClassName, imageSizeLimit) {

	if(imageSizeLimit){
		let url = new URL(src);
		if(url.hostname === "a.storyblok.com"){
			const imgWidth = GetOriginalDimensions(src).width;
			return <img className={[css["rich-text__image"+(imgWidth <= 60 ? "--small" : "")], imgClassName, "lazyload"].join(" ")} data-src={modifyStoryBlokImage(src, imageSizeLimit)} alt={alt} title={title}/>;
		}
	}

	return (
		<img className={[css["rich-text__image"], imgClassName, "lazyload"].join(" ")} data-src={src} alt={alt} title={title}/>
	);
}

function BiColoredTitleMarkBoldResolver(children, colorScheme, boldClassName) {
	return (
		<span className={[css["bi-colored-rich-title__highlighted-text"+colorScheme], boldClassName].join(" ")}>{children}</span>
	);
}

function BiColoredTitleNodeParagraphResolver(children, textClassName) {
	return (
		<span className={[css["bi-colored-rich-title__text"], textClassName].join(" ")}>{children}</span>
	);
}


export function RichTextToHTML({
	document,
	containerClassName,
	boldClassName,
	textClassName,
	linkClassName,
	h1className,
	h2className,
	h3className,
	h4className,
	h5className,
	h6className,
	olClassName,
	ulClassName,
	liClassName,
	imgClassName,
	imageSizeLimit
}) {
	return (
		<div className={[css["rich-text"], containerClassName].join(" ")}>
			{render(document, {
				markResolvers: {
					[MARK_BOLD]: (children) => MarkBoldResolver(children, boldClassName),
					[MARK_LINK]: (children, { href, target, linktype }) => MarkLinkResolver(children, { href, target, linktype }, linkClassName)
				},
				nodeResolvers: {
					[NODE_PARAGRAPH]: (children) => NodeParagraphResolver(children, textClassName),
					[NODE_HEADING]: (children, { level }) => NodeHeadingResolver(children, { level }, h1className, h2className, h3className, h4className, h5className, h6className),
					[NODE_OL]: (children) => NodeOlResolver(children, olClassName),
					[NODE_UL]: (children) => NodeUlResolver(children, ulClassName),
					[NODE_LI]: (children) => NodeLiResolver(children, liClassName),
					[NODE_IMAGE]: (children, { src, alt, title }) => NodeImageResolver(children, { src, alt, title }, imgClassName, imageSizeLimit)
				},
				defaultStringResolver: NodeParagraphResolver
			})}
		</div>
	);
}

RichTextToHTML.propTypes = {
	document: PropTypes.object,
	containerClassName: PropTypes.string,
	textClassName: PropTypes.string,
	boldClassName: PropTypes.string,
	linkClassName: PropTypes.string,
	h1className: PropTypes.string,
	h2className: PropTypes.string,
	h3className: PropTypes.string,
	h4className: PropTypes.string,
	h5className: PropTypes.string,
	h6className: PropTypes.string,
	olClassName: PropTypes.string,
	ulClassName: PropTypes.string,
	liClassName: PropTypes.string,
	imgClassName: PropTypes.string,
	imageSizeLimit: PropTypes.object
};

// Choose as colorScheme between: blue, purple, yellow, red and green
export function BiColoredRichTitleToHTML({ document, colorScheme, boldClassName, textClassName }) {
	colorScheme = "--"+(colorScheme || "blue");
	return(
		<span className={css["bi-colored-rich-title"]}>
			{render(document, {
				markResolvers: {
					[MARK_BOLD]: (children) => BiColoredTitleMarkBoldResolver(children, colorScheme, boldClassName),
				},
				nodeResolvers: {
					[NODE_PARAGRAPH]: (children) => BiColoredTitleNodeParagraphResolver(children, textClassName)
				},
				defaultStringResolver: BiColoredTitleNodeParagraphResolver
			})}
		</span>
	);
}

BiColoredRichTitleToHTML.propTypes = {
	document: PropTypes.object,
	colorScheme: PropTypes.string,
	textClassName: PropTypes.string,
	boldClassName: PropTypes.string
};

export function RichTextToString(obj) {
	let res = "";
	if(typeof obj === "string") {
		return obj;
	}
	if (obj["text"]) {
		res += obj["text"];
	}
	if(obj["content"]) {
		for(let cont of obj["content"]) {
			res += RichTextToString(cont);
		}
	}
	return res;
}
