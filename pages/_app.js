import '../styles/globals.css'
import "../styles/fonts.scss";
import "../styles/typewriterbuildbetter.scss";

import { storyblokInit, apiPlugin } from "@storyblok/react";
import Feature from "../components/Feature";
import Page from "../components/genericComponents/Page/Page";
import Teaser from "../components/Teaser";
import Intro from "../components/genericComponents/Intro/Intro";
import Paragraph from "../components/genericComponents/Paragraph/Paragraph";
import Headermenu from "../components/genericComponents/Headermenu/Headermenu";
import Menulink from "../components/genericComponents/Menulink/Menulink";
import HomeHero from "../components/genericComponents/HomeHero/HomeHero";
import Hero from "../components/genericComponents/Hero/Hero";
import HeroWithCollage from "../components/genericComponents/HeroWithCollage/HeroWithCollage"
import TypeWriterBlock from "../components/genericComponents/TypeWriterBlock/TypeWriterBlock";
import Acquisition from "../components/genericComponents/Acquisition/Acquisition";
import CasesCarousel from "../components/genericComponents/CasesCarousel/CasesCarousel";
import ClientCase from "../components/genericComponents/ClientCase/ClientCase";
import TestimonialCard from "../components/genericComponents/TestimonialCard/TestimonialCard";
import LeftRightBlock from "../components/genericComponents/LeftRightBlock/LeftRightBlock";
import ImageCarousel from "../components/genericComponents/ImageCarousel/ImageCarousel";
import FeatureListNew from "../components/genericComponents/FeatureListNew/FeatureListNew";
import FeatureNew from "../components/genericComponents/FeatureNew/FeatureNew";
import OpenPositions from '../components/genericComponents/OpenPositions/OpenPositions';
import Position from '../components/genericComponents/Position/Position';
import TitledTestimonialCarousel from '../components/genericComponents/TitledTestimonialCarousel/TitledTestimonialCarousel';
import JourneyBlock from '../components/genericComponents/JourneyBlock/JourneyBlock';
import JourneySteps from '../components/genericComponents/JourneySteps/JourneySteps';
import ServiceBlock from '../components/genericComponents/ServiceBlock/ServiceBlock';
import Service from '../components/genericComponents/Service/Service';
import SisterCompanies from '../components/genericComponents/SisterCompanies/SisterCompanies';
import Serviceblocklist from '../components/genericComponents/Serviceblocklist/Serviceblocklist';
import ServiceLeftRightBlock from '../components/genericComponents/ServiceLeftRightBlock/ServiceLeftRightBlock';
import CasesGrid from '../components/genericComponents/CasesGrid/CasesGrid';

const components = {
  feature: Feature,
  teaser: Teaser,
  page: Page,
  intro: Intro,
  paragraph: Paragraph,
  headermenu: Headermenu,
  menulink: Menulink,
  hero: Hero,
  homehero: HomeHero,
  herowithcollage: HeroWithCollage,
  typewriter: TypeWriterBlock,
  acquisition: Acquisition,
  casescarousel: CasesCarousel,
  clientcase: ClientCase,
  testimonial: TestimonialCard,
  leftrightblock: LeftRightBlock,
  imagecarousel: ImageCarousel,
  listoffeatures:FeatureListNew,
  feature:FeatureNew,
  openpositions: OpenPositions,
  position:Position,
  testimonialcarousel: TitledTestimonialCarousel,
  journeysteps: JourneySteps,
  journeyblock: JourneyBlock,
  sistercompanies: SisterCompanies,
  serviceblocklist: Serviceblocklist,
  serviceblock: ServiceBlock,
  service:Service,
  serviceleftrightblock:ServiceLeftRightBlock,
  casesgrid:CasesGrid
};

storyblokInit({
  accessToken: `${process.env.STORYBLOK_API_KEY}`,
  use: [apiPlugin],
  components,
});

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
