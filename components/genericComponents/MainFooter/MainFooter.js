import React from "react";
import css from "./MainFooter.module.scss";
import { ScriptLoaderComponent } from "../../../analytics";
import { CookieBanner } from "../../pageComponents/cookiePolicy/cookieBanner";
import Link from "next/link";
import Script from "next/script"

export default function MainFooter() {
	return (
		<>
			<footer className={css["main-footer"]}>
				<nav className={css["main-footer__tml-home-link"]}>
					<a href="/">
						<div className={css["main-footer__tml-logo-container"]}>
							<img src="/images/tml-title-logo.svg" alt="The Master Labs logo" className={css["main-footer__tml-logo"]} />
							<img src="/images/tml-title-logo--small.svg" alt="The Master Labs logo" className={css["main-footer__tml-logo--mobile"]} />
						</div>
					</a>
				</nav>
				<nav className={css["main-footer__services"]}>
					<p className={css["main-footer__sub-title"]}><Link href="/"><a>Home</a></Link></p>
				</nav>
				<nav className={css["main-footer__features"]}>
					<p className={css["main-footer__sub-title"]}><Link href="/#a34162d7-3d55-4d37-8aeb-d0c88a1f45cc"><a>Services</a></Link></p>
				</nav>
				<nav className={css["main-footer__testimonials"]}>
					<p className={css["main-footer__sub-title"]}><Link href="/pages/about-us"><a>About us</a></Link></p>
				</nav>
				{/* <nav className={css["main-footer__testimonials"]}>
					<p className={css["main-footer__sub-title"]}><a href="/#home-page__testimonial-carousel">Testimonials</a></p>
				</nav> */}
        <nav className={css["main-footer__stories"]}>
          <p className={css["main-footer__sub-title"]}><Link href="/pages/stories"><a>Stories</a></Link></p>
        </nav>
				<nav className={css["main-footer__joinus"]}>
					<p className={css["main-footer__sub-title"]}><Link href="/pages/join-us"><a>Join us</a></Link></p>
				</nav>

				<nav className={css["main-footer__address"]}>
					<ul className={css["main-footer__nav-list"]}>
						<li className={css["main-footer__header"]}>Kontich Offices</li>
						<li>Sleutelstraat 25</li>
						<li>2550 Kontich</li>
						<li>Belgium</li>
					</ul>
					<p className={css["main-footer__sub-title"]}><a href="https://www.google.be/maps/place/The+Master+Labs/@51.132673,4.4448423,17z/data=!3m1!4b1!4m5!3m4!1s0x47c3f08900d56c7b:0xd12d91e0303e7883!8m2!3d51.1326651!4d4.4470339">Directions</a></p>
				</nav>
				<nav className={css["main-footer__linkedin-link"]}>
					<ul className={css["main-footer__nav-list"]}>
						<li className={css["main-footer__tml-link"]}>
							<span className={["mdi", "mdi-linkedin", css["main-footer__link-icon"]].join(" ")} />
							<p className={css["main-footer__link-text"]}><a href="https://www.linkedin.com/company/the-master-labs">Linkedin</a></p>
						</li>
					</ul>
				</nav>

				<nav className={css["main-footer__policies"]}>
					<ul className={css["main-footer__nav-list--small-bottom"]}>
						{/* <li><a href="/termsofuse">Terms</a></li>
						<li><a href="/privacypolicy">Privacy</a></li>
						<li><a href="/cookiepolicy">Cookies</a></li> */}
						<li>&copy; The Master Labs 2022</li>
					</ul>
				</nav>
			</footer>
			{/*ToDo: Are we going to use leadfeeder? + determine which scripts we are going to use!*/}
			{/*ToDo: Other scripts must be decided and changed to correct urls!!*/}
			<ScriptLoaderComponent />
			<script async src="https://polyfill.io/v3/polyfill.min.js?features=smoothscroll" />
			<Script id="tawktoscriptwrapper" dangerouslySetInnerHTML={{
					__html: `var Tawk_API=Tawk_API||{ }, Tawk_LoadStart=new Date();
            (function(){
            var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
            s1.async=true;
            s1.src='https://embed.tawk.to/62504aeb7b967b1179897461/1g04q9al1';
            s1.charset='UTF-8';
            s1.setAttribute('crossOrigin','*');
            s0.parentNode.insertBefore(s1,s0);})();`,
				}}>
			</Script>
			{/* <CookieBanner/> */}
		</>
	);
}
