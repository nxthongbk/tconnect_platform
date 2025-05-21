import React, { useState } from 'react';

const cameras = [
  'CAM-CK-001',
  'CAM-CK-002',
  'CAM-CK-003',
  'CAM-CK-004',
  'CAM-CK-005',
  'CAM-CK-006',
];

export default function CameraList() {
  const [selected, setSelected] = useState('CAM-CK-001');

  return (
    <div className="bg-[#0a0e1a] text-white w-72 p-4 rounded-md border border-gray-700">
      <h2 className="text-sm text-cyan-400 font-semibold mb-4">CAMERA LIST</h2>
      <div className="grid grid-cols-2 gap-4">
        {cameras.map(cam => {
          const isSelected = selected === cam;
          const baseClasses =
            'flex flex-col items-center justify-center border p-2 rounded-md cursor-pointer transition-all';
          const selectedClasses = 'bg-cyan-700/30 border-cyan-400';
          const unselectedClasses = 'border-gray-600 hover:bg-gray-700/30';

          return (
            <div
              key={cam}
              className={`${baseClasses} ${isSelected ? selectedClasses : unselectedClasses}`}
              onClick={() => setSelected(cam)}
            >
              <img src="/camera-icon.png" alt="Camera" className="w-10 h-10 mb-1" />
              <span className="text-xs font-medium">{cam}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
