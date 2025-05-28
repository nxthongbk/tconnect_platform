import React from 'react';
import './CardBlock.scss';

interface CardDataBlockProps {
  label: string;
  value: string | number;
  unit?: string;
  className?: string;
}

const CardBlock: React.FC<CardDataBlockProps> = ({ label, value, unit, className }) => (
  <div className={`card-data-border${className ? ` ${className}` : ''}`}>
    <div className="card-label">{label}</div>
    <div className="card-value">
      {value}
      {unit && <span className="card-unit">{unit}</span>}
    </div>
  </div>
);

export default CardBlock;
