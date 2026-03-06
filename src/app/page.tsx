import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import NominationForm from "@/components/NominationForm";
import RolesSection from "@/components/RolesSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative">
      <Navbar />
      <Hero />
      <NominationForm />
      <RolesSection />
      <Footer />
    </main>
  );
}
