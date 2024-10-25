
import HeroSecton from "@/components/heroSecton";
import SkyDive from "@/components/SkyDive";
import dynamic from "next/dynamic";
const ViewCanves=dynamic(()=>import("@/components/viewCanves"),{ssr:false})

export default function Home() {
  return (
    <main className="">
      <HeroSecton />
      <SkyDive/>
      <ViewCanves/>
    </main>
  );
}
