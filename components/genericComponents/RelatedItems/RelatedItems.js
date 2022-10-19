import React, {Component, createRef} from "react";
import PropTypes from "prop-types";
import css from "./RelatedItems.module.scss";

const maxDragMovementToBeConsideredAClick = 10;

export default class RelatedItems extends Component {
	constructor(props){
		super(props);

		this.state = {
			clickHandlerAttached: true,
			pos: { top: 0, left: 0, x: 0, y: 0 },
			showArrows: false,
			isMoving: false,
			positionAtDragStart: { x: 0, y : 0},
			lastClickTarget: null
		};

		this.relatedItemsRef = createRef();

		this.mouseDownHandler = this.mouseDownHandler.bind(this);
		this.mouseMoveHandler = this.mouseMoveHandler.bind(this);
		this.mouseUpHandler = this.mouseUpHandler.bind(this);
		this.clickHandler = this.clickHandler.bind(this);
		this.scrollCarousel = this.scrollCarousel.bind(this);
	}

	mouseDownHandler(e) {
		e.stopPropagation();
		e.preventDefault();

		this.setState({
			pos: {
				left: this.relatedItemsRef.current.scrollLeft,
				top: this.relatedItemsRef.current.scrollTop,
				x: e.clientX,
				y: e.clientY,
			},
			positionAtDragStart: {
				x: e.clientX,
				y: e.clientY
			},
			lastClickTarget: e.target || this.state.lastClickTarget
		});

		document.addEventListener("mousemove", this.mouseMoveHandler);
		document.addEventListener("mouseup", this.mouseUpHandler);
	}

	mouseMoveHandler(e) {
		e.stopPropagation();
		e.preventDefault();

		if(!this.state.isMoving){
			this.setState({
				isMoving: true
			});
		}

		const dx = e.clientX - this.state.pos.x;
		const dy = e.clientY - this.state.pos.y;

		this.relatedItemsRef.current.scrollTop = this.state.pos.top - dy;
		this.relatedItemsRef.current.scrollLeft = this.state.pos.left - dx;

		if (this.state.clickHandlerAttached) {
			this.setState({
				clickHandlerAttached: false
			});
		}
	}

	mouseUpHandler(e) {
		e.stopPropagation();
		e.preventDefault();

		let movement = Math.abs(e.clientX - this.state.positionAtDragStart.x);
		
		let hasBarelyMovedHorizontally = movement < maxDragMovementToBeConsideredAClick;

		this.setState({isMoving: false, positionAtDragStart: { x: 0, y: 0 }});
		document.removeEventListener("mousemove", this.mouseMoveHandler);

		if(hasBarelyMovedHorizontally && e.button !== 1 && e.button !== 2){
			if(this.state.lastClickTarget.closest("svg")) {
				// ToDo: This is not the best way to solve the SVG-not-clickable problem !
				this.setState({
					lastClickTarget: this.state.lastClickTarget.closest("svg").parentNode
				});
			}
			this.state.lastClickTarget && this.state.lastClickTarget.click();
		}
	}

	clickHandler(e) {

		this.setState({lastClickTarget: e.target});
		if (!this.state.clickHandlerAttached) {
			e.preventDefault();
			e.stopPropagation();
			this.setState({
				clickHandlerAttached: true
			});
		}
	}

	scrollCarousel(invertDirection) {
		const cardWidth =  this.relatedItemsRef.current.children[0].getBoundingClientRect().width;
		const currentPosition =  this.relatedItemsRef.current.scrollLeft;
		const cardMarginRight = Number(window.getComputedStyle( this.relatedItemsRef.current.children[0]).marginRight.replace("px", ""));
		const scrollInterval = cardWidth + cardMarginRight;

		this.relatedItemsRef.current.scroll({
			left: invertDirection ? Math.ceil((currentPosition - scrollInterval) / scrollInterval) * scrollInterval : Math.floor((currentPosition + scrollInterval) / scrollInterval) * scrollInterval,
			top: 0,
			behavior: "smooth"
		});
	}
	
	resetCarousel() {
		this.relatedItemsRef.current.scroll({
			left: 0,
			top: 0
		});
	}

	componentDidMount() {
		this.setState({showArrows: this.relatedItemsRef.current.offsetWidth < this.relatedItemsRef.current.scrollWidth});
	}

	componentWillUnmount() {
		document.removeEventListener("mousemove", this.mouseMoveHandler);
		document.removeEventListener("mouseup", this.mouseUpHandler);
	}
	
	componentDidUpdate(prevProps, prevState, snapshot) {
		if (this.props.relatedItems !== prevProps.relatedItems) {this.resetCarousel();}
	}

	componentContent(theme, centeredTitle) {
		return (
			<>
				<div className={[css["related-items__container"+theme], css[centeredTitle ? "related-items__container--centered-title" : ""]].join(" ")}>
					{
						this.props.title ?
							<h2 className={[css["related-items__title"+theme], css[centeredTitle ? "related-items__title--centered-title" : ""]].join(" ")}>{this.props.title}</h2> :
							<p className={[css["related-items__title" + theme], css[centeredTitle ? "related-items__title--centered-title" : ""]].join(" ")}/>
					}
					{this.state.showArrows &&
					<p className={[css["related-items__arrows"+theme], css[centeredTitle ? "related-items__arrows--centered-title" : ""]].join(" ")}>
						<span
							className={["mdi", "mdi-arrow-left", css["related-items__arrow-left"+theme]].join(" ")}
							role="button"
							tabIndex={-1}
							onKeyPress={() => this.scrollCarousel(true)}
							onClick={() => this.scrollCarousel(true)}
						/>
						<span
							className={["mdi", "mdi-arrow-right", css["related-items__arrow-right"+theme]].join(" ")}
							role="button"
							tabIndex={0}
							onKeyPress={() => this.scrollCarousel(false)}
							onClick={() => this.scrollCarousel(false)}
						/>
					</p>}
					<div
						ref={this.relatedItemsRef}
						id="related-items-list"
						className={css["related-items__items"+theme]}
						role="listbox"
						tabIndex={0}
						onMouseDown={this.mouseDownHandler}
						onClick={this.clickHandler}
					>
						{this.props.children}
					</div>
				</div>
			</>
		);
	}


	render(){
		if (!this.props.relatedItems || this.props.relatedItems.length === 0) return <></>;
		let theme = (this.props.theme && `--${this.props.theme}-theme` || "");
		let centeredTitle = this.props.centeredTitle;
		
		return (
			<>
				{
					this.props.title ?
						<article className={[css["related-items"+theme], css[centeredTitle ? "related-items--centered-title" : ""]].join(" ")}>
							{this.componentContent(theme, centeredTitle)}
						</article> :
						<div className={[css["related-items"+theme], css[centeredTitle ? "related-items--centered-title" : ""]].join(" ")}>
							{this.componentContent(theme, centeredTitle)}
						</div>
				}
			</>);
	}
}

RelatedItems.propTypes = {
	relatedItems: PropTypes.arrayOf(PropTypes.object),
	theme: PropTypes.string,
	centeredTitle: PropTypes.bool,
	title: PropTypes.string,
	children: PropTypes.any
};