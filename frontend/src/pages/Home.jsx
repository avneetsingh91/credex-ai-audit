import ToolForm from "../components/ToolForm";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Home() {
  return (
    
    <div className="min-h-screen bg-slate-50">
        <Navbar />

      <section className="bg-gradient-to-r from-black to-slate-800 text-white py-24 px-6">
        <div className="max-w-6xl mx-auto text-center">

          <h1 className="text-6xl font-bold leading-tight">
            Audit Your AI Spend
            <br />
            Before It Audits Your Budget
          </h1>

          <p className="mt-6 text-xl text-slate-300 max-w-3xl mx-auto">
            Analyze AI tool subscriptions, detect hidden waste, and uncover
            optimization opportunities in minutes.
          </p>

          <div className="mt-10 flex justify-center gap-4">
            <button
              onClick={() =>
                document
                  .getElementById("audit-section")
                  .scrollIntoView({ behavior: "smooth" })
              }
              className="bg-white text-black px-8 py-4 rounded-xl font-semibold"
            >
              Start Free Audit
            </button>
          </div>

        </div>
      </section>

      <section id="audit-section" className="max-w-5xl mx-auto px-6 py-20">
        <ToolForm />
      </section>

      <Footer />

    </div>
  );
}

export default Home;