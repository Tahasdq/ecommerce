import Wrapper from "../app/Wrapper/Wrapper";
import ReviewsCarousel from "./ReviewsCarousel";

export default function Reviews() {
  const data =[
    {
      id:1,
      name:"Taha",
      reviewStars:2,
      notes:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur animi, nam dignissimos tempore vel beatae fugit nostrum officiis repudiandae laborum repellat ut nulla exercitationem magni autem, minus nobis quibusdam non?" 
    },
    {
      id:2,
      name:"Taha",
      reviewStars:4,
      notes:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur animi, nam dignissimos tempore vel beatae fugit nostrum officiis repudiandae laborum repellat ut nulla exercitationem magni autem, minus nobis quibusdam non?" 
    },
    {
      id:3,
      name:"Taha",
      reviewStars:5,
      notes:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur animi, nam dignissimos tempore vel beatae fugit nostrum officiis repudiandae laborum repellat ut nulla exercitationem magni autem, minus nobis quibusdam non?" 
    },
    {
      id:4,
      name:"Taha",
      reviewStars:2,
      notes:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur animi, nam dignissimos tempore vel beatae fugit nostrum officiis repudiandae laborum repellat ut nulla exercitationem magni autem, minus nobis quibusdam non?" 
    },
    {
      id:5,
      name:"Taha",
      reviewStars:6,
      notes:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur animi, nam dignissimos tempore vel beatae fugit nostrum officiis repudiandae laborum repellat ut nulla exercitationem magni autem, minus nobis quibusdam non?" 
    },
  ]
  return (
    <Wrapper className="flex flex-col  gap-10  ">
      <div className="flex justify-center">
        <h2 className="font-bold text-3xl md:text-5xl">OUR HAPPY CUSTOMERS</h2>
      </div>
      <ReviewsCarousel data={data}/>
    </Wrapper>
  );
}
