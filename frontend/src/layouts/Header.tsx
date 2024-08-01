import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="w-screen bg-testing text-testing-dark p-4 flex justify-between items-center">
      <h1 className="text-3xl font-bold">LR</h1>
      <nav>
        <Link to="/" className="mx-2">
          Home
        </Link>
        <Link to="/about" className="mx-2">
         Menu
        </Link>
        <Link to="/book" className="mx-2">
          Book Now
        </Link>
      </nav>
    </header>
  );
};

export default Header;
