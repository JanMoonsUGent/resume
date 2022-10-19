import { Script, Categories, Scripts } from "../GatedScriptLoader";

export class GoogleAnalyticsScript extends Script {
	constructor(){
		super(Scripts.googleAnalytics, Categories.analytical);
	}
	
	load(){
		(function(i, s, o, g, r, a, m) {
			i.GoogleAnalyticsObject = r; i[r] = i[r] || function() {
				(i[r].q = i[r].q || []).push(arguments);
			}, i[r].l = Number(new Date()); a = s.createElement(o),
			m = s.getElementsByTagName(o)[0]; a.async = 1; a.src = g; m.parentNode.insertBefore(a, m);
		})((window), document, "script", "https://www.google-analytics.com/analytics.js", "ga");
		window.ga("create", process.env.NEXT_PUBLIC_googleAnalyticsTrackingId, "auto");
		window.ga("send", "pageview");
		this.loaded = true;
	}
}