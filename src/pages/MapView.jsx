import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, CircleMarker, Tooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { mockData } from '../lib/supabaseClient';
import CrewMapLayer from '../components/CrewMapLayer';
import SegmentDetailPanel from '../components/SegmentDetailPanel';
import { useProject } from '../contexts/ProjectContext';

// Generate station markers along the route
const generateStationMarkers = (segments) => {
    const markers = [];
    let stationNum = 100;
    segments.forEach((seg, idx) => {
        markers.push({
            id: `station-${stationNum}`,
            name: `Station ${stationNum}+00`,
            coords: seg.coords,
            progress: 20 + Math.floor(Math.random() * 60),
            crew: idx === 0 ? 'Welding Crew A' : idx === 1 ? 'Survey Team B' : 'Unassigned',
            activity: idx === 0 ? 'Welding' : idx === 1 ? 'Ditching' : 'Clearing',
            status: 'Active',
            daysRemaining: 5 + Math.floor(Math.random() * 20),
            startStation: `${stationNum}+00`,
            endStation: `${stationNum + 10}+00`
        });
        stationNum += 10;
    });
    return markers;
};

const MapView = () => {
    const { project } = useProject();
    const defaultCenter = [48.12, -101.15];
    const polylinePositions = mockData.segments.map(s => s.coords);
    const [showCrews, setShowCrews] = useState(true);
    const [selectedSegment, setSelectedSegment] = useState(null);

    const stationMarkers = generateStationMarkers(mockData.segments);

    // Color based on progress
    const getProgressColor = (progress) => {
        if (progress >= 80) return '#10b981'; // emerald
        if (progress >= 50) return '#f59e0b'; // amber
        return '#f43f5e'; // rose
    };

    return (
        <div className="h-[calc(100vh-100px)] w-full rounded-xl overflow-hidden border border-zinc-800 shadow-lg relative z-0">
            <MapContainer center={defaultCenter} zoom={13} scrollWheelZoom={true} className="h-full w-full bg-zinc-900">
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    className="map-tiles-dark"
                />

                {/* Pipeline Route with Progress Shading */}
                {stationMarkers.map((station, idx) => (
                    <React.Fragment key={station.id}>
                        {/* Segment Line */}
                        {idx < stationMarkers.length - 1 && (
                            <Polyline
                                pathOptions={{
                                    color: getProgressColor(station.progress),
                                    weight: 6,
                                    opacity: 0.9
                                }}
                                positions={[station.coords, stationMarkers[idx + 1]?.coords].filter(Boolean)}
                                eventHandlers={{
                                    click: () => setSelectedSegment(station)
                                }}
                            />
                        )}

                        {/* Station Marker */}
                        <CircleMarker
                            center={station.coords}
                            radius={8}
                            pathOptions={{
                                color: '#fff',
                                fillColor: getProgressColor(station.progress),
                                fillOpacity: 1,
                                weight: 2
                            }}
                            eventHandlers={{
                                click: () => setSelectedSegment(station)
                            }}
                        >
                            <Tooltip permanent direction="top" offset={[0, -10]} className="!bg-zinc-900 !text-white !border-zinc-700 !text-xs !rounded-lg !px-2 !py-1">
                                {station.startStation}
                            </Tooltip>
                        </CircleMarker>
                    </React.Fragment>
                ))}

                {/* Live Crew Tracking Layer */}
                {showCrews && <CrewMapLayer />}

            </MapContainer>

            {/* Overlay */}
            <div className="absolute top-4 left-4 bg-surface/90 backdrop-blur-md p-4 rounded-xl shadow-xl z-[1000] border border-white/10 max-w-xs ring-1 ring-black/5">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-white">{project?.name || 'Station Overview'}</h3>
                    <button
                        onClick={() => setShowCrews(!showCrews)}
                        className={`text-[10px] px-2 py-0.5 rounded border border-zinc-600 ${showCrews ? 'bg-orange-600 text-white border-orange-500' : 'bg-zinc-800 text-zinc-400'}`}
                    >
                        {showCrews ? 'Hide Crews' : 'Show Crews'}
                    </button>
                </div>
                <p className="text-sm text-zinc-400 mt-1">
                    <span className="font-semibold text-emerald-400">Active Segment:</span> {project?.startStation || '100+00'} to {project?.endStation || '200+00'}
                </p>

                {/* Legend */}
                <div className="mt-4 flex items-center gap-3 text-[10px]">
                    <div className="flex items-center gap-1">
                        <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                        <span className="text-zinc-400">80%+</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                        <span className="text-zinc-400">50-80%</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <div className="w-3 h-3 rounded-full bg-rose-500"></div>
                        <span className="text-zinc-400">&lt;50%</span>
                    </div>
                </div>
            </div>

            {/* Segment Detail Panel */}
            {selectedSegment && (
                <SegmentDetailPanel
                    segment={selectedSegment}
                    onClose={() => setSelectedSegment(null)}
                />
            )}
        </div>
    );
};

export default MapView;
