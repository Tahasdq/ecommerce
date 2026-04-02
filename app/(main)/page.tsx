import Container from "@/components/app/Container/Container";
import { MiddleSection } from "@/components/app/MiddleSection/MiddleSection";
import BrowseByDress from "@/components/home/BrowseByDress";
import { Hero , Reviews } from "@/components/home/index";

export default function Home() {
  return (
    <Container>
        <Hero />
        <MiddleSection heading="New Arrival"  productType="newArrival"  route="/products?type=newArrival"/>
        <MiddleSection heading="Top Selling"  productType="topSelling"  route="/products?type=topSelling"/>
        <BrowseByDress/>
        <Reviews />
    </Container>
  );
}
