import mapBg from '~/assets/images/png/Map.png';
import { useGetLocations } from '~/pages/tenant/LocationPage/handleApi';
import { useTenantCode } from '~/utils/hooks/useTenantCode';
import fileStorageService from '~/services/fileStorage.service';
import { useRef, useEffect, useState } from 'react';
import { useQueries } from '@tanstack/react-query';

const generatePositionMap = (locations: any[]) => {
  const total = locations.length;
  const startX = 53;
  const endX = 55;
  const xStep = (endX - startX) / (total > 1 ? total - 1 : 1);

  return locations.reduce(
    (map, loc, index) => {
      const xPercent = startX + xStep * index;
      const yPercent = index % 2 === 0 ? 82 : 83; // alternate rows

      map[loc.id] = { xPercent, yPercent };
      return map;
    },
    {} as Record<string, { xPercent: number; yPercent: number }>
  );
};

const CenterMapPanel = () => {
  const { tenantCode } = useTenantCode();
  const { data } = useGetLocations(0, 10, '', tenantCode);
  const locations = data?.data?.content || [];
  const positionMap = generatePositionMap(locations);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const [svgSize, setSvgSize] = useState({ width: 0, height: 0 });

  const avatarQueries = useQueries({
    queries: locations.map(loc => ({
      queryKey: ['avatar', loc.imageUrl],
      queryFn: async () => {
        if (!loc.imageUrl) return '';
        const res = await fileStorageService.getFileImage(loc.imageUrl);
        return URL.createObjectURL(res as any);
      },
      enabled: !!loc.imageUrl,
      staleTime: 5 * 60 * 1000,
    })),
  });

  useEffect(() => {
    if (wrapperRef.current) {
      const { offsetWidth, offsetHeight } = wrapperRef.current;
      setSvgSize({ width: offsetWidth, height: offsetHeight });
    }
  }, [wrapperRef]);

  return (
    <div className="dashboard-panel center-panel">
      <div ref={wrapperRef} className="map-wrapper relative w-full h-[600px] overflow-hidden">
        <img src={mapBg} alt="Map" className="w-full h-full object-cover" />

        {/* SVG Lines */}
        <svg className="absolute top-0 left-0 z-10" width={svgSize.width} height={svgSize.height}>
          {locations.map((loc, index) => {
            const pos = positionMap[loc.id];
            if (!pos) return null;

            const mapX = (pos.xPercent / 100) * svgSize.width;
            const mapY = (pos.yPercent / 100) * svgSize.height;

            const isLeft = index < 3;
            const avatarWidth = 100;
            const padding = 20;
            const bendOffset = 30;

            const avatarX = isLeft
              ? padding + avatarWidth
              : svgSize.width - padding - avatarWidth;

            const avatarY = 60 + (index % 3) * 110 + 40;

            const bendX = isLeft
              ? avatarX + bendOffset
              : avatarX - bendOffset;

            return (
              <polyline
                key={`poly-${loc.id}`}
                fill="none"
                stroke="#ffffff"
                strokeWidth="1.5"
                strokeDasharray="4"
                opacity={0.6}
                points={`${avatarX},${avatarY} ${bendX},${avatarY} ${mapX},${mapY}`}
              />
            );
          })}
        </svg>

        {/* Avatars */}
        {locations.map((loc, index) => {
          const imageUrl = avatarQueries[index]?.data || '';
          const isLeft = index < 3;
          const topOffset = 60;
          const top = topOffset + (index % 3) * 110;

          const positionStyle: React.CSSProperties = {
            top,
            transform: 'translateY(0)',
            zIndex: 20,
            ...(isLeft
              ? { left: 20 }
              : { right: 20 }),
          };

          return (
            <img
              key={`img-${loc.id}`}
              src={imageUrl as any}
              className="absolute w-[100px] h-[80px] rounded-md object-cover"
              style={positionStyle}
            />
          );
        })}

        {/* Red Markers */}
        {locations.map(loc => {
          const pos = positionMap[loc.id];
          if (!pos) return null;

          return (
            <div
              key={`marker-${loc.id}`}
              className="absolute z-30 w-3 h-3 bg-red-500 rounded-full border-[2px] border-white"
              style={{
                left: `${pos.xPercent}%`,
                top: `${pos.yPercent}%`,
                transform: 'translate(-50%, -50%)',
              }}
              title={loc.name}
            />
          );
        })}
      </div>
    </div>
  );
};

export default CenterMapPanel;
