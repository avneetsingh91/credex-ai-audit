import { useState } from "react";
import API from "../api";

function LeadModal({ auditId, onClose }) {
  const [form, setForm] = useState({
    email: "",
    company: "",
    role: "",
    teamSize: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const submitLead = async () => {
    try {
      await API.post("/audit/lead", {
        ...form,
        auditId,
      });

      alert("Audit report captured successfully");
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white w-[500px] p-8 rounded-2xl shadow-xl">

        <h2 className="text-2xl font-bold mb-4">
          Save Your Audit Report
        </h2>

        <p className="text-gray-600 mb-6">
          Get your report link and future optimization alerts.
        </p>

        <div className="space-y-4">

          <input
            name="email"
            placeholder="Email"
            className="border p-3 rounded w-full"
            onChange={handleChange}
          />

          <input
            name="company"
            placeholder="Company"
            className="border p-3 rounded w-full"
            onChange={handleChange}
          />

          <input
            name="role"
            placeholder="Role"
            className="border p-3 rounded w-full"
            onChange={handleChange}
          />

          <input
            name="teamSize"
            placeholder="Team Size"
            className="border p-3 rounded w-full"
            onChange={handleChange}
          />

        </div>

        <button
          onClick={submitLead}
          className="w-full bg-black text-white py-3 rounded-xl mt-6"
        >
          Save Report
        </button>

      </div>
    </div>
  );
}

export default LeadModal;