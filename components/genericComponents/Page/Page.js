import { Component } from "react";
import Headermenu from "../Headermenu/Headermenu";
import MainFooter from "../MainFooter/MainFooter";
import Acquisition from "../Acquisition/Acquisition";
import { storyblokEditable, StoryblokComponent } from "@storyblok/react";


export default class Page extends Component {
  constructor(props) {
    super(props);
  }


  render() {
    return (
      <>
        <main {...storyblokEditable(this.props.blok)}>
          <Headermenu blok={this.props.menu.content}></Headermenu>
          {this.props.blok.body.map((nestedBlok) => (
            <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
          ))}
        </main>
        {/* <Acquisition blok={this.props.consultingacquisition.content} /> */}
         <MainFooter /> 
      </>
    );
  }
}
