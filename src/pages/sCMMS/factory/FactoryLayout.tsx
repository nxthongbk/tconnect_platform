import React, { useState } from 'react';
import { Maximize2, Minimize2, RotateCcw } from 'lucide-react';
import Factory3D from './Factory3D';
import { mockEquipment } from '../data/mockData';

export default function FactoryLayout() {
  const [selectedEquipment, setSelectedEquipment] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showCameraStream, setShowCameraStream] = useState(false);
  const [selectedCamera, setSelectedCamera] = useState<string | null>(null);

  const handleEquipmentSelect = (equipmentId: string) => {
    setSelectedEquipment(equipmentId);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const resetView = () => {
    setSelectedEquipment(null);
  };

  // Camera stream handlers for Factory3D
  const handleShowCameraStream = (cameraId: string) => {
    // Always close first, then open to force modal re-mount
    setShowCameraStream(false);
    setTimeout(() => {
      setSelectedCamera(cameraId);
      setShowCameraStream(true);
      setIsFullscreen(true);
    }, 0);
  };
  const handleCloseCameraStream = () => {
    setShowCameraStream(false);
    setSelectedCamera(null);
    setIsFullscreen(false);
  };

  return (
    <div className="p-10 space-y-10 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1
            className="text-5xl font-bold bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent leading-tight"
            style={{ marginBottom: 0, paddingBottom: 2 }}
          >
            3D Factory Layout
          </h1>
          <p className="text-slate-600 mt-2 text-xl font-medium">
            Interactive 3D visualization of factory equipment status
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={resetView}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
          >
            <RotateCcw size={16} />
            Reset View
          </button>
          <button
            onClick={toggleFullscreen}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-3 rounded-xl flex items-center gap-2 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
            {isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
          </button>
        </div>
      </div>

      {/* Equipment Status Overview with Pagination */}
      {(() => {
        const [currentPage, setCurrentPage] = React.useState(1);
        const [itemsPerPage, setItemsPerPage] = React.useState(12);
        const totalPages = Math.ceil(mockEquipment.length / itemsPerPage);
        const paginatedEquipment = mockEquipment.slice(
          (currentPage - 1) * itemsPerPage,
          currentPage * itemsPerPage
        );

        // Reset to first page if itemsPerPage changes
        React.useEffect(() => {
          setCurrentPage(1);
        }, [itemsPerPage]);

        return (
          <>
            <div className="grid grid-cols-1 smallLaptop:grid-cols-4 gap-6 mb-4">
              {paginatedEquipment.map(equipment => (
                <div
                  key={equipment.id}
                  onClick={() => handleEquipmentSelect(equipment.id)}
                  className={`bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border cursor-pointer transition-all duration-300 hover:shadow-xl hover:transform hover:scale-105 ${
                    selectedEquipment === equipment.id
                      ? 'border-blue-500 ring-2 ring-blue-200'
                      : 'border-white/50 hover:border-blue-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-gray-900 text-sm">{equipment.name}</h3>
                    <div
                      className={`w-3 h-3 rounded-full ${
                        equipment.status === 'operational'
                          ? 'bg-green-500 animate-pulse'
                          : equipment.status === 'maintenance'
                            ? 'bg-orange-500'
                            : equipment.status === 'broken'
                              ? 'bg-red-500'
                              : 'bg-gray-500'
                      }`}
                    ></div>
                  </div>

                  <div className="space-y-1 text-xs text-gray-600">
                    <p>
                      <span className="font-medium">Model:</span> {equipment.model}
                    </p>
                    <p>
                      <span className="font-medium">Location:</span> {equipment.location}
                    </p>
                    <p>
                      <span className="font-medium">Status:</span>
                      <span
                        className={`ml-1 px-2 py-0.5 rounded-full text-xs font-medium ${
                          equipment.status === 'operational'
                            ? 'bg-green-100 text-green-800'
                            : equipment.status === 'maintenance'
                              ? 'bg-orange-100 text-orange-800'
                              : equipment.status === 'broken'
                                ? 'bg-red-100 text-red-800'
                                : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {equipment.status}
                      </span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
            {/* Pagination Controls and Rows Per Page Selector */}
            {(totalPages > 1 || mockEquipment.length > 0) && (
              <div className="flex flex-col smallLaptop:flex-row justify-center smallLaptop:justify-between items-center gap-4 mb-8">
                {totalPages > 1 && (
                  <div className="flex justify-center items-center gap-1 flex-wrap">
                    <button
                      onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      className={`px-3 py-1 rounded-lg border text-sm font-medium transition-colors duration-200 ${
                        currentPage === 1
                          ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                          : 'bg-white text-blue-600 border-blue-200 hover:bg-blue-50 hover:text-blue-800'
                      }`}
                    >
                      Prev
                    </button>
                    {/* Smart pagination: show first, last, current, neighbors, ellipsis */}
                    {(() => {
                      const pages = [];
                      const pageWindow = 2;
                      for (let i = 1; i <= totalPages; i++) {
                        if (
                          i === 1 ||
                          i === totalPages ||
                          (i >= currentPage - pageWindow && i <= currentPage + pageWindow)
                        ) {
                          pages.push(i);
                        } else if (
                          (i === 2 && currentPage - pageWindow > 2) ||
                          (i === totalPages - 1 && currentPage + pageWindow < totalPages - 1)
                        ) {
                          pages.push('ellipsis-' + i);
                        }
                      }
                      let lastWasEllipsis = false;
                      return pages.map(page => {
                        if (typeof page === 'string' && page.startsWith('ellipsis')) {
                          if (lastWasEllipsis) return null;
                          lastWasEllipsis = true;
                          return (
                            <span key={page} className="px-2 text-gray-400 select-none">
                              ...
                            </span>
                          );
                        } else {
                          lastWasEllipsis = false;
                          return (
                            <button
                              key={page}
                              onClick={() => setCurrentPage(page as number)}
                              className={`px-3 py-1 rounded-lg border text-sm font-medium transition-colors duration-200 ${
                                currentPage === page
                                  ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                                  : 'bg-white text-blue-600 border-blue-200 hover:bg-blue-50 hover:text-blue-800'
                              }`}
                            >
                              {page}
                            </button>
                          );
                        }
                      });
                    })()}
                    <button
                      onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                      disabled={currentPage === totalPages}
                      className={`px-3 py-1 rounded-lg border text-sm font-medium transition-colors duration-200 ${
                        currentPage === totalPages
                          ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                          : 'bg-white text-blue-600 border-blue-200 hover:bg-blue-50 hover:text-blue-800'
                      }`}
                    >
                      Next
                    </button>
                  </div>
                )}
                {/* Rows per page selector */}
                <div className="flex items-center gap-2">
                  <label className="text-sm text-gray-600 font-medium">Rows per page:</label>
                  <select
                    value={itemsPerPage}
                    onChange={e => setItemsPerPage(Number(e.target.value))}
                    className="border border-gray-200 rounded-lg px-2 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 focus:bg-white"
                  >
                    {[8, 12, 16, 20, 32, 48].map(num => (
                      <option key={num} value={num}>
                        {num}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}
          </>
        );
      })()}

      {/* 3D Factory View */}
      <div
        className={`bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 overflow-hidden transition-all duration-500 ${
          isFullscreen ? 'fixed inset-4 z-50' : 'h-[600px]'
        }`}
      >
        <Factory3D
          selectedEquipment={selectedEquipment}
          onEquipmentSelect={handleEquipmentSelect}
          isFullscreen={isFullscreen}
          onClose={() => setIsFullscreen(false)}
          showCameraStream={showCameraStream}
          selectedCamera={selectedCamera}
          onShowCameraStream={handleShowCameraStream}
          onCloseCameraStream={handleCloseCameraStream}
        />
      </div>

      {/* Equipment Details Panel */}
      {selectedEquipment && (
        <div className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-xl border border-white/50">
          {(() => {
            const equipment = mockEquipment.find(e => e.id === selectedEquipment);
            if (!equipment) return null;

            return (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">{equipment.name}</h2>
                  <span
                    className={`px-4 py-2 rounded-full text-sm font-semibold ${
                      equipment.status === 'operational'
                        ? 'bg-green-100 text-green-800'
                        : equipment.status === 'maintenance'
                          ? 'bg-orange-100 text-orange-800'
                          : equipment.status === 'broken'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {equipment.status.toUpperCase()}
                  </span>
                </div>

                <div className="grid grid-cols-1 smallLaptop:grid-cols-3 gap-6">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Equipment Details</h3>
                    <div className="space-y-2 text-sm text-gray-600">
                      <p>
                        <span className="font-medium">Model:</span> {equipment.model}
                      </p>
                      <p>
                        <span className="font-medium">Serial Number:</span> {equipment.serialNumber}
                      </p>
                      <p>
                        <span className="font-medium">Category:</span> {equipment.category}
                      </p>
                      <p>
                        <span className="font-medium">Location:</span> {equipment.location}
                      </p>
                      <p>
                        <span className="font-medium">Install Date:</span> {equipment.installDate}
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Maintenance Info</h3>
                    <div className="space-y-2 text-sm text-gray-600">
                      <p>
                        <span className="font-medium">Last Maintenance:</span>{' '}
                        {equipment.lastMaintenance || 'N/A'}
                      </p>
                      <p>
                        <span className="font-medium">Next Maintenance:</span>{' '}
                        {equipment.nextMaintenance || 'N/A'}
                      </p>
                      <p>
                        <span className="font-medium">Interval:</span>{' '}
                        {equipment.maintenanceInterval} days
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Description</h3>
                    <p className="text-sm text-gray-600">
                      {equipment.description || 'No description available'}
                    </p>
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {/* Instructions */}
      <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
        <h3 className="font-semibold text-blue-900 mb-3">How to Use 3D Factory Layout</h3>
        <div className="grid grid-cols-1 smallLaptop:grid-cols-2 gap-4 text-sm text-blue-800">
          <div>
            <h4 className="font-medium mb-2">Navigation:</h4>
            <ul className="space-y-1">
              <li>• Click and drag to rotate the view</li>
              <li>• Scroll to zoom in/out</li>
              <li>• Use control buttons for preset views</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-2">Interaction:</h4>
            <ul className="space-y-1">
              <li>• Click on equipment to select and view details</li>
              <li>• Green equipment is operational (animated)</li>
              <li>• Orange equipment is under maintenance</li>
              <li>• Red equipment is broken/out of order</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
