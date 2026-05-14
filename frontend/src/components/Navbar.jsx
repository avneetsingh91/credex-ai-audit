function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between">

        <h1 className="font-bold text-xl">
          AI Spend Audit
        </h1>

        <button
          onClick={() =>
            document
              .getElementById("audit-section")
              .scrollIntoView({ behavior: "smooth" })
          }
          className="bg-black text-white px-5 py-2 rounded-xl"
        >
          Run Audit
        </button>

      </div>
    </header>
  );
}

export default Navbar;