import React, { Component } from "react";
import css from "./CasesGrid.module.scss";
import CaseCardNew from "../CaseCardNew/CaseCardNew";
import { storyblokEditable } from "@storyblok/react";
import { RichTextToHTML } from "../../../functions/storyBlokRichTextRenderer";
import GetColorCode from "../../../functions/colorCodeHelper";
import { TmlButton } from "../TmlButton/TmlButton";

export default class CasesGrid extends Component {
  state = { width: 0, height: 0 };
  constructor(props) {
    super(props);
    this.colcounter = 0;
    this.rowcounter = 0;
    this.widthclass = "one";
  }
  //const [windowSize, setWindowSize] = useState(getWindowSize());
  updateDimensions = () => {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
    this.render();
  };
  componentDidMount() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener('resize', this.updateDimensions);
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions);
  }
  render() {
    let color = "White";
    if (this.props.blok.colorcode && this.props.blok.colorcode.content) {
      color = GetColorCode(this.props.blok.colorcode.content.Description);
    }
    let cssColorBg = "--" + color + "--very-light";
    let cssColorFont = "--highlighted-" + color;
    this.rowcounter = 0;
    this.colcounter = 0;
    return (
      <>

        <section {...storyblokEditable(this.props.blok)} id={this.props.id} className={[css["grid"], css["grid" + cssColorBg]].join(" ")}>
          {this.props.blok.title && <h2 className={css["grid__title"]}>{this.props.blok.title}</h2>}
          {RichTextToHTML({ document: this.props.blok.introtext, textClassName: css["grid__text"] })}
          <div className={css["grid__items"]}>


            {this.props.blok.items.map((item, i) => {

              //determining logo
              let printablelogo = {}
              if (item.content.client.content) {
                printablelogo = item.content.client.content.logo;
              }

              if (this.state.width >= 1500) {
                if (item.content.blocktype == undefined || item.content.blocktype =="") {

                  //setting default blocktype if none present
                  if (item.content.cardimage) {
                    let selectableoptions = ["two", "three"];
                    let random = Math.round(Math.random())
                    item.content.blocktype = selectableoptions[random];
                  } else {
                    item.content.blocktype = "one";
                  }
                }

                //determining widthclass
                if (item.content.blocktype == "one") {
                  this.widthclass = "one"
                  if (this.colcounter < 2) {
                    this.colcounter++;
                  } else if (this.colcounter == 2) {
                    this.colcounter = 0;
                    this.rowcounter++;
                  }
                } else if (item.content.blocktype == "two") {
                  if (this.colcounter == 0) {
                    this.widthclass = "two"
                    this.colcounter = 2;
                  } else if (this.colcounter == 1) {
                    this.widthclass = "two"
                    this.colcounter = 0;
                    this.rowcounter++;
                  } else if (this.colcounter == 2) {
                    this.widthclass = "one"
                    this.colcounter = 0;
                    this.rowcounter++;
                  }
                } else if (item.content.blocktype == "three") {
                  if (this.colcounter == 0) {
                    this.widthclass = "three"
                    this.colcounter = 0;
                    this.rowcounter++;
                  } else if (this.colcounter == 1) {
                    this.widthclass = "two"
                    this.colcounter = 0;
                    this.rowcounter++;
                  } else if (this.colcounter == 2) {
                    this.widthclass = "one"
                    this.colcounter = 0;
                    this.rowcounter++;
                  }
                }
              }

              else if (this.state.width >= 1000 && this.state.width < 1500) {
                if (item.content.blocktype == undefined || item.content.blocktype =="") {

                  //setting default blocktype if none present
                  if (item.content.cardimage) {
                    item.content.blocktype = "two";
                  } else {
                    item.content.blocktype = "one";
                  }
                }

                //determining widthclass
                if (item.content.blocktype == "one") {
                  this.widthclass = "one"
                  if (this.colcounter == 0) {
                    this.colcounter++;
                  } else if (this.colcounter == 1) {
                    this.colcounter = 0;
                    this.rowcounter++;
                  }
                } else {
                  if (this.colcounter == 0) {
                    this.widthclass = "two"
                    this.colcounter = 0;
                    this.rowcounter++;
                  } else if (this.colcounter == 1) {
                    this.widthclass = "one"
                    this.colcounter = 0;
                    this.rowcounter++;
                  }
                }
              }

              else {
                if (item.content.blocktype == undefined || item.content.blocktype =="") {
                  item.content.blocktype = "one";
                }
                this.widthclass = "one"
                this.rowcounter++;
              }

              return (
                <CaseCardNew
                  blok={item.content}
                  isQuote={false}
                  mainContent={item.content.title}
                  info={item.content.tagline}
                  logo={printablelogo}
                  order={i}
                  tags={item.content.clientcasetypes}
                  slug={item.full_slug}
                  widthclass={this.widthclass}
                />)
            })}
            <CaseCardNew
              joinus={true}
              younexttext={this.props.blok.younexttext}
            />
          </div>
          <div className={css["grid__showmorebutton-wrapper"]}>
            {this.props.blok.showmorebutton && <TmlButton className={css["grid__showmorebutton-button"]}
              to="/pages/stories"
              text="See all stories"
            >
            </TmlButton>}
          </div>
        </section>
      </>
    );
  }
}

function getWindowSize() {
  const { innerWidth, innerHeight } = window;
  return { innerWidth, innerHeight };
}