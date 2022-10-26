import { useStoryblokState, getStoryblokApi, StoryblokComponent } from "@storyblok/react";
import HeadComponent from "../components/genericComponents/HeadComponent/HeadComponent";
import { getTags } from "../functions/services/metaTagService";

export default function Page({ story, preview, socialtags }) {
  story = useStoryblokState(story, { //Hook that connects the current page to the Storyblok Real Time visual editor. Needs information about the relations in order for the relations to be editable as well.
    resolveRelations: [
    ]
  }, preview);

  return (
    <>
      <HeadComponent socialTags={socialtags} />
      <StoryblokComponent blok={story.content} />
    </>
  );
}


export async function getStaticProps({ params }) {
  let slug = params.slug ? params.slug.join("/") : "home";

  let sbParams = {
    version: "draft", // 'draft' or 'published'
    resolve_relations: [
      
    ]
  };

  const storyblokApi = getStoryblokApi();

  let { data } = await storyblokApi.get(`cdn/stories/${slug}`, sbParams);
  if (!data) {
    return {
      notFound: true,
    }
  }

  const title = data.story.name;
  const description = data.story.content.tagline ? data.story.content.tagline : `${title}`;
  const socialtags = getTags({
    storyblokSocialTag: data.story.content.socialtag,
    pageDefaults: {
      "og:title": title,
      "og:description": description,
      "og:url": `${process.env.NEXT_PUBLIC_DEPLOY_URL}`+slug
    }
  });

  return {
    props: {
      story: data ? data.story : false,
      key: data ? data.story.id : false,
      socialtags
    },
    revalidate: 10,
  };
}

export async function getStaticPaths() {
  const storyblokApi = getStoryblokApi();

  let { data } = await storyblokApi.get("cdn/links/");

  let paths = [];
  Object.keys(data.links).forEach((linkKey) => {
    if (data.links[linkKey].is_folder) {
      return;
    }

    const slug = data.links[linkKey].slug;
    let splittedSlug = slug.split("/");

    paths.push({ params: { slug: splittedSlug } });
  });

  return {
    paths: paths,
    fallback: 'blocking'
  };
}