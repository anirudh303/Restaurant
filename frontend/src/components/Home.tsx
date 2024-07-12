const Home = () => {
  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex items-center justify-center">
          <img src="https://via.placeholder.com/400" alt="Restaurant" />
        </div>
        <div className="flex items-center justify-center">
          <p className="text-2xl">
            Welcome to Little Lemon Restaurant. Enjoy our delicious menu items
            made from the freshest ingredients.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
