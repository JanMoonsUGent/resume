import {GetClient} from "../StoryBlok";
import {gql} from "@apollo/client";
import PropTypes from "prop-types";
import {sortBy} from "lodash";
import {EnrichClient, EnrichColorCode, EnrichJobTitle, EnrichTool, EnrichVideo} from "../enriching/enrichers";
import {addPaths, ApplyEnrichers} from "../enriching/storyBlokEnrichmentHelpers";

// !! There is a change that StoryBlok doesn't send a multi-option as an array if only one item is selected. !!

const casesClientEnricher = EnrichClient.bind(null, c => c.content.client, (case_, client) => {
	return {
		...case_,
		content: {
			...case_.content,
			client
		}
	};
});

const servicesToolsEnricher = EnrichTool.bind(null, s => s.content.tools, (service, tools) => {
	return {
		...service,
		content: {
			...service.content,
			tools
		}
	};
});

const positionlistJobtitlesEnricher = EnrichJobTitle.bind(null, s => s.content.jobtitle, (positionlist, jobtitle) => {
	return {
		...positionlist,
		content: {
			...positionlist.content,
			jobtitle
		}
	};
});

const testimonialVideoEnricher = EnrichVideo.bind(null, s => s.content.testimonialvideo, (testimonial, testimonialvideo) => {
	return {
		...testimonial,
		content: {
			...testimonial.content,
			testimonialvideo
		}
	};
});

const ServicesListColorCodeEnricher = EnrichColorCode.bind(null, service => service.content.color_code, (service, color_code) => {
	return {
		...service,
		content: {
			...service.content,
			color_code
		}
	};
});

const PackageItemListColorCodeEnricher = EnrichColorCode.bind(null, packageItem => packageItem.content.colorcode, (packageItem, colorcode) => {
	return {
		...packageItem,
		content: {
			...packageItem.content,
			colorcode
		}
	};
});

const HeroButtonColorCodeEnricher = EnrichColorCode.bind(null, button => button.colorcode, (button, colorcode) => {
	return {
		...button,
		colorcode
	};
});

// Get Page by ID. This can be by id, uuid or slug
export async function GetPage(ID) {
	const client = GetClient();
	const result = await client.query({
		query: gql`
	query {
	  PageItem(id: "${ID}") {
		uuid
		slug
		content {
			herotitle
			herodescription
			herobutton
			heroimages {
				filename
				alt
			}
			descriptionimages {
				filename
				alt
			}
			block
			domains {
				content
				position
			}
			teachers {
				content
				position
			}
			Clients {
				content
				position
			}
			socialtag
			testimonials {
				content
				position
			}
			whatwevaluelist {
				content
				position
			}
			positionlist {
				slug
				content
				position
			}
			packageitemlist {
				content
				position
			}
			testimonialvideolist {
				content
				position
			}
			serviceslist {
				content
				position
				slug
			}
			caseslist {
				slug
				content
				position
			}
			imagecarousel {
				slug
				content
				position
			}
		}
	  }
	}`
	});
	let pageResult = result.data.PageItem;
	
	let enrichedCasesList = pageResult.content.caseslist && pageResult.content.caseslist.length > 0 ? await ApplyEnrichers([casesClientEnricher], pageResult.content.caseslist) : [];
	let enrichedServicesList = pageResult.content.serviceslist && pageResult.content.serviceslist.length > 0 ? await ApplyEnrichers([servicesToolsEnricher, ServicesListColorCodeEnricher], addPaths(pageResult.content.serviceslist, "/service/")) : [];
	let enrichedPositionList = pageResult.content.positionlist && pageResult.content.positionlist.length > 0 ? await ApplyEnrichers([positionlistJobtitlesEnricher], pageResult.content.positionlist) : [];
	let enrichedTestimonials = pageResult.content.testimonials && pageResult.content.testimonials.length > 0 ? await ApplyEnrichers([testimonialVideoEnricher], pageResult.content.testimonials) : [];
	let enrichedPackageItemList = pageResult.content.packageitemlist && pageResult.content.packageitemlist.length > 0 ? await ApplyEnrichers([PackageItemListColorCodeEnricher], pageResult.content.packageitemlist) : [];
	let enrichedHeroButton = pageResult.content.herobutton && pageResult.content.herobutton.length > 0 ? await ApplyEnrichers([HeroButtonColorCodeEnricher], pageResult.content.herobutton) : [];
	return {
		slug: pageResult.slug,
		uuid: pageResult.uuid,
		...pageResult.content,
		herobutton: enrichedHeroButton,
		// testimonialvideolist: sortBy(pageResult.content.testimonialvideolist, ["position"]).map(tv => tv.content),
		// packageitemlist: sortBy(enrichedPackageItemList, ["position"]).map(pi => pi.content),
		// testimonials: sortBy(enrichedTestimonials, ["position"]).map(t => t.content),
		// caseslist: sortBy(enrichedCasesList, ["position"]).map(c => ({slug: c.slug, ...c.content})),
		// serviceslist: sortBy(enrichedServicesList, ["position"]).map(s => s.content),
		// positionlist: sortBy(enrichedPositionList, ["position"]).map(s => ({slug: s.slug, ...s.content}))

		testimonialvideolist: pageResult.content.testimonialvideolist.map(tv => tv.content),
		packageitemlist: enrichedPackageItemList.map(pi => pi.content),
		testimonials: enrichedTestimonials.map(t => t.content),
		caseslist: enrichedCasesList.map(c => ({slug: c.slug, ...c.content})),
		serviceslist: enrichedServicesList.map(s => s.content),
		positionlist: enrichedPositionList.map(s => ({slug: s.slug, ...s.content}))
	};
}

GetPage.PropTypes = {
	ID: PropTypes.oneOfType([
		PropTypes.number,
		PropTypes.string
	])
};