import {GetClient, getStoryBlokItemsPaged} from "../StoryBlok";
import {gql} from "@apollo/client";
import PropTypes from "prop-types";

export async function GetCaseMetadata() {
	const query = `
		   query ($page: Int!) {
			  ClientcaseItems (per_page: 100, page: $page) {
				total
				items {
				  id
				  slug
				  content {
					title
				  }
				}
			  }
			}`;

	return await getStoryBlokItemsPaged(query, "ClientcaseItems", r => r);
}

export async function GetCases() {
	const client = GetClient();
	const result = await client.query({
		query: gql`
		query {
		  ClientcaseItems
		  {
			items {
				id
				uuid
				slug
				content {
				  tagline
				  title
				  client {
					content
				  }
				}
			  }
		  }
		}`
	});

	return result.data.ClientcaseItems.items.map(r => ({...r.content, slug: r.slug, id: r.id, uuid: r.uuid}));
}

// Get Case by ID. This can be by id, uuid or slug
export async function GetCase(ID) {
	const client = GetClient();
	const result = await client.query({
		query: gql`
		query {
		  ClientcaseItem(id: "${ID}") {
			id
			slug
			uuid
			content {
				about
				challenge
				collaboration
				component
				introquote
				result
				tagline
				title
				client {
					content
				}
				socialtag
			}
		  }
		}`
	});

	let caseItem = result.data.ClientcaseItem;
	return {
		...caseItem.content,
		id: caseItem.id,
		slug: caseItem.slug,
		uuid: caseItem.uuid
	};
}

GetCase.PropTypes = {
	ID: PropTypes.oneOfType([
		PropTypes.number,
		PropTypes.string
	])
};