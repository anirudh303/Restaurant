
import heroImage from "../assets/respic.webp";
const Hero = ()=>{


    return (<div className=" relative w-full h-[400px] overflow-hidden bg-[#304463]">
        <img
          src={heroImage}
          className=" absolute inset-0  w-full h-full object-cover opacity-50"
        />

        <div className=" absolute text-5xl inset-0 font-extrabold text-white flex justify-center top-20">
          <p>Anavi's Restaurant</p>
        </div>
      </div>)
}

export default Hero;