
interface JournalStatsProps {
  totalEntries: number;
  monthlyEntries: number;
}

export const JournalStats = ({ totalEntries, monthlyEntries }: JournalStatsProps) => {
  return (
    <div className="flex items-center justify-center gap-8 py-6 bg-gray-50 rounded-xl mb-8">
      <div className="text-center">
        <div className="text-3xl font-bold text-indigo-600">{totalEntries}</div>
        <div className="text-sm text-gray-600">Total Entries</div>
      </div>
      <div className="w-px h-8 bg-gray-300"></div>
      <div className="text-center">
        <div className="text-3xl font-bold text-emerald-600">{monthlyEntries}</div>
        <div className="text-sm text-gray-600">This Month</div>
      </div>
    </div>
  );
};
