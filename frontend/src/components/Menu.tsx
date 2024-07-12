import { useState, useEffect } from "react";
import menuData from "../data/menuItems.json";
import withLoading from "./hocs/withLoading";

interface MenuItem {
  id: number;
  name: string;
  price: number;
}

const MenuContainer = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

  useEffect(() => {
    // Simulate fetching menu items from a JSON file
    setTimeout(() => {
      setMenuItems(menuData);
    }, 1000);
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Menu</h2>
      <ul>
        {menuItems.map((item) => (
          <li key={item.id} className="mb-2">
            <div className="flex justify-between">
              <span>{item.name}</span>
              <span>${item.price.toFixed(2)}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

const MenuWithLoading = withLoading(MenuContainer);

const Menu = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Simulate loading data
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  return <MenuWithLoading isLoading={isLoading} />;
};

export default Menu;
