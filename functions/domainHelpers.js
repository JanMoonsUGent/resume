import { takeRight } from "lodash";

export function GetRootDomain(){
	let domainParts = window.location.hostname.split(".");
	return takeRight(domainParts, 3).join(".");
}