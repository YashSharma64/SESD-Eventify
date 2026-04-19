function Navbar() {
  return (
    <nav className="bg-[#1a1a1a] border-b border-[#2a2a2a] px-6 py-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg"></div>
          <span className="text-2xl font-bold text-white">Eventify</span>
        </div>
        
        <div className="flex items-center gap-4">
          <span className="text-gray-400">Role: <span className="text-blue-400 font-semibold">Attendee</span></span>
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition">
            Login
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
