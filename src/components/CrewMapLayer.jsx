import React, { useEffect, useState } from 'react';
import { Marker, Popup, CircleMarker, Tooltip } from 'react-leaflet';
import L from 'leaflet';
import { useGeolocation } from '../hooks/useGeolocation';
import { User, HardHat, Truck } from 'lucide-react';

// Custom icons using Lucide SVGs converted to Data URIs or DivIcons would be complex.
// For simplicity in Leaflet, we often use L.DivIcon with HTML.
const createCrewIcon = (color, type) => {
    return L.divIcon({
        className: 'custom-div-icon',
        html: `<div style="background-color: ${color}; width: 32px; height: 32px; border-radius: 50%; border: 2px solid white; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.5);">
                 <span style="color: white; font-weight: bold; font-size: 14px;">${type === 'me' ? 'ME' : type === 'weld' ? 'W' : 'S'}</span>
               </div>`,
        iconSize: [32, 32],
        iconAnchor: [16, 16],
        popupAnchor: [0, -20]
    });
};

const CrewMapLayer = () => {
    const myLocation = useGeolocation();
    const [activeCrews, setActiveCrews] = useState([
        { id: 1, name: 'Welding Crew A', role: 'Welding', lat: 48.125, lng: -101.16, speed: 0, heading: 90, lastUpdate: Date.now() },
        { id: 2, name: 'Survey Team B', role: 'Survey', lat: 48.115, lng: -101.14, speed: 0, heading: 180, lastUpdate: Date.now() },
        { id: 3, name: 'Excavation Unit 4', role: 'Dirt', lat: 48.130, lng: -101.17, speed: 0, heading: 45, lastUpdate: Date.now() }
    ]);

    // Simulate movement
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveCrews(current => current.map(crew => {
                // Random movement jitter
                const moveLat = (Math.random() - 0.5) * 0.001;
                const moveLng = (Math.random() - 0.5) * 0.001;
                return {
                    ...crew,
                    lat: crew.lat + moveLat,
                    lng: crew.lng + moveLng,
                    lastUpdate: Date.now(),
                    speed: Math.floor(Math.random() * 10)
                };
            }));
        }, 3000); // Update every 3 seconds

        return () => clearInterval(interval);
    }, []);

    return (
        <>
            {/* User Location */}
            {myLocation.latitude && (
                <Marker position={[myLocation.latitude, myLocation.longitude]} icon={createCrewIcon('#ea580c', 'me')}>
                    <Popup className="text-zinc-900">
                        <strong>My Location</strong> <br />
                        Speed: {myLocation.speed || 0} m/s
                    </Popup>
                    <CircleMarker center={[myLocation.latitude, myLocation.longitude]} radius={20} pathOptions={{ color: '#ea580c', fillColor: '#ea580c', fillOpacity: 0.2, weight: 1 }} />
                </Marker>
            )}

            {/* Mock Crews */}
            {activeCrews.map(crew => (
                <Marker key={crew.id} position={[crew.lat, crew.lng]} icon={createCrewIcon(crew.role === 'Welding' ? '#ef4444' : crew.role === 'Survey' ? '#3b82f6' : '#eab308', crew.role === 'Welding' ? 'weld' : 'survey')}>
                    <Popup className="text-zinc-900">
                        <strong>{crew.name}</strong> <br />
                        Role: {crew.role} <br />
                        Speed: {crew.speed} mph <br />
                        Updated: just now
                    </Popup>
                </Marker>
            ))}
        </>
    );
};

export default CrewMapLayer;
