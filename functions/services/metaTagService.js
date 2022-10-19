export function getTags(socialTags) {
	let tags = {};
	if(socialTags && socialTags.storyblokSocialTag) {
		mergeStoryblokTags(socialTags.storyblokSocialTag, tags);
	}

	if(socialTags && socialTags.pageDefaults) {
		mergeTags(socialTags.pageDefaults, tags);
	}

	mergeDefaultTags(tags);

	setDerivedTags(tags);
    
	filterEmptyValues(tags);
    
	return tags;
}

function mergeStoryblokTags(storyblokTags, tags) {
	// rename storyblok tags from og_foo to og:foo
	let newStoryblokTags = {};
	for(const key in storyblokTags) {
		if(key === "_uid") {
			continue;
		}
		let newKey = key.replace("og_", "og:").replace("twitter_", "twitter:");
		newStoryblokTags[newKey] = storyblokTags[key];
	}
	mergeTags(newStoryblokTags, tags);
}

function mergeTags(fromTags, tags) {
	for(let key in fromTags) {
		if(fromTags[key] && !tags[key]) {
			tags[key] = fromTags[key];
		}
	}
}

function mergeDefaultTags(tags) {
	let defaultTags = getDefaultTags();

	for(let key in defaultTags) {
		if(!tags[key]) {
			tags[key] = defaultTags[key];
		} else if (key === "title" || key === "og:title") {
			tags[key] += " | " + defaultTags[key];
		}
	}
}

function getDefaultTags() {
	const imageUrl = process.env.NEXT_PUBLIC_SocialTagImageFallback;
	const description = "Helping you create lovable digital products, great customer experiences and performant business processes";

	return {
		// General SEO
		"author": "Team TML",
		"description": description,
		// Indexing / Spiders
		"bingbot": "all",
		"googlebot": "all",
		"robots": "all",
		// OpenGraph
		"og:site_name": "My Resume",
		"og:title": "My Resume",
		"og:description": description,
		"og:image": imageUrl,
		"og:type": "website",
		// Twitter
		"twitter:site": "@MyResume",
		"twitter:card": "summary_large_image",
		"twitter:image": imageUrl,
		"twitter:title": "My Resume",
		"twitter:description": description
	};
}

function setDerivedTags(tags) {
	const tagMappings = getTagMappings();

	for(let key in tagMappings) {
		tags[key] = tags[tagMappings[key]];
	}
}

function getTagMappings() {
	return {
		"canonicalLink": "og:url",
		"description": "og:description",
		"title": "og:title",
		"twitter:description": "og:description",
		"twitter:image": "og:image",
		"twitter:title": "og:title",
	};
}

function filterEmptyValues(tags) {
	Object.keys(tags).forEach(key => tags[key] ? {} : delete tags[key]);
}