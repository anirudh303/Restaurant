import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/pages/Home";
import About from "./components/About";
import Book from "./components/Book";

const App = () => {
  return (
    <main className="flex flex-col w-screen min-h-screen ">
      <Header />
      <main className="flex-grow container mx-auto ">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/book" element={<Book />} />
        </Routes>
      </main>

      <Footer />
    </main>
  );
};

export default App;
