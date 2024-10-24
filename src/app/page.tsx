
import HeroSecton from "@/components/heroSecton";
import dynamic from "next/dynamic";
const ViewCanves=dynamic(()=>import("@/components/viewCanves"),{ssr:false})

export default function Home() {
  return (
    <main className="">
      <HeroSecton />
      <ViewCanves/>
    </main>
  );
}
