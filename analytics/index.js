import { Component } from "react";
import {Scripts} from "./GatedScriptLoader";
import scriptLoader from "./scriptLoader";


export class ScriptLoaderComponent extends Component {

	render(){
		return (<></>);
	}

	componentDidMount(){
		scriptLoader.loadFromPreferences();
		this.trackPageView();
	}

	trackPageView(){
		scriptLoader.deferUntilLoaded(Scripts.googleAnalytics, () => {
			window.ga("send", "pageview");
		});

		scriptLoader.deferUntilLoaded(Scripts.googleTagManager, () => {
			window.gtag("config", process.env.NEXT_PUBLIC_googleTagManagerId, Object.assign({page_path: window.location.pathname}, {}));
		});
	}
}


