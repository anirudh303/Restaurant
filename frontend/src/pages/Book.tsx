import BookingForm from "../components/BookingForm";
import Hero from "../components/Hero";

const Book = () => {
  return (
    <div className=" flex flex-col w-screen   gap-2">
      <Hero />
      <h2 className="text-2xl font-bold mb-4">Book Now</h2>
      <BookingForm />
    </div>
  );
};

export default Book;
