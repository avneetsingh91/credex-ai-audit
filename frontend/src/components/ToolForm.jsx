import { useState, useEffect, useRef } from "react";
import API from "../api";
import ResultCard from "./ResultCard";

const toolOptions = {
  ChatGPT: ["Plus", "Team", "Enterprise"],
  Claude: ["Pro", "Team"],
  Cursor: ["Pro", "Business"],
};

function ToolForm() {
  const resultRef = useRef(null);

  const [loading, setLoading] = useState(false);

  const [tools, setTools] = useState([
    { name: "ChatGPT", plan: "Team", spend: "", seats: "" }
  ]);

  const [teamSize, setTeamSize] = useState("");
  const [useCase, setUseCase] = useState("");
  const [result, setResult] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("lastAudit");
    if (saved) {
      setResult(JSON.parse(saved));
    }
  }, []);

  const updateTool = (index, field, value) => {
    const updated = [...tools];
    updated[index][field] = value;

    if (field === "name") {
      updated[index].plan = toolOptions[value][0];
    }

    setTools(updated);
  };

  const addTool = () => {
    setTools([
      ...tools,
      {
        name: "ChatGPT",
        plan: "Plus",
        spend: "",
        seats: ""
      }
    ]);
  };

  const submitHandler = async () => {
    setLoading(true);

    try {
      const res = await API.post("/audit/create", {
        tools,
        teamSize,
        useCase,
      });

      setResult(res.data);
      localStorage.setItem("lastAudit", JSON.stringify(res.data));

      setTimeout(() => {
        resultRef.current?.scrollIntoView({
          behavior: "smooth"
        });
      }, 300);
    } catch (err) {
      console.log(err);
    }

    setLoading(false);
  };

  return (
    <>
      {loading && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-white p-10 rounded-2xl text-center">
            <div className="animate-spin h-12 w-12 border-4 border-black border-t-transparent rounded-full mx-auto"></div>
            <p className="mt-4 text-xl font-semibold">
              Generating your audit...
            </p>
          </div>
        </div>
      )}

      <div className="bg-white rounded-3xl shadow-xl p-10">

        <h2 className="text-3xl font-bold mb-8">
          Run Company AI Spend Audit
        </h2>

        {tools.map((tool, index) => (
          <div key={index} className="grid md:grid-cols-4 gap-4 mb-4">

            <select
              className="border p-3 rounded-xl"
              value={tool.name}
              onChange={(e) =>
                updateTool(index, "name", e.target.value)
              }
            >
              {Object.keys(toolOptions).map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>

            <select
              className="border p-3 rounded-xl"
              value={tool.plan}
              onChange={(e) =>
                updateTool(index, "plan", e.target.value)
              }
            >
              {toolOptions[tool.name].map((plan) => (
                <option key={plan}>{plan}</option>
              ))}
            </select>

            <input
              type="number"
              placeholder="Monthly Spend"
              className="border p-3 rounded-xl"
              value={tool.spend}
              onChange={(e) =>
                updateTool(index, "spend", e.target.value)
              }
            />

            <input
              type="number"
              placeholder="Seats"
              className="border p-3 rounded-xl"
              value={tool.seats}
              onChange={(e) =>
                updateTool(index, "seats", e.target.value)
              }
            />

          </div>
        ))}

        <button
          onClick={addTool}
          className="bg-gray-200 px-4 py-2 rounded-xl"
        >
          Add Tool
        </button>

        <div className="grid md:grid-cols-2 gap-4 mt-6">

          <input
            placeholder="Team Size"
            className="border p-3 rounded-xl"
            value={teamSize}
            onChange={(e) => setTeamSize(e.target.value)}
          />

          <select
            className="border p-3 rounded-xl"
            value={useCase}
            onChange={(e) => setUseCase(e.target.value)}
          >
            <option value="">Select Use Case</option>
            <option>coding</option>
            <option>research</option>
            <option>writing</option>
          </select>

        </div>

        <button
          onClick={submitHandler}
          className="w-full bg-black text-white py-4 rounded-xl mt-8 text-lg"
        >
          Run Audit
        </button>

        <button
  onClick={() => {
    localStorage.removeItem("lastAudit");
    window.location.reload();
  }}
  className="w-full mt-3 border py-3 rounded-xl"
>
  Clear Previous Audit
</button>

      </div>

      {result && (
        <div ref={resultRef}>
          <ResultCard result={result} />
        </div>
      )}
    </>
  );
}

export default ToolForm;