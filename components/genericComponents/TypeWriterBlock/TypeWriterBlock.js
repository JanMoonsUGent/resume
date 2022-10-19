import React, {Component} from "react";
import Typewriter from "typewriter-effect";
import css from "./TypeWriterBlock.module.scss";
import PropTypes from "prop-types";
import GetColorCode from "../../../functions/colorCodeHelper";

export default class TypeWriterBlock extends Component {
	constructor(props) {
		super(props);
	}
	
	render() {
		let mappedTypeWriterItems = this.props.typewriter[0].typewriteritem.map(twi => {
			return {...twi, colorCssName: GetColorCode(twi.color_code.content.Description)};
		});
		
		return (
			<h1 className={css["typewriterbuildbetter"]}>
				{this.props.typewriter[0].pretext && <p>{this.props.typewriter[0].pretext}</p>}
				<Typewriter
					options={{
						loop:this.props.typewriter[0].loop,
						delay:this.props.typewriter[0].speed,
						deleteSpeed:this.props.typewriter[0].deletespeed, 
						cursor:"",
					}} 
					onInit={(typewriter) => {
						mappedTypeWriterItems.forEach((twi, index, array) => {
							if(index!==array.length-1){
								typewriter
								.changeCursor("<span class='typewriter-actualcursor typewriter-actualcursor-" + twi.colorCssName + "'>|</span>")
								.pauseFor(300)
								.typeString("<span class='buildbetterword buildbetterword-" + twi.colorCssName + "'>"+twi.lineoftext+"</span>")
								.pauseFor(800)
								.deleteChars(twi.lineoftext.length)
								.pauseFor(50);
							} else {
								typewriter
								.changeCursor("<span class='typewriter-actualcursor typewriter-actualcursor-" + twi.colorCssName + "'>|</span>")
								.pauseFor(300)
								.typeString("<span class='buildbetterword buildbetterword-" + twi.colorCssName + "'>"+twi.lineoftext+"</span>")
							}
							
						});
						
						typewriter
							.changeCursor("<span class='noanimcursor'></span>")
							.stop()
							.start();
					}}
				/>
				{this.props.typewriter[0].posttext && <p>{this.props.typewriter[0].posttext}</p>}
			</h1>
		);
	}
}

TypeWriterBlock.propTypes = {
	typeWriter: PropTypes.object
};