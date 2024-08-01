import { Route, Routes } from "react-router-dom";
import Header from "./layouts/Header";
import Footer from "./layouts/Footer";
import Home from "./pages/Home";
import About from "./components/About";
import Book from "./pages/Book";

const App = () => {
  return (
    <main className="flex flex-col w-screen m-0 p-0">
      <Header />
      <section className=" m-0 p-0">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/book" element={<Book />} />
        </Routes>
      </section>

      <Footer />
    </main>
  );
};

export default App;
