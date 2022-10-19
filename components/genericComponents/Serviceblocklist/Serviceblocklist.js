import { useStoryblokState, storyblokEditable, StoryblokComponent } from "@storyblok/react";
 
const Serviceblocklist = ({ blok, preview }) => {
  return (
    
    <div className="serviceblocklist" {...storyblokEditable(blok)} id={blok._uid}>
      {blok.serviceblocks.map((nestedBlok) => (
        <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
      ))}
    </div>
  );
};
 
export default Serviceblocklist;