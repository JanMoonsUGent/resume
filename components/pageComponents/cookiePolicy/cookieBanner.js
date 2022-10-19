import { Component } from "react";
import css from "./cookieBanner.module.scss";
import { TmlButton } from "../../genericComponents/TmlButton/TmlButton";
import scriptLoader from "../../../analytics/scriptLoader";
import Cookies from "js-cookie";
import Link from "next/link";

import { includes } from "lodash";

export class CookieBanner extends Component {

	constructor(props) {
		super(props);
		this.state = {
			show: false
		};
	}

	shouldHideBannerForPath(path) {
		return includes([
			"/cookiepolicy",
			"/privacypolicy"
		], path) ||
			path.slice(0, 9) === "/preview/";
	}

	componentDidMount() {
		const existingCookie = Cookies.get("hideCookieBar");
		const doNotShowOnThisPage = this.shouldHideBannerForPath(window.location.pathname);

		if (existingCookie || doNotShowOnThisPage) {
			this.hide();
		} else {
			this.show();
		}

	}

	show() {
		document.body.classList.add("showCookiePolicy");
		this.setState({
			show: true
		});
	}

	hide() {
		document.body.classList.remove("showCookiePolicy");
		this.setState({
			show: false
		});
	}

	acceptAll() {
		scriptLoader.acceptAll();
		this.hide();
		window.location.reload();
	}

	render() {
		if (!this.state.show) {
			return <></>;
		}

		return (
			<>
				<div className={css["cookiebanner-cover"]} />
				<div className={css["cookiebanner"]}>
					<div className={css["cookiebanner__description"]}>
						<p>The Master Labs uses cookies to improve
							your learning experience by optimizing your
							interaction
							with our website and services, to offer content suited to your preferences and to show you
							more
							relevant advertisements.</p>
					</div>
					<div className={css["cookiebanner__actions"]}>
						<TmlButton onClick={this.acceptAll.bind(this)} variant="blue">
							Accept all
						</TmlButton>
						<Link href="/cookiepolicy"><a className={css["cookiebanner__configure-action"]} >Learn more & configure</a></Link>
					</div>
				</div>
			</>
		);
	}
}