import {GetClient} from "../StoryBlok";
import {gql} from "@apollo/client";

export async function GetTestimonials() {
	const client = GetClient();
	const result = await client.query({
		query: gql`
       query {
        TestimonialItems {
            items {
              id
              uuid
              content {
                testimonial
                testimonialgiver
                testimonialname
                testimonialgiverrole
                testimonialpicture {
                  alt
                  filename
                }
              }
            }
          }
        }`
	});

	return result.data.TestimonialItems.items.map(r => ({...r.content, id: r.id, uuid: r.uuid}));
}