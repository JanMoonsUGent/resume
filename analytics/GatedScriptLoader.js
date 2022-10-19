import _ from "lodash";
import Cookies from "js-cookie";
import {GetRootDomain} from "../functions/domainHelpers";

export const Categories = {
	analytical: "Analytical"
};

export const Scripts = {
	googleAnalytics: "googleAnalytics",
	googleTagManager: "googleTagManager"
};

export class Script {
	constructor(name, category) {
		this.loaded = false;
		this.name = name;
		this.callbacks = [];
		this.category = category;
	}

	load() {
	}
	
	set loaded(newValue) {
		this.isLoaded = newValue;
		if(newValue){
			this.callbacks.forEach(cb => {
				cb();
			});
			this.callbacks = [];
		}
	}

	get loaded(){
		return this.isLoaded;
	}

	deferUntilLoaded(callback) {
		if (this.isLoaded) {
			callback();
			return;
		}
		
		this.callbacks.push(callback);
	}
}



export class GatedScriptLoader {
	constructor(scripts) {
		this.scripts = [...scripts];
	}

	loadScript(scriptName){
		let script = this.getScript(scriptName);
		if(!script) return;
		script.load();
	}

	getScript(scriptName){
		return _.find(this.scripts, s => s.name === scriptName);
	}

	deferUntilLoaded(scriptName, callback){
		let script = this.getScript(scriptName);
		if(!script) return;
		script.deferUntilLoaded(callback);
	}

	loadFromPreferences(){
		this.loadCategories(this.getPreferences());
	}

	loadCategories(categories){
		categories.forEach((value, key) => {
			if(!value) return;
			this.loadCategory(key);
		});
	}

	loadCategory(category){
		let scripts = _.filter(this.scripts, script => script.category === category);
		scripts.forEach(script => script.load());
	}

	setPreferences(preferences){
		preferences.set(Categories.functional, true);
		const newPreferences =  [...preferences.entries()]
			.filter(([, value]) => value)
			.map(([key]) => key)
			.join("|");
		
		Cookies.set("hideCookieBar", true, { expires: 365, domain: GetRootDomain(), path: "/"});
		Cookies.set("cookiePreferences", newPreferences, { expires: 365, domain: GetRootDomain(), path: "/"});
	}
	
	togglePreference(category){
		let preferences = this.getPreferences();
		preferences.set(category, !preferences.get(category));
		this.setPreferences(preferences);
	}
	
	acceptAll(){
		let prefs = this.getPreferences();
		prefs.forEach((value, key, map) => {
			map.set(key, true);
		});
		this.setPreferences(prefs);
	}
	
	rejectAll(){
		this.setPreferences(this.getDefault());
	}
	
	getDefault(){
		return new Map([
			[Categories.analytical, false]
		]);
	}
	
	getDefaultConfirmed(){
		let prefs = this.getDefault();
		prefs.set(Categories.functional, true);
		return prefs;
	}

	getPreferences() {
		let existingPreferences = Cookies.get("cookiePreferences");
		if(!existingPreferences && localStorage.cookiePreferences){
			Cookies.set("cookiePreferences", localStorage.cookiePreferences, { expires: 365, domain: GetRootDomain(), path: "/"});
		}
		if(localStorage.cookiePreferences){
			existingPreferences = localStorage.cookiePreferences;
		}
		
		
		let prefs = this.getDefault();
        
		if(existingPreferences){
			for(let pref of existingPreferences.split("|")){
				prefs.set(pref, true);
			}
		}
        
		return prefs;
	}
}