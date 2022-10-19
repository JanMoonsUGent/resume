import React, {Component} from "react";
import Lottie from "react-lottie-player";
import PropTypes from "prop-types";

export default class LazyLottie extends Component {
	constructor(props) {
		super(props);
		this.state = {
			videoInJsonFormat: null,
			play: false
		};
		this.ref = React.createRef();
	}

	async LoadVideo(videourl) {
		try {
			let url = videourl.replace("a.storyblok", "s3.amazonaws.com/a.storyblok");//is this clean? is to avoid CORS issues. Should not be necessary in production domain.
			const fetchResult = await fetch(url);
			let animationData = await fetchResult.json();
			this.setState({
				videoInJsonFormat: animationData
			});
		} catch (err) {
			console.log(err);
		}
	}

	componentDidMount() {
		this.loadObservers();
	}

	loadObservers() {
		if (typeof(IntersectionObserver) === "undefined" || !IntersectionObserver) {
			// for IE, just load immediately
			this.LoadVideo(this.props.video).then(() => {
				this.setState({
					play: true
				});
			});

			return;
		}
		
		let vm = this;

		const inscreenObserver = new IntersectionObserver((entries) => {
			entries.forEach(entry => {
				if (entry.isIntersecting !== this.state.play) {
					// console.log("setting playing from " + this.state.play + " to " +  entry.isIntersecting);
					this.setState({
						play: entry.isIntersecting
					});
				}
			});
		}, {threshold: vm.props.minimumVisible});


		let lazyLoadObserver = new IntersectionObserver((entries, observer) => {
			entries.forEach(entry => {
				if (!entry.isIntersecting) return;
				observer.unobserve(entry.target);
				this.LoadVideo(this.props.video).then(() => {
				});
			});
		}, {rootMargin: vm.props.lazyLoadMargin});

		inscreenObserver.observe(this.ref.current);
		lazyLoadObserver.observe(this.ref.current);

		this.intersectionObservers = [
			inscreenObserver,
			lazyLoadObserver
		];
	}

	componentWillUnmount() {
		if(!this.intersectionObservers) return;
		this.intersectionObservers.forEach(o => {
			o.disconnect();
		});
	}

	render() {
		return <div className={this.props.animationClassName} ref={this.ref}>
			{
				this.state.videoInJsonFormat ? <Lottie
					loop
					animationData={this.state.videoInJsonFormat}
					play={this.state.play}
				/> : <></>
			}
			
			
		</div>;
	}
}

LazyLottie.propTypes = {
	video: PropTypes.string,
	animationClassName: PropTypes.string
};