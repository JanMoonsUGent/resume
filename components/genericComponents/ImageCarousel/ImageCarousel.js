import React, { Component } from "react";
import css from "./ImageCarousel.module.scss";
import PropTypes from "prop-types";
import { storyblokEditable } from "@storyblok/react";
import {RichTextToHTML} from "../../../functions/storyBlokRichTextRenderer";

export default class ImageCarousel extends Component {
    learningTargetsContainer;

    constructor(props) {
        super(props);

        this.state = {
            pos: { top: 0, left: 0, x: 0, y: 0 },
            showLeftArrow: false,
            showRightArrow: true
        }

        this.mouseDownHandler = this.mouseDownHandler.bind(this);
        this.mouseMoveHandler = this.mouseMoveHandler.bind(this);
        this.mouseUpHandler = this.mouseUpHandler.bind(this);
    }

    mouseDownHandler(e) {
        e.stopPropagation();
        e.preventDefault();

        this.setState({
            pos: {
                left: this.learningTargetsContainer.scrollLeft,
                top: this.learningTargetsContainer.scrollTop,
                x: e.clientX,
                y: e.clientY,
            }
        });

        document.addEventListener("mousemove", this.mouseMoveHandler);
        document.addEventListener("mouseup", this.mouseUpHandler);
    }

    mouseMoveHandler(e) {
        e.stopPropagation();
        e.preventDefault();

        const dx = e.clientX - this.state.pos.x;
        const dy = e.clientY - this.state.pos.y;

        this.learningTargetsContainer.scrollTop = this.state.pos.top - dy;
        this.learningTargetsContainer.scrollLeft = this.state.pos.left - dx;
    }

    mouseUpHandler(e) {
        e.stopPropagation();
        e.preventDefault();

        document.removeEventListener("mousemove", this.mouseMoveHandler);
        // check new position to update arrows -> can maybe be refactored
        const cardWidth = this.learningTargetsContainer.children[0].getBoundingClientRect().width;
        const newPosition = this.learningTargetsContainer.scrollLeft;
        const cardMarginRight = Number(window.getComputedStyle(this.learningTargetsContainer.children[0]).marginRight.replace("px", ""));
        this.checkDisplayedArrows(newPosition, cardWidth + cardMarginRight);
    }

    scrollCarousel(invertDirection) {
        const cardWidth = this.learningTargetsContainer.children[0].getBoundingClientRect().width;
        const currentPosition = this.learningTargetsContainer.scrollLeft;
        const cardMarginRight = Number(window.getComputedStyle(this.learningTargetsContainer.children[0]).marginRight.replace("px", ""));
        const scrollInterval = cardWidth + cardMarginRight;
        const newPosition = invertDirection ? Math.ceil((currentPosition - scrollInterval) / scrollInterval) * scrollInterval : Math.floor((currentPosition + scrollInterval) / scrollInterval) * scrollInterval;

        this.learningTargetsContainer.scroll({
            left: newPosition,
            top: 0,
            behavior: "smooth"
        });
        this.checkDisplayedArrows(newPosition, scrollInterval);
    }

    checkDisplayedArrows(newPosition, scrollInterval) {
        if (document.body.clientWidth < 800) return;
        this.setState({ showLeftArrow: (newPosition !== 0) });
        this.setState({ showRightArrow: (newPosition + scrollInterval < this.learningTargetsContainer.scrollWidth) });
    }

    componentDidMount() {
        this.learningTargetsContainer = document.getElementById("image-carousel__images");
        if (document.body.clientWidth < 800) {
            this.setState({ showLeftArrow: true, showRightArrow: true });
        }
    }

    render() {
        return (
            <>
                <section  {...storyblokEditable(this.props.blok)} className={css["imagecarouselwrapper"]}>
                    <h2 className={css["imagecarouselwrapper__title"]}>{this.props.blok.title}</h2>
                    {RichTextToHTML({document: this.props.blok.intro, textClassName: css["imagecarouselwrapper__subtitle"], linkClassName:["imagecarousel__emphmail"]})}
                    <div className={css["image-carousel__images-container"]}>
                        <ul id={"image-carousel__images"} className={css["image-carousel__images"]} onMouseDown={this.mouseDownHandler}>
                            {this.props.blok.images.map((imt, i) =>
                                <li className={css["image-carousel__image-container"]} key={imt._uid}>
                                    <img className={css["image-carousel__image"]} src={imt.image.filename} alt={imt.image.alt} />
                                    <p className={css["image-carousel__description"]}>{imt.description}</p>
                                </li>)}
                        </ul>
                        {(this.state.showLeftArrow) && <span
                            className={["mdi", "mdi-arrow-left", css["image-carousel__arrow-left"]].join(" ")}
                            role="button"
                            tabIndex={-1}
                            onKeyPress={() => this.scrollCarousel(true)}
                            onClick={() => this.scrollCarousel(true)}
                        />}
                        {(this.state.showRightArrow) && <span
                            className={["mdi", "mdi-arrow-right", css["image-carousel__arrow-right"]].join(" ")}
                            role="button"
                            tabIndex={0}
                            onKeyPress={() => this.scrollCarousel(false)}
                            onClick={() => this.scrollCarousel(false)}
                        />}
                    </div>
                </section>
            </>
        );
    }
}

ImageCarousel.propTypes = {
    imagesWithText: PropTypes.arrayOf(PropTypes.shape({
        _uid: PropTypes.string,
        image: PropTypes.shape({
            filename: PropTypes.string,
            alt: PropTypes.string
        }),
        description: PropTypes.string
    }))
};