interface EnergySummaryCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  unit?: string;
}

export default function EnergySummaryCard({ icon, label, value, unit }: EnergySummaryCardProps) {
  return (
    <div className="energy-summary-card">
      <div className="card-label">
        {icon}
        <span>{label}</span>
      </div>
      <div className="card-value">
        <span>{value}</span>
        {unit && (
          <span style={{ color: '#90caf9', fontWeight: 600, marginLeft: 6 , fontSize: 16}}>{unit}</span>
        )}
      </div>
    </div>
  );
}