import {GetClient, getStoryBlokItemsPaged} from "../StoryBlok";
import {gql} from "@apollo/client";
import PropTypes from "prop-types";

export async function GetPositionsMetaData() {
	const query = `
			query($page: Int!) {
			  PositionItems(per_page: 100, page: $page) {
			  total
				items {
				  id
				  uuid
				  slug
				  content {
					title
				  }
				}
			  }
			}`;

	return await getStoryBlokItemsPaged(query, "PositionItems", r => ({
		storyBlokId: r.id,
		storyBlokUuid: r.uuid,
		slug: r.slug,
		title: r.content.title,
		path: `/position/${r.slug}`,
	}));
}

// Get Position by ID. This can be by id, uuid or slug
export async function GetPosition(ID) {
	const client = GetClient();
	const result = await client.query({
		query: gql`
		query {
		  PositionItem(id: "${ID}") {
			id
			slug
			uuid
			content {
				title
				jobtitle {
				  id
				  uuid
				  name
				  content
				}
				positionlevel
				internallevel
				shortdescription
				shortestdescription
				mountainphilosophy
				whatwevalue
				whatskills
				whatweoffer
				image {
				  filename
				  alt
				}
				testimonials {
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

	let positionItem = result.data.PositionItem;
	return {
		...positionItem.content,
		slug: positionItem.slug,
		uuid: positionItem.uuid
	};
}

GetPosition.PropTypes = {
	ID: PropTypes.oneOfType([
		PropTypes.number,
		PropTypes.string
	])
};

export async function GetPositions() {
	const client = GetClient();
	const result = await client.query({
		query: gql`
		query {
		  PositionItems {
		  	items {
				id
				slug
				uuid
				content {
					title
					jobtitle {
					  id
					  uuid
					  name
					  content
					}
					positionlevel
					internallevel
					shortdescription
					shortestdescription
					mountainphilosophy
					whatwevalue
					whatskills
					whatweoffer
					image {
					  filename
					  alt
					}
					testimonials {
					  id
					  uuid
					  name
					  content
					}
					socialtag
				}
			}
		  }
		}`
	});

	return result.data.PositionItems.items.map(p => ({...p.content, slug: p.slug, uuid: p.uuid}));
}