import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/pages/Home";
import About from "./components/About";
import Book from "./components/pages/Book";

const App = () => {
  return (
    <main className="flex flex-col w-screen min-h-screen ">
      <Header />
      <main className=" w-screen">
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
