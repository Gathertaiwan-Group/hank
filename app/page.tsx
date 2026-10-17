import About from "@/components/About";
import ClientStrip from "@/components/ClientStrip";
import Contact from "@/components/Contact";
import CtaBand from "@/components/CtaBand";
import Faq from "@/components/Faq";
import FloatingLine from "@/components/FloatingLine";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Process from "@/components/Process";
import Works from "@/components/Works";
import { getWorks } from "@/lib/works";

export const revalidate = 300;

/** README §7.11：floatingLine 預設 true */
const FLOATING_LINE = true;

export default async function Page() {
  const works = await getWorks();
  return (
    <div className="page">
      <Header />
      <main>
        <Hero />
        <ClientStrip />
        <Works works={works} />
        <CtaBand />
        <Process />
        <About />
        <Faq />
        <Contact />
      </main>
      <FloatingLine show={FLOATING_LINE} />
    </div>
  );
}
