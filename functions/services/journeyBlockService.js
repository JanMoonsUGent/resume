import {GetClient} from "../StoryBlok";
import {gql} from "@apollo/client";


export async function GetJourneyBlocks() {
	const client = GetClient();
	const result = await client.query({
		query: gql`
		query {
		  JourneyblockItems
		  {
			items {
			  id
			  uuid
			  slug
			  content {
				direction
				journeysteps
			  }
			}
		  }
		}`
	});

	return result.data.JourneyblockItems.items.map(r => r.content);
}