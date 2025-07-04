export const Card = ({
  title,
  children,
  height,
}: {
  title: string;
  icon?: string;
  children: React.ReactNode;
  height?: string | number;
}) => (
  <div className="dashboard-card" style={height ? { height } : undefined}>
    <div className="dashboard-card-header">
      <span className="dashboard-card-title">{title}</span>
    </div>
    <div className="dashboard-card-content">{children}</div>
  </div>
);
