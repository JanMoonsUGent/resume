import {ApolloClient, gql, InMemoryCache} from "@apollo/client";

export function GetClient(draft = false){
	return new ApolloClient({
		uri: process.env.NEXT_PUBLIC_STORYBLOK_ENDPOINT,
		headers: (process.env.NEXT_PUBLIC_STORYBLOK_DRAFT_BOOLEAN === "true" || draft) ?
			{Token: process.env.NEXT_PUBLIC_STORYBLOK_PREVIEW_TOKEN, Version: "draft"} :
			{Token: process.env.NEXT_PUBLIC_STORYBLOK_TOKEN},
		cache: new InMemoryCache()
	});
}

export async function getStoryBlokItemsPaged(query, resultKey, mapper){
	const client = GetClient();
	
	let page = 1;
	let total;
	let results = [];
	let retries = 0;
	do {
		try {
			const result = await client.query({
				query: gql`${query}`,
				variables: {
					page: page
				}
			});
			
			let collection = result.data[resultKey];
			total = collection.total;
			results = results.concat(collection.items.map(mapper));
			page++;
			retries = 0;
		}
		catch(ex){
			retries++;
			if(retries >= 5){
				throw ex;
			}
			await sleep(1000);
		}
		
	}
	while(total && results.length < total);
	
	return results;
}

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}
