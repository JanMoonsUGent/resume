import {GoogleAnalyticsScript} from "./scripts/GoogleAnalytics";
import {GoogleTagManagerScript} from "./scripts/GoogleTagManagerScript";
import {GatedScriptLoader} from "./GatedScriptLoader";

const scriptLoader = new GatedScriptLoader([
	new GoogleAnalyticsScript(),
	new GoogleTagManagerScript()
]);

export default scriptLoader;