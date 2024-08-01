

import reserveTable from "../assets/reserveTable.png";
import Hero from "../components/Hero";

const items = [
  {
    imgSrc: reserveTable,
    text: "RESERVE A TABLE",
  },
  {
    imgSrc: reserveTable,
    text: "MENU",
  },
  {
    imgSrc: reserveTable,
    text: "ORDER ONLINE",
  },
];

const Home = () => {
  return (
  <main className=" w-full h-full m-0 p-0 ">
    <section className=" flex flex-col">
      <Hero />
      {/* container of icons  */}
      <div className="flex gap-10 mt-14 ">
        {/* card 1 */}
        <div className="flex flex-col items-center bg-testing w-[400px] h-[600px] p-4">
              <figure className=" relative rounded-full w-[200px] h-[200px] bg-testing-hover hover:bg-testing-dark">
                   {/* <img  src={reserveTable} className="absolute inset-0 object-cover" /> */}
              </figure>
               
             <figcaption className=" my-2 text-2xl text-testing-text "> {"RESERVATIONS"}</figcaption>
            <p className=" text-lg md:line-clamp-2 ">
               lorum ipsum  lorum ipsum lorum ipsum lorum ipsum lorum ispum
            </p>

            <button className="p-2 mt-6 text-white bg-testing-text  hover:bg-testing-dark-hover" >
              {"BOOK NOW"}
            </button>

        </div>
 
      </div>
    </section>
    
  </main>
  );
};

export default Home;
