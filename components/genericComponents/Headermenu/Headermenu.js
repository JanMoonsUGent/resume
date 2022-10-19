import React, { Component } from "react";
import css from "./Headermenu.module.scss";
import { TmlButton } from "../TmlButton/TmlButton";
import Link from "next/link";
import { storyblokEditable, StoryblokComponent } from "@storyblok/react";


export default class Headermenu extends Component {

	constructor(props) {
		super(props);
		this.state = {
			showNavSideMenu: false,
			showSearchFlyout: false,
			expandedNavDropdownOpened: false
		};

	}

	toggleNavSideMenu(setPreventDefault, e) {
		if (setPreventDefault) { e.preventDefault(); }
		this.setState(prevState => ({
			showNavSideMenu: !prevState.showNavSideMenu,
			expandedNavDropdownOpened: false
		}));
	}

	toggleExpandedNavDropdown(e) {
		e.stopPropagation();
		this.setState(prevState => ({
			expandedNavDropdownOpened: !prevState.expandedNavDropdownOpened
		}));
	}

	closeExpandedNavDropdown() {
		this.setState({
			expandedNavDropdownOpened: false
		});
	}

	navSideMenu() {
		return (
			<nav {...storyblokEditable(this.props.blok)} className={css["main-header__expanded-nav"]}>
				<ul className={[css["main-header__expanded-nav-list"]].join("\n")} onClick={this.closeExpandedNavDropdown.bind(this)}>
					<li className={css["main-header__expanded-nav-item--home"]} key="mainlogo">
						<a href="/">
							<div className={css["main-header__nav-home-container"]}>
								<img src="/images/tml-title-logo.svg" alt="The Master Labs logo" className={css["main-header__nav-home-logo"]} />
								<img src="/images/tml-title-logo--small.svg" alt="The Master Labs logo" className={css["main-header__nav-home-logo--mobile"]} />
							</div>
						</a>
					</li>
					{this.props.blok.menucontent.map((nestedBlok, index, array) => {

						return (
							<>
								<li className={css[`main-header__expanded-nav-item--${index}`]} key={nestedBlok._uid}>
									<StoryblokComponent blok={nestedBlok} last={false} index={index} mobile={true} />
								</li>
							</>
						)


					})}
					{/* <li className={css["main-header__expanded-nav-item--joinus"]}>
						<TmlButton variant="hover-blue" link href="/joinus">Join us</TmlButton>
					</li> */}
				</ul>
				<div
					className={css["main-header__expanded-greyed-out-zone"]}
					role="button"
					tabIndex={-1}
					onKeyPress={this.toggleNavSideMenu.bind(this, true)}
					onClick={this.toggleNavSideMenu.bind(this, true)} />
			</nav>
		);
	}


	render() {
		return (
			<>
				<header {...storyblokEditable(this.props.blok)} className={css["main-header"]}>
					<nav className={css["main-header__nav"]}>
						<nav className={css["main-header__nav-home"]}>
							<a href="/">
								<div className={css["main-header__nav-home-container"]}>
									<img src="/images/tml-title-logo.svg" alt="The Master Labs logo" className={css["main-header__nav-home-logo"]} />
									<img src="/images/tml-title-logo--small.svg" alt="The Master Labs logo" className={css["main-header__nav-home-logo--mobile"]} />
								</div>
							</a>
						</nav>
						<ul className={css["main-header__nav-list"]}>
							<li key="sidenav"
								className={css["main-header__nav-item--menu"]}>
								<span className="mdi mdi-menu"
									role="button"
									tabIndex={0}
									onKeyPress={this.toggleNavSideMenu.bind(this, true)}
									onClick={this.toggleNavSideMenu.bind(this, true)} />
							</li>
							{this.props.blok.menucontent.map((nestedBlok, index, array) => {
								if (array.length - 1 !== index) {
									return (
										<>
											<li className={css[`main-header__nav-item--${index}`]} key={nestedBlok._uid}>
												<StoryblokComponent blok={nestedBlok} last={false} index={index} mobile={false} />
											</li>
										</>
									)
								}
								else {
									return (
										<>
											<li className={css[`main-header__nav-item--last`]} key={nestedBlok._uid}>
												<StoryblokComponent blok={nestedBlok} last={true} index={index} mobile={false} />
											</li>
										</>
									)
								}
							})}
						</ul>
					</nav>

					{this.state.showNavSideMenu ? this.navSideMenu() : <></>}
				</header>
			</>
		);
	}
}