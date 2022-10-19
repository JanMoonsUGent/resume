import React, {Component} from "react";
import css from "./IntroVideo.module.scss";
import YouTubePlayer from "react-player/youtube";
import WistiaPlayer from "react-player/wistia";
import PropTypes from "prop-types";
import {modifyStoryBlokImage} from "../../../functions/StoryBlokImageHelper";

export default class IntroVideo extends Component {
	
	constructor(props) {
		super(props);

		this.stillImage =
			{
				filename: this.props.video.videoStill.filename,
				alt: this.props.video.videoStill.alt
			};
		
		this.videoRef = React.createRef();
		this.state = {
			play: false,
			playText: "intro-video__video-stopped"
		};

		this.playVideo = this.playVideo.bind(this);
		this.stopVideo = this.stopVideo.bind(this);
	}

	playVideo() {
		this.setState({
			play: true,
			playText: "intro-video__video-playing"
		});
	}

	stopVideo() {
		this.setState({
			play: false,
			playText: "intro-video__video-stopped"
		});
	}
	

	render() {
		return (
			<>
				<div
					className={css["intro-video"]}
					role="button"
					tabIndex={-1}
					onKeyPress={this.playVideo}
					onClick={this.playVideo}>
					<div className={css["intro-video__play-icon-wrapper" + (this.props.hasUnderText ? "" : "--no-undertext")]}>
						<img className={[css["intro-video__play-icon"], "lazyload"].join(" ")}
							data-src="/images/componentImages/introVideo/playbutton.svg"
							alt="video play button"/>
						<p className={css["intro-video__play-icon-text"]}>play video</p>
					</div>
					<img className={[css["intro-video__left-marks" + (this.props.hasUnderText ? "" : "--no-undertext")], "lazyload"].join(" ")}
						data-src="/images/componentImages/introVideo/leftmarks.svg"
						alt="icon left marks"/>
					<img className={[css["intro-video__right-marks"], "lazyload"].join(" ")}
						data-src="/images/componentImages/introVideo/rightmarks.svg"
						alt="icon right marks"/>
					<img className={[css["intro-video__posterimage"], "lazyload"].join(" ")}
						data-src={modifyStoryBlokImage(this.stillImage.filename, {width: 800})}
						alt={this.stillImage.alt || "video still"}/>
					{this.props.hasUnderText && <div className={css["intro-video__watch-video-text"]}>watch introduction</div>}
				</div>
				<div className={[css["intro-video__video-player"], css[this.state.playText]].join(" ")}>
					<div className={css["intro-video__video-player-frame"]}>
						{this.props.video.videoType === "YouTube" &&
						<YouTubePlayer ref={this.videoRef} playing={this.state.play} url={"https://www.youtube.com/watch?v="+this.props.video.videoId} controls={true} width={"100%"} height={"100%"}/>}
						{this.props.video.videoType === "Wistia" &&
						<WistiaPlayer ref={this.videoRef} playing={this.state.play} url={"https://themasterchannel.wistia.com/medias/"+this.props.video.videoId} controls={true} width={"100%"} height={"100%"}/>}
					</div>
					<div
						className={css["intro-video__video-player-background"]}
						role="button"
						tabIndex={0}
						onKeyPress={this.stopVideo}
						onClick={this.stopVideo}
					/>
				</div>
			</>
		);
	}
}