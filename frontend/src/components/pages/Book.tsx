import BookingForm from "../BookingForm";
import Hero from "../Hero";

const Book = () => {
  return (
    <div className="container flex w-screen  flex-col gap-2">
      <Hero />
      <h2 className="text-2xl font-bold mb-4">Book Now</h2>
      <BookingForm />
    </div>
  );
};

export default Book;
