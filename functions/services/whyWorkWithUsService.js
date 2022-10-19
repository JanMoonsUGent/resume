import {GetClient} from "../StoryBlok";
import {gql} from "@apollo/client";


export async function GetWhyWorkWithUsItems() {
	const client = GetClient();
	const result = await client.query({
		query: gql`
		query {
		  WhyworkwithusitemItems
		  {
			items {
			  id
			  uuid
			  slug
			  content {
				shortdescription
				title
				image {
				  filename
				  alt
				}
				colorcode {
				  id
				  content
				}
			  }
			}
		  }
		}`
	});

	return result.data.WhyworkwithusitemItems.items.map(r => ({...r.content, colorcode: r.content.colorcode.content}));
}