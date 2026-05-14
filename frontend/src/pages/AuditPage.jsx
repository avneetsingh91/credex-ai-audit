import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api";

function AuditPage() {
  const { shareId } = useParams();
  const [audit, setAudit] = useState(null);

  useEffect(() => {
    const fetchAudit = async () => {
      try {
        const res = await API.get(`/audit/${shareId}`);
        setAudit(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchAudit();
  }, [shareId]);

  if (!audit) {
    return (
      <div className="min-h-screen flex items-center justify-center text-2xl">
        Loading audit...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-4xl mx-auto">

        <h1 className="text-5xl font-bold text-center mt-10">
          Shared Audit Report
        </h1>

        <p className="text-center mt-4 text-gray-600">
          Public version — no personal details included
        </p>

        <div className="bg-white p-8 mt-10 rounded-2xl shadow">

          <h2 className="text-3xl font-bold">
            Monthly Savings: ${audit.totalMonthlySavings}
          </h2>

          <h3 className="text-xl mt-2">
            Annual Savings: ${audit.totalAnnualSavings}
          </h3>

          <div className="mt-8 space-y-4">
            {audit.recommendations.map((item, i) => (
              <div
                key={i}
                className="border rounded-xl p-4 bg-slate-50"
              >
                <p className="font-semibold text-lg">
                  {item.tool}
                </p>

                <p>{item.action}</p>

                <p className="text-green-700 font-semibold">
                  Save ${item.savings}/mo
                </p>

                <p className="text-gray-600">
                  {item.reason}
                </p>
              </div>
            ))}
          </div>

          <div className="bg-slate-100 mt-8 p-6 rounded-xl">
            <h4 className="font-bold text-lg mb-3">
              AI Summary
            </h4>

            <p>{audit.aiSummary}</p>
          </div>

        </div>

      </div>
    </div>
  );
}

export default AuditPage;