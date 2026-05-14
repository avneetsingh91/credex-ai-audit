const runAuditEngine = (tools, teamSize) => {
  let monthly = 0;
  let recommendations = [];

  tools.forEach((tool) => {
    const name = String(tool.name || "").trim().toLowerCase();
    const plan = String(tool.plan || "").trim().toLowerCase();
    const spend = Number(tool.spend) || 0;
    const seats = Number(tool.seats) || 0;
    const team = Number(teamSize) || 0;

    let save = 0;
    let action = "";
    let reason = "";

    if (name.includes("chatgpt") && plan.includes("team")) {
      save = Math.round(spend * 0.30); // 30% potential reduction
      action = "Switch to Plus";
      reason = "Team plan often exceeds requirements for small teams.";
    }

    else if (name.includes("cursor") && plan.includes("business")) {
      save = Math.round(spend * 0.25);
      action = "Switch to Pro";
      reason = "Business tier can be excessive for smaller engineering teams.";
    }

    else if (name.includes("claude") && plan.includes("team")) {
      save = Math.round(spend * 0.20);
      action = "Switch to Pro";
      reason = "Smaller teams usually fit Pro plans with lower overhead.";
    }

    else if (spend > 100 && team <= 5) {
      save = Math.round(spend * 0.15);
      action = "Optimize usage";
      reason = "Detected spend higher than expected for team size.";
    }

    if (save > 0) {
      monthly += save;

      recommendations.push({
        tool: tool.name,
        action,
        savings: save,
        reason,
      });
    }
  });

  return {
    monthly,
    annual: monthly * 12,
    recommendations,
  };
};

module.exports = runAuditEngine;