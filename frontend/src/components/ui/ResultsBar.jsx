const ResultsBar = ({ candidates }) => {
  const total = candidates.reduce((sum, c) => sum + c.voteCount, 0);
  const sorted = [...candidates].sort((a, b) => b.voteCount - a.voteCount);
  const leaderId = total > 0 ? sorted[0]?._id : null;

  return (
    <div className="space-y-5">
      {sorted.map((candidate) => {
        const pct = total > 0 ? Math.round((candidate.voteCount / total) * 100) : 0;
        const isLeader = candidate._id === leaderId && total > 0;
        return (
          <div key={candidate._id}>
            <div className="mb-1 flex items-baseline justify-between gap-2">
              <p className="font-semibold text-navy-900">
                {candidate.candidateName}
                {isLeader && (
                  <span className="ml-2 rounded-full bg-gold-100 px-2 py-0.5 text-xs font-semibold text-gold-800">
                    Leading
                  </span>
                )}
              </p>
              <p className="whitespace-nowrap text-sm text-navy-500">
                {candidate.voteCount} vote{candidate.voteCount === 1 ? "" : "s"} &middot; {pct}%
              </p>
            </div>
            <p className="mb-1.5 text-xs text-navy-400">{candidate.candidatePartyName}</p>
            <div className="h-3 w-full overflow-hidden rounded-full bg-navy-50">
              <div
                className={`h-full rounded-full transition-all duration-500 ${isLeader ? "bg-gold-500" : "bg-navy-400"}`}
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>
        );
      })}
      {sorted.length === 0 && (
        <p className="text-sm text-navy-500">No candidates have been added yet.</p>
      )}
    </div>
  );
};

export default ResultsBar;
