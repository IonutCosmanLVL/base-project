import Hero from '../components/hero/Hero';

export default function HomePage() {
  return (
    <main>
      <Hero />

      <section className="w-full flex items-center justify-center min-h-[80vh] bg-white">
        <div className="max-w-[1440px] w-full px-6 text-center">
          <h1 className="text-4xl font-inter text-space">
            Welcome to the Base Project
          </h1>
        </div>
      </section>

      {/* Add other sections here */}
    </main>
  );
}
