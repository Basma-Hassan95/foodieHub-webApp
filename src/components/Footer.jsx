const Footer = () => {
  return (
    <footer className="bg-[#3C1A47] text-gray-400 py-10 px-4 mt-10">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-2">
          <span className="text-xl">🍴</span>
          <span className="font-bold text-lg">
            <span className="text-white">Foodie</span>
            <span className="text-[#E67E22]">Hub</span>
          </span>
        </div>

        <p className="text-sm text-center">
          Your favourite food, delivered fast 🚀
        </p>

        <div className="flex gap-4 text-sm">
          <a
            href="https://github.com/Basma-Hassan95/foodieHub-frontend"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#E67E22] transition"
          >
            GitHub
          </a>
          <span>|</span>
          <span>Built by Basma Hassan</span>
        </div>
      </div>

      <div className="text-center text-xs text-gray-600 mt-6 border-t border-gray-800 pt-4">
        © {new Date().getFullYear()} FoodieHub. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;