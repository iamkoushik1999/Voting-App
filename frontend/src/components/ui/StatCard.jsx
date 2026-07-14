const StatCard = ({ label, value, icon: Icon, accent = "navy" }) => {
  const accents = {
    navy: "bg-navy-800 text-white",
    gold: "bg-gold-500 text-navy-950",
  };

  return (
    <div className="flex items-center gap-4 rounded-xl border border-navy-100 bg-white p-5 shadow-sm">
      {Icon && (
        <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg ${accents[accent]}`}>
          <Icon size={20} />
        </div>
      )}
      <div>
        <p className="text-2xl font-bold text-navy-900">{value}</p>
        <p className="text-sm text-navy-500">{label}</p>
      </div>
    </div>
  );
};

export default StatCard;
