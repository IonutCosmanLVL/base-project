import Hero from '../components/hero/Hero';
import AboutUs from '@/components/about/AboutUs';
import ChooseUs from '@/components/choose-us/ChooseUs';
import FeaturedProjects from '@/components/featured-projects/FeaturedProjects';
import Gallery from '@/components/gallery/Gallery';
import ContactUs from '@/components/contact/ContactUs';

export default function HomePage() {
  return (
    <main>
      <Hero />
      <AboutUs />
      <ChooseUs />
      <FeaturedProjects
          title="Proiectul Ares"
          description="Ares Residence este un proiect rezidențial premium ce îmbină arhitectura elegantă cu execuția de calitate superioară."
          imageSrc="/images/black-house-bg.jpg"
          imagePosition="left"
          stats={[
              { label: '- Suprafață utilă', value: '125 m²' },
              { label: '- Suprafață teren', value: '500 m²' },
              { label: '- Construiți', value: '170 m²' },
              { label: '- Preț începând de la', value: '$ 185.000' },
          ]}
      />
      <FeaturedProjects
          title="Facilități"
          description="Respectăm cu strictețe toate normele legale în construcții, demonstrându-ne implicarea profundă și seriozitatea față de fiecare proiect pe care îl dezvoltăm."
          imageSrc="/images/house4-min.jpg"
          imagePosition="right"
          stats={[
              { label: '- Tip încălzire', value: 'Încălzire în pardoseală' },
              { label: '- Tip tâmplărie', value: 'Tâmplărie Salamander' },
              { label: '- Vedere', value: 'Vedere panoramică' },
              { label: '- Flexibilitate interioară', value: 'Personalizarea amenajării interiorului' }
          ]}
      />
      <Gallery />
      <ContactUs />
      {/* Add other sections here */}
    </main>
  );
}
