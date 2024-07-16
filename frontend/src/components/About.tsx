import Hero from "./Hero";

const About = () => {
  return (
    <div>
      <Hero />
      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">About Us</h2>
        <p>
          Little Lemon Restaurant has been serving the community with fresh and
          delicious meals since 2024. Our chefs use only the best ingredients to
          create mouth-watering dishes that you'll love.
        </p>
      </div>
    </div>
  );
};

export default About;
