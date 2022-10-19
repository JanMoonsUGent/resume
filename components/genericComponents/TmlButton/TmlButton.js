import { Component } from "react";
import css from "./TmlButton.module.scss";
import PropTypes from "prop-types";
import Link from "next/link";

export class TmlButton extends Component {
	constructor(props) {
		super(props);
		const styles = [];

		if (props.variant) {
			styles.push(css[`tml-button--${props.variant}`]);
		} else {
			styles.push(css["tml-button--primary"]);
		}

		if (props.className) {
			styles.push(props.className);
		}
		this.buttonStyles = styles.join("\r\n");
	}

	click() {
		if (this.props.onClick && typeof this.props.onClick === "function") {
			this.props.onClick(...arguments);
		}
	}

	render() {
		if (this.props.link) {

			return (
				<a id={this.props.id} href={this.props.href} className={this.buttonStyles}>
					{this.props.children}
				</a>
			);
		}

		if (this.props.to) {

			return (
				<Link id={this.props.id} href={this.props.to}  >
					<a className={this.buttonStyles}>
						{this.props.text}
					</a>
				</Link>
			);
		}

		return (
			<button id={this.props.id} type="button" className={this.buttonStyles} onClick={this.click.bind(this)}>
				{this.props.children}
			</button>
		);
	}
}

TmlButton.propTypes = {
	variant: PropTypes.string,
	className: PropTypes.string,
	onClick: PropTypes.func,
	link: PropTypes.bool,
	id: PropTypes.string,
	href: PropTypes.string,
	children: PropTypes.node,
	to: PropTypes.string,
	smooth: PropTypes.bool,
	spy: PropTypes.bool,
	activeClass: PropTypes.string,
	duration: PropTypes.number
};