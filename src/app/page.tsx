import Hero from '../components/hero/Hero';
import AboutUs from '@/components/about/AboutUs';
import ChooseUs from '@/components/choose-us/ChooseUs';
import FeaturedProjects from '@/components/featured-projects/FeaturedProjects';
import HouseLayout from '@/components/house-layout/HouseLayout';
import Gallery from '@/components/gallery/Gallery';
import ContactUs from '@/components/contact/ContactUs';

export default function HomePage() {
  return (
    <>
      <Hero />
      <AboutUs />
      <ChooseUs />
      <FeaturedProjects
          title="Proiectul Ares"
          description="Ares Residence este un proiect rezidențial premium, ce îmbină arhitectura elegantă cu execuția de calitate superioară și un stil de locuire contemporan."
          imageSrc="/images/ares-front-left-02.png"
          imageAlt="Ares Residence Iași - proiect rezidențial premium cu arhitectură modernă"
          imagePosition="right"
          liftImage
          stats={[
              { label: 'Suprafață utilă', value: '125 m²' },
              { label: 'Suprafață teren', value: '500 m²' },
              { label: 'Suprafață construită', value: '170 m²' },
              { label: 'Preț începând de la', value: '$ 185.000' },
          ]}
      />
      <FeaturedProjects
          title="Facilități"
          description="Locuințele Ares Residence sunt dezvoltate cu atenție la confort, eficiență și siguranță, respectând normele actuale în construcții și așteptările unui stil de viață modern."
          imageSrc="/images/ares-front-01.png"
          imageAlt="Facilități Ares Residence Iași - casă modernă cu finisaje premium"
          imagePosition="left"
          stats={[
              { label: 'Tip încălzire', value: 'Încălzire în pardoseală' },
              { label: 'Tip tâmplărie', value: 'Tâmplărie Salamander' },
              { label: 'Vedere', value: 'Vedere panoramică' },
              { label: 'Flexibilitate interioară', value: 'Personalizarea amenajării interiorului' }
          ]}
      />
      <HouseLayout />
      <Gallery />
      <ContactUs />
      {/* Add other sections here */}
    </>
  );
}
