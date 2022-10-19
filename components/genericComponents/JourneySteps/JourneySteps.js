import React from "react";
import css from "./JourneySteps.module.scss";
import PropTypes from "prop-types";
import JourneyBlock from "../JourneyBlock/JourneyBlock";
import { storyblokEditable } from "@storyblok/react";

export default function JourneySteps({ blok }) {

    return (
        <section {...storyblokEditable(blok)} className={css["journey-steps"]}>
            <h2 className={css["journey-steps__title"]}>{blok.title}</h2>
            {blok.journeyblocks.map((jb, i) =>
                <JourneyBlock blok = {jb} content={jb.journeysteps} direction={jb.direction === "ImageRight" ? "reverse" : ""} key={"dynaCon_"+jb.journeysteps[0].title+"_"+i}/>)}
        </section>
    );
}

JourneySteps.propTypes = {
    journeyBlocks: PropTypes.arrayOf(PropTypes.object)
};