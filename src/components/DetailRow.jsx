export default function DetailRow({ icon, label, value }) {
  return (
    <div className="detail-row">
      <div className="detail-row-label">
        {icon}
        <span>{label}</span>
      </div>
      <div className="detail-row-value">{value}</div>
    </div>
  );
}
