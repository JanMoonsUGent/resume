import {Categories, Script, Scripts} from "../GatedScriptLoader";

export class GoogleTagManagerScript extends Script {
	constructor() {
		super(Scripts.googleTagManager, Categories.marketing);
	}

	load() {
		const w = window;
		w.dataLayer = w.dataLayer || [];
		const gtag = function () {
			w.dataLayer.push(arguments);
		};
		w.gtag = gtag;
		gtag("js", new Date());

		const scriptTag = document.createElement("script");
		scriptTag.async = true;
		scriptTag.src = `https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_googleTagManagerId}`;
		const firstScript = document.getElementsByTagName("script")[0];
		firstScript.parentNode.insertBefore(scriptTag, firstScript);
		this.loaded = true;
	}
}