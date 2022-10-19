import {GetClient, getStoryBlokItemsPaged} from "../StoryBlok";
import {gql} from "@apollo/client";
import {ApplyEnrichers} from "../enriching/storyBlokEnrichmentHelpers";
import PropTypes from "prop-types";
import {EnrichColorCode} from "../enriching/enrichers";

const toolsColorCodeEnricher = EnrichColorCode.bind(null, tool => tool.content.colorcode, (item, colorcode) => {
	return {
		...item,
		content: {
			...item.content,
			colorcode
		}
	};
});

const descriptionItemsColorCodeEnricher = EnrichColorCode.bind(null, description => description.content.color_code, (descriptionItem, color_code) => {
	return {
		...descriptionItem,
		content: {
			...descriptionItem.content,
			color_code
		}
	};
});

export async function GetServicesMetaData() {
	const query = `
			query($page: Int!) {
			  ServiceItems(per_page: 100, page: $page) {
			  total
				items {
				  id
				  uuid
				  slug
				  content {
					title
					icon {
					  id
					  filename
					  alt
					}
				  }
				}
			  }
			}`;

	return await getStoryBlokItemsPaged(query, "ServiceItems", r => ({
		storyBlokId: r.id,
		storyBlokUuid: r.uuid,
		slug: r.slug,
		title: r.content.title,
		icon: r.content.icon,
		path: `/service/${r.slug}`
	}));
}

// Get Service by ID. This can be by id, uuid or slug
export async function GetService(ID) {
	const client = GetClient();
	const result = await client.query({
		query: gql`
		query {
		  ServiceItem(id: "${ID}") {
			id
			slug
			uuid
			content {
			  Tagline
			  title
			  color_code {
				id
				uuid
				name
				content
			  }
			  introductionvideo {
				filename
				alt
			  }
			  heroimage {
				filename
				alt
			  }
			  shorterdescription
			  shortdescription
			  howcanwehelp
			  description_items {
				id
				uuid
				name
				content
			  }
			  what_we_do
			  testimonials {
				id
				uuid
				name
				content
			  }
			  socialtag
			  tools {
				id
				uuid
				name
				content
			  }
			  jobtitles {
				id
				uuid
				name
				content
			  }
			  cases {
				id
				uuid
				name
				content
			  }
			  socialtag
			}
		  }
		}`
	});

	let serviceItem = result.data.ServiceItem;
	let enrichedToolsList = serviceItem.content.tools.length > 0 ? await ApplyEnrichers([toolsColorCodeEnricher], serviceItem.content.tools) : [];
	let enrichedDescriptionItems = serviceItem.content.description_items.length > 0 ? await ApplyEnrichers([descriptionItemsColorCodeEnricher], serviceItem.content.description_items) : [];
	return {
		...serviceItem.content,
		tools: enrichedToolsList,
		description_items: enrichedDescriptionItems,
		slug: serviceItem.slug,
		uuid: serviceItem.uuid
	};
}

GetService.PropTypes = {
	ID: PropTypes.oneOfType([
		PropTypes.number,
		PropTypes.string
	])
};

export async function GetServices() {
	const client = GetClient();
	const result = await client.query({
		query: gql`
		query {
		  ServiceItems
		  {
			items {
				id
				slug
				uuid
				content {
				  Tagline
				  title
				  introductionvideo {
					filename
					alt
				  }
				  heroimage {
					filename
					alt
				  }
				  shorterdescription
				  shortdescription
				  description_items {
					id
					uuid
					name
					content
				  }
				  what_we_do
				  testimonials {
					id
					uuid
					name
					content
				  }
				  socialtag
				  tools {
					id
					uuid
					name
					content
				  }
				  jobtitles {
					id
					uuid
					name
					content
				  }
				  cases {
					id
					uuid
					name
					content
				  }
				}
			  }
		  }
		}`
	});

	return result.data.ServiceItems.items.map(r => ({...r.content, slug: r.slug, uuid: r.uuid}));
}