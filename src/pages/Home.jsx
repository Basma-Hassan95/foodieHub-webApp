import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../CartContext";


const API_URL = "https://foodiehub-backend-production.up.railway.app";


const categories = [
  { id: "1", name: "All", image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=200" },
  { id: "2", name: "Fast Food", image: "https://images.unsplash.com/photo-1561758033-d89a9ad46330?w=200" },
  { id: "3", name: "Pizza", image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=200" },
  { id: "4", name: "Chinese", image: "https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=200" },
  { id: "5", name: "Desi Food", image: "https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?w=200" },
];

const Home = () => {
  const [foodItems, setFoodItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    fetchFoodItems();
  }, []);

  const fetchFoodItems = async () => {
    try {
      const response = await fetch(`${API_URL}/getAllFoods`);
      const data = await response.json();
      setFoodItems(data.foodItems);
      setFilteredItems(data.foodItems);
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCategorySelect = (categoryName) => {
    setSelectedCategory(categoryName);
    setSearchQuery("");
    if (categoryName === "All") {
      setFilteredItems(foodItems);
    } else {
      setFilteredItems(
        foodItems.filter(
          (item) =>
            item.category &&
            item.category.toLowerCase() === categoryName.toLowerCase()
        )
      );
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setSelectedCategory("All");
    if (query === "") {
      setFilteredItems(foodItems);
    } else {
      setFilteredItems(
        foodItems.filter((item) =>
          item.name.toLowerCase().includes(query.toLowerCase())
        )
      );
    }
  };

  const handleBuyNow = (item) => {
    addToCart(item);
    navigate("/cart");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-[#E67E22] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Search Bar */}
      <div className="bg-[#893271] py-4 px-4">
        <input
          type="text"
          placeholder="Search for food..."
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          className="w-full max-w-2xl mx-auto block bg-white rounded-md px-4 py-2 outline-none"
        />
      </div>

      {/* Categories */}
      <div className="bg-white shadow py-4 px-4 overflow-x-auto">
        <div className="flex gap-4 max-w-5xl mx-auto">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategorySelect(cat.name)}
              className="flex flex-col items-center min-w-[70px]"
            >
              <div
                className={`w-16 h-16 rounded-full overflow-hidden border-2 ${
                  selectedCategory === cat.name
                    ? "border-[#893271] border-[3px]"
                    : "border-gray-200"
                }`}
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <span
                className={`text-xs mt-1 text-center ${
                  selectedCategory === cat.name
                    ? "text-[#893271] font-bold"
                    : "text-gray-500"
                }`}
              >
                {cat.name}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Food Items */}
      <div className="max-w-5xl mx-auto p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredItems.length === 0 ? (
          <p className="text-center text-gray-500 col-span-2 mt-10">
            No items found!
          </p>
        ) : (
          filteredItems.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-lg shadow p-4 flex gap-4"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-28 h-28 rounded-lg object-cover"
              />
              <div className="flex-1">
                <h3 className="font-bold text-lg">{item.name}</h3>
                <p className="text-sm text-gray-500">{item.category}</p>
                <p className="text-sm text-gray-600">{item.description}</p>
                <p className="text-[#893271] font-bold text-lg mt-1">
                  Rs. {item.price}/=
                </p>
              </div>
              <div className="flex flex-col gap-2 justify-center">
                <button
                  onClick={() => addToCart(item)}
                  className="bg-[#F2C75B] text-white text-xs font-bold px-3 py-2 rounded"
                >
                  Add to Cart
                </button>
               <button 
  onClick={() => navigate(`/food/${item._id}`, { state: item })}
  className="bg-[#893271] text-white text-xs font-bold px-3 py-2 rounded"
>
  Buy Now
</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
