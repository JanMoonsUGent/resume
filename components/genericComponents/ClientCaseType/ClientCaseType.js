import css from "./ClientCaseType.module.scss";
import {modifyStoryBlokImage} from "../../../functions/StoryBlokImageHelper";

export default function ClientCaseType({className, tag, variation, children, icon, href, target, src, alt}){
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