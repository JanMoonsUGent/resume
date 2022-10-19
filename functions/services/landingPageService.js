import {GetClient, getStoryBlokItemsPaged} from "../StoryBlok";
import {gql} from "@apollo/client";
import {trim} from "../stringHelpers";

export async function GetLandingPageMetadata() {
	const query = `
           query ($page: Int!) {
			  LandingpageItems (per_page: 100, page: $page) {
			    total
				items {
				  content {
				    slug
				  }
				}
			  }
			}`;

	return await getStoryBlokItemsPaged(query, "LandingpageItems", r => r);
}

export async function GetLandingPageBySlug(slug, draft = false) {
	const client = GetClient(draft);

	const graphQLoutput = await client.query({
		query: gql`
			query {
              LandingpageItems {
                items{
                  id
                  content {
                    _editable
                    Titel
                    Tagline
                    Description
                    slug
                    Socialtags
                  }
                }
              }
            }
		`
	});

	let landingPageResults = graphQLoutput.data.LandingpageItems.items.filter(page => cleanSlug(page.content.slug) === cleanSlug(slug.join("/")));
	if(!landingPageResults.length){
		return null;
	}

	let landingPage = landingPageResults[0];
	if(!landingPage) {
		return null;
	}
	
	return {
		...landingPage.content
	};
}

function cleanSlug(slug) {
	if(!slug) {
		return slug;
	}
	return trim(slug, "/").toLowerCase();
}