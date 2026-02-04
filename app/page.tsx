import About from "./_components/About";
import AboutChamber from "./_components/AboutChamber";
import Appointment from "./_components/Appointment";
import Hero from "./_components/Hero";

export default function Home() {
    return (
        <>
            <Hero/>
            <About/>
            <AboutChamber/>
            <Appointment/>
        </>
    );
}
