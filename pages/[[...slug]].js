import { useStoryblokState, getStoryblokApi, StoryblokComponent } from "@storyblok/react";
import HeadComponent from "../components/genericComponents/HeadComponent/HeadComponent";
import { getTags } from "../functions/services/metaTagService";
import { RichTextToString } from "../functions/storyBlokRichTextRenderer";

export default function Page({ story, preview, socialtags, menu, consultingacquisition, socialTags, positions }) {
  // if (!story || !story.content) {
  //   return <div>loading...</div>
  // }
  story = useStoryblokState(story, {
    resolveRelations: [
      "hero.color_code",
      "typewriteritem.color_code",
      "casescarousel.cases",
      "clientcase.client",
      "tmlbutton.colorcode",
      "casehero.introquote",
      "leftrightblock.direction",
      "listoffeatures.colorcode",
      "feature.colorcode",
      "openpositions.positions",
      "position.jobtitle",
      "position.acquisition",
      "page.testimonialcarousel.testimonials",
      "testimonialcarousel.testimonials",
      "service.color_code",
      "service.others",
      "service.others.items",
      "service.stories",
      "service.acquisition",
      "service.casesgrid.items",
      "service.jobtitles",
      "service.testimonials",
      "service.tools",
      "serviceblock.service",
      "page.casescarousel.cases",
      "serviceleftrightblock.colorcode",
      "casesgrid.items",
      "casesgrid.colorcode",
      "clientcase.clientcasetypes",
      "casesgrid.items.clientcasetypes",
      "casesgrid.younexttext"
    ]
  }, preview);



  return (
    <>
      <HeadComponent socialTags={socialtags} />
      <StoryblokComponent blok={story.content} menu={menu} slug={story.slug} fullslug={story.full_slug_cached} consultingacquisition={consultingacquisition} socialTags={socialTags} positions={positions} />
    </>
  );
}


export async function getStaticProps({ params }) {
  let slug = params.slug ? params.slug.join("/") : "home";

  let sbParams = {
    version: "draft", // 'draft' or 'published'
    resolve_relations: [
      "hero.color_code",
      "typewriteritem.color_code",
      "casescarousel.cases",
      "clientcase.client",
      "clientcase.clientcasetypes",
      "tmlbutton.colorcode",
      "leftrightblock.direction",
      "listoffeatures.colorcode",
      "feature.colorcode",
      "openpositions.positions",
      "position.jobtitle",
      "position.acquisition",
      "page.testimonialcarousel.testimonials",
      "testimonialcarousel.testimonials",
      "service.color_code",
      "service.others",
      "service.others.items",
      "service.stories",
      "service.casesgrid.items",
      "service.jobtitles",
      "service.testimonials",
      "service.acquisition",
      "service.tools",
      "serviceblock.service",
      "page.casescarousel.cases",
      "serviceleftrightblock.colorcode",
      "casesgrid.items",
      "casesgrid.colorcode",
      "casesgrid.items.clientcasetypes",
      "casesgrid.younexttext"
    ]
  };

  const storyblokApi = getStoryblokApi();

  let { data } = await storyblokApi.get(`cdn/stories/${slug}`, sbParams);
  if (!data) {
    return {
      notFound: true,
    }
  }

  //getting menu data needed throughout the site
  let menudata = await storyblokApi.get(`cdn/stories/reusable/headermenu`, sbParams);
  if (!menudata) {
    return {
      notFound: true,
    }
  }
  const menu = menudata.data.story;

  let consultingacquisitiondata = await storyblokApi.get(`cdn/stories/acquisition/consulting-acquisition`, sbParams);
  if (!consultingacquisitiondata) {
    return {
      notFound: true,
    }
  }
  const consultingacquisition = consultingacquisitiondata.data.story;

  let positionsdata = await storyblokApi.get(`cdn/stories/?filter_query[component][in]=position`, sbParams);
  if (!positionsdata) {
    return {
      notFound: true,
    }
  }
  const positions = positionsdata.data.stories;

  const title = RichTextToString(data.story.name);
  const description = data.story.content.tagline ? RichTextToString(data.story.content.tagline) : `${title}`;
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
      socialtags,
      menu,
      consultingacquisition,
      positions
    },
    revalidate: 10,
  };
}

// export async function getServerSideProps({ params }) {
//   let slug = params.slug ? params.slug.join("/") : "home";

//   let sbParams = {
//     version: "published", // 'draft' or 'published'
//     resolve_relations: [
//       "hero.color_code",
//       "typewriteritem.color_code",
//       "casescarousel.cases",
//       "clientcase.client",
//       "tmlbutton.colorcode",
//       "leftrightblock.direction",
//       "listoffeatures.colorcode",
//       "feature.colorcode",
//       "openpositions.positions",
//       "position.jobtitle",
//       "page.testimonialcarousel.testimonials",
//       "testimonialcarousel.testimonials",
//       "service.cases",
//       "service.color_code",
//       "service.description_items",
//       "service.jobtitles",
//       "service.testimonials",
//       "service.tools",
//       "serviceblock.service",
//       "page.casescarousel.cases",
//       "serviceleftrightblock.colorcode"
//     ]
//   };

//   const storyblokApi = getStoryblokApi();

//   let { data } = await storyblokApi.get(`cdn/stories/${slug}`, sbParams);
//   if (!data) {
//     return {
//       notFound: true,
//     }
//   }

//   //getting menu data needed throughout the site
//   let menudata = await storyblokApi.get(`cdn/stories/reusable/headermenu`, sbParams);
//   if (!menudata) {
//     return {
//       notFound: true,
//     }
//   }
//   const menu = menudata.data.story;

//   let consultingacquisitiondata = await storyblokApi.get(`cdn/stories/acquisition/consulting-acquisition`, sbParams);
//   if (!consultingacquisitiondata) {
//     return {
//       notFound: true,
//     }
//   }
//   const consultingacquisition = consultingacquisitiondata.data.story;

//   let positionsdata = await storyblokApi.get(`cdn/stories/?filter_query[component][in]=position`, sbParams);
//   if (!positionsdata) {
//     return {
//       notFound: true,
//     }
//   }
//   const positions = positionsdata.data.stories;

//   const title = RichTextToString(data.story.name);
//   const description = data.story.content.tagline ? RichTextToString(data.story.content.tagline) : `${title}`;
//   const socialtags = getTags({
//     storyblokSocialTag: data.story.content.socialtag,
//     pageDefaults: {
//       "og:title": title,
//       "og:description": description,
//       "og:url": `${process.env.NEXT_PUBLIC_DEPLOY_URL}/${params.slug}`
//     }
//   });

//   return {
//     props: {
//       story: data ? data.story : false,
//       key: data ? data.story.id : false,
//       socialtags,
//       menu,
//       consultingacquisition,
//       positions
//     }
//   };
// }

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