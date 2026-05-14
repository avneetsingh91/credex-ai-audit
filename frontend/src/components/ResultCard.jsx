import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Copy,
  CheckCircle2,
  TrendingUp,
  DollarSign,
} from "lucide-react";

import LeadModal from "./LeadModal";
import SavingsChart from "./SavingsChart";

function ResultCard({ result }) {
  const [showModal, setShowModal] = useState(false);
  const [copied, setCopied] = useState(false);

  const publicUrl = `${window.location.origin}/audit/${result.shareId}`;

  const copyLink = async () => {
    await navigator.clipboard.writeText(publicUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mt-14 space-y-8">

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-3xl shadow-xl p-10"
      >
        <h2 className="text-4xl font-bold mb-8">
          Audit Summary
        </h2>

        <div className="grid md:grid-cols-3 gap-6">

          <div className="bg-green-50 rounded-2xl p-6">
            <DollarSign className="mb-3" />
            <p className="text-gray-600">Monthly Savings</p>
            <h3 className="text-3xl font-bold">
              ${Number(result.totalMonthlySavings).toLocaleString()}
            </h3>
          </div>

          <div className="bg-blue-50 rounded-2xl p-6">
            <TrendingUp className="mb-3" />
            <p className="text-gray-600">Annual Savings</p>
            <h3 className="text-3xl font-bold">
              ${Number(result.totalAnnualSavings).toLocaleString()}
            </h3>
          </div>

          <div className="bg-purple-50 rounded-2xl p-6">
            <CheckCircle2 className="mb-3" />
            <p className="text-gray-600">Recommendations</p>
            <h3 className="text-3xl font-bold">
              {result.recommendations.length}
            </h3>
          </div>

        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-white rounded-3xl shadow-xl p-10"
      >
        <h3 className="text-2xl font-bold mb-6">
          Optimization Recommendations
        </h3>

        <div className="space-y-4">
          {result.recommendations.map((item, index) => (
            <div
              key={index}
              className="border rounded-2xl p-6 hover:shadow-md transition"
            >
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-bold text-xl">
                  {item.tool}
                </h4>

                <span className="bg-green-100 text-green-700 px-4 py-1 rounded-full">
                  Save ${item.savings}
                </span>
              </div>

              <p className="font-medium">
                {item.action}
              </p>

              <p className="text-gray-600 mt-2">
                {item.reason}
              </p>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="bg-white rounded-3xl shadow-xl p-10"
      >
        <h3 className="text-2xl font-bold mb-6">
          AI Analysis
        </h3>

        <div className="bg-slate-50 rounded-2xl p-6 leading-8 text-gray-700">
          {result.aiSummary}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
      >
        <SavingsChart result={result} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.4 }}
        className="bg-white rounded-3xl shadow-xl p-10"
      >
        <h3 className="text-2xl font-bold mb-6">
          Share Report
        </h3>

        <div className="flex flex-wrap gap-4">

          <button
            onClick={() => setShowModal(true)}
            className="bg-black text-white px-6 py-3 rounded-xl"
          >
            Save Full Report
          </button>

          <Link
            to={`/audit/${result.shareId}`}
            className="bg-blue-600 text-white px-6 py-3 rounded-xl"
          >
            Public View
          </Link>

          <button
            onClick={copyLink}
            className="bg-gray-100 px-6 py-3 rounded-xl flex items-center gap-2"
          >
            <Copy size={18} />
            {copied ? "Copied" : "Copy Link"}
          </button>

        </div>
      </motion.div>

      {showModal && (
        <LeadModal
          auditId={result._id}
          onClose={() => setShowModal(false)}
        />
      )}

    </div>
  );
}

export default ResultCard;