import { getStaticPaths } from "../[[...slug]]";
import { useStoryblokState, getStoryblokApi, StoryblokComponent } from "@storyblok/react";

export default async function handler(req, res) {

  res.statusCode = 200
  res.setHeader('Content-Type', 'text/xml')

  // Instructing the Vercel edge to cache the file
  res.setHeader('Cache-control', 'stale-while-revalidate, s-maxage=3600')

  //getting paths
  const storyblokApi = getStoryblokApi();
  let homelink = {
    slug:"",
    published:true
  }
  let paths = [];
  
  paths.push(homelink);

  await storyblokApi.get(`cdn/links`, {
    starts_with: "people",
  }).then((result) => {
    Object.keys(result.data.links).forEach((linkKey) => {
      if (!result.data.links[linkKey].is_folder && result.data.links[linkKey].published) {
        paths.push(result.data.links[linkKey]);
      }
    });
  });

  

  // let { services } = await storyblokApi.get(`cdn/links`, {
  //   starts_with: "services",
  // });
  
  // Object.keys(services.links).forEach((linkKey) => {
  //   if (!services.links[linkKey].is_folder && services.links[linkKey].published) {
  //     paths.push(services.links[linkKey]);
  //   }
  // });

  // generate sitemap here
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"> 
      ${paths
      .map((url) => {
        return `
            <url>
              <loc>https://resume.vercel.app/${url.slug}</loc>
              <lastmod>${new Date().toISOString()}</lastmod>
              <changefreq>weekly</changefreq>
              <priority>1.0</priority>
            </url>
          `;
      })
      .join("")}
      </urlset>`

  res.end(xml)
}