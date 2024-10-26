import Carusal from "@/components/carusal";
import HeroSecton from "@/components/heroSecton";
import SkyDive from "@/components/SkyDive";
import SodaInfo from "@/components/SodaInfo";
import dynamic from "next/dynamic";
const ViewCanves = dynamic(() => import("@/components/viewCanves"), {
  ssr: false,
});

export default function Home() {
  return (
    <main>
      <HeroSecton />
      <SkyDive />
      <Carusal />
      <SodaInfo />
      <ViewCanves />
    </main>
  );
}
