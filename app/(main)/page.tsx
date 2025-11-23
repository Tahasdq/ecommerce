import Container from "@/components/app/Container/Container";
import { Hero, NewArrival , Reviews } from "@/components/home/index";

export default function Home() {
  return (
    <Container>
        <Hero />
        <NewArrival />
        <Reviews />
    </Container>
  );
}
