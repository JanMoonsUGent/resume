import {GetClient} from "../StoryBlok";
import {gql} from "@apollo/client";
import PropTypes from "prop-types";
import {EnrichColorCode} from "../enriching/enrichers";
import {ApplyEnrichers} from "../enriching/storyBlokEnrichmentHelpers";

const typeWriterItemColorCodeEnricher = EnrichColorCode.bind(null, twi => twi.content.color_code, (item, color_code) => {
	return {
		...item,
		content: {
			...item.content,
			color_code
		}
	};
});

// Get TypeWriter by ID. This can be by id, uuid or slug
export async function GetTypeWriter(ID) {
	const client = GetClient();
	const result = await client.query({
		query: gql`
		query {
		  TypewriterItem(id: "${ID}") {
			  id
			  uuid
			  slug
			  name
			  content {
				pretext
				posttext
				typewriteritem {
					id
					uuid
					name
					content
				}
			  }
		  }
		}`
	});

	let typeWriterResult = result.data.TypewriterItem;
	let enrichedTypeWriterItems = await ApplyEnrichers([typeWriterItemColorCodeEnricher], typeWriterResult.content.typewriteritem);
	return {...typeWriterResult.content, slug: typeWriterResult.slug, uuid: typeWriterResult.uuid, typewriteritem: enrichedTypeWriterItems};
}

GetTypeWriter.PropTypes = {
	ID: PropTypes.oneOfType([
		PropTypes.number,
		PropTypes.string
	])
};