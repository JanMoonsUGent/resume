import { storyblokEditable, StoryblokComponent } from "@storyblok/react";
import React from "react";
import css from "./Menulink.module.scss";
import { RichTextToHTML } from "../../../functions/storyBlokRichTextRenderer";
import Link from "next/link"

export default function Menulink({ blok, last, index, key, mobile }) {
	return (
		<>
		{mobile && <div {...storyblokEditable(blok)}
		 className={css["mobile-main-header__nav-item-inner"]}>
			<Link href={blok.link.cached_url}  >
				<a className={css["buttonlink-" + last]}>{RichTextToHTML({ document: blok.name, textClassName: css["main-header__dropdown-item-maintext"], boldClassName: css["main-header__dropdown-item-text--highlighted"] })}</a>
			</Link>
			{blok.submenulinks != undefined && blok.submenulinks.length > 0 &&
				<div className={css["mobile-main-header__nav-dropdown-wrapper"]}>
					<div className={css["mobile-main-header__nav-dropdown"]}>
						{blok.submenulinks.map((submenulink, index, array) => {
							return (
								<>
									<Link key={submenulink._uid} href={"/"+submenulink.link.cached_url}>
										<a className={css["mobile-main-header__dropdown-item-container"]}>
											<img src={submenulink.icon.filename} alt={submenulink.icon.alt} />
											<div>{RichTextToHTML({ document: submenulink.name, textClassName: css["main-header__dropdown-item-text"], boldClassName: css["main-header__dropdown-item-text--highlighted"] })}</div>
										</a>
									</Link>
								</>
							)
						})}
					</div>
				</div>
			}

		</div>}
		{!mobile && <div {...storyblokEditable(blok)}
		 className={css["main-header__nav-item-inner"]}>
			<Link href={blok.link.cached_url}  >
				<a className={css["buttonlink-" + last]}>{RichTextToHTML({ document: blok.name, textClassName: css["main-header__dropdown-item-maintext"], boldClassName: css["main-header__dropdown-item-text--highlighted"] })}</a>
			</Link>
			{blok.submenulinks != undefined && blok.submenulinks.length > 0 &&
				<div className={css["main-header__nav-dropdown-wrapper"]}>
					<div className={css["main-header__nav-dropdown"]}>
						{blok.submenulinks.map((submenulink, index, array) => {
							return (
								<>
									<Link key={submenulink._uid} href={"/"+submenulink.link.cached_url}>
										<a className={css["main-header__dropdown-item-container"]}>
											<img src={submenulink.icon.filename} alt={submenulink.icon.alt} />
											<div>{RichTextToHTML({ document: submenulink.name, textClassName: css["main-header__dropdown-item-text"], boldClassName: css["main-header__dropdown-item-text--highlighted"] })}</div>
										</a>
									</Link>
								</>
							)
						})}
					</div>
				</div>
			}

		</div>}
		</>
	);
}