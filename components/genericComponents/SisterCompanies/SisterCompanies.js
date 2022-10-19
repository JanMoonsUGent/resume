import React from "react";
import css from "./SisterCompanies.module.scss";

export default function SisterCompanies({blok}) {

	return (
		<>
			<section className={css["sister-companies"]}>
				<h2 className={css["sister-companies__title"]}>{blok.text}</h2>
				{/* <img className={css["sister-companies__arrow--left"]}
					src="images/pageImages/home/sisterCompanies/livelearning.svg"
					alt="left arrow to live learning link"/> */}
				<div className={css["sister-companies-list"]}>
					<div className={css["sister-companies-list-item"]}>
						<a className={css["sister-companies-list-item__image-link--tmla"]} href="https://www.themasterlabsacademy.com">
							<img className={css["sister-companies-list-item__twin-image"]}
								src="/images/tmla-title-logo.svg"
								alt="link to the master labs academy" />
							<img className={css["sister-companies-list-item__twin-image--mobile"]}
								src="/images/tmla-title-logo--small.svg"
								alt="link to the master labs academy" />
						</a>
					</div>

					<div className={css["sister-companies-list-item"]}>
						<a className={css["sister-companies-list-item__image-link--tmc"]} href="https://www.themasterchannel.com">
							<img src="/images/tmc-title-logo.svg"
								alt="link to the master channel" />
						</a>
					</div>
				</div>

				{/* <img className={css["sister-companies__arrow--right"]}
					src="images/pageImages/home/sisterCompanies/e-learning.svg"
					alt="right arrow to e-learning link"/> */}

			</section>
		</>
	);
}