import Nav from "@/components/Nav";
import CinematicHero from "@/components/CinematicHero";
import Racing from "@/components/Racing";
import RaceMindset from "@/components/RaceMindset";
import About from "@/components/About";
import CV from "@/components/CV";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main>
      <Nav />
      <CinematicHero />
      <Racing />
      <RaceMindset />
      <About />
      <CV />
      <Contact />
    </main>
  );
}
