import heroImage from "../../assets/respic.webp";
import bgImage1 from "../../assets/bg-image-1.webp";
import bgImage2 from "../../assets/bg-image-2.webp";
import reserveTable from "../../assets/reserveTable.png";
import Hero from "../Hero";

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
    <div className=" w-screen h-max bg-[#80AF81] ">
      {/* hero seection */}
      <Hero />
      {/* <div className="  relative w-full h-[400px] overflow-hidden bg-[#304463]">
        <img
          src={heroImage}
          className=" absolute inset-0  w-full h-full object-cover opacity-50"
        />

        <div className=" absolute text-5xl inset-0 font-extrabold text-white flex justify-center top-20">
          <p>Little Lemon Restaurant</p>
        </div>
      </div> */}
      {/* main section */}
      <div className="w-screen h-max relative">
        {/* sectn 1 */}
        <div className="relative w-full h-[700px] flex flex-col items-center pt-20">
          {/* //bg image */}
          <img
            src={bgImage1}
            className=" absolute inset-0  w-full h-full object-cover opacity-40"
          />
          {/* //content */}
          <div className="h-200px w-[600px] z-10 flex items-center justify-center gap-36 ">
            {/* // action items */}
            {items.map((item, index) => (
              <div
                key={index}
                className="flex flex-col flex-shrink-0 items-center justify-center h-[80px] w-auto"
              >
                <img
                  src={item.imgSrc}
                  className="w-[120px] h-[120px] rounded-full"
                  alt={item.text}
                />
                <p className="text-xl text-white">{item.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* section2 */}
        <div className="relative w-full h-[700px] flex flex-col items-center justify-center">
          <img
            src={bgImage2}
            className=" absolute inset-0  object-cover w-full h-full opacity-25"
          />

          <div className="absolute mt-24 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center items-center  ">
            <h1 className="text-3xl font-semibold ">Testimonials</h1>
            <p className="text-pretty mt-8">
              lorum ipsum lorum ipsum v v lorum ipsum
            </p>
            <hr />
          </div>
        </div>
        {/* //about us */}
        <div className=" absolute   flex flex-col items-center  z-40 w-1/2 h-1/2 inset-0 bg-white top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  overflow-hidden  p-4 shadow-md  ">
          {/* first section */}
          <div className=" flex flex-col w-full h-1/5 justify-center items-center">
            <h1 className="text-3xl font-semibold ">About Us</h1>
            <p>lorum ipsum lorum ipsum v v lorum ipsum</p>
            <hr />
          </div>

          {/* second section */}
          <div className=" relative flex w-full h-[400px] bg-neutral-500">
            {/* left photot */}
            <img
              src={reserveTable}
              className="h-full w-1/2 absolute left-0 top-0 bg-white"
            />
            {/* right phptot */}
            <img
              src={reserveTable}
              className="h-full w-1/2 absolute right-0 top-0 bg-white"
            />
          </div>
          {/* third section */}
          <div className=" flex flex-col w-full h-1/5  justify-center items-center">
            <h1>end</h1>
            <p>lorum ipsum lorum ipsum v v lorum ipsum</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
