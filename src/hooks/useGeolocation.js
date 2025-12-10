import { useState, useEffect } from 'react';

export const useGeolocation = (options = {}) => {
    const [location, setLocation] = useState({
        latitude: null,
        longitude: null,
        heading: null,
        speed: null,
        timestamp: null,
        error: null,
        ready: false
    });

    useEffect(() => {
        if (!navigator.geolocation) {
            setLocation(prev => ({ ...prev, error: 'Geolocation not supported', ready: true }));
            return;
        }

        const handleSuccess = (pos) => {
            const { latitude, longitude, heading, speed } = pos.coords;
            setLocation({
                latitude,
                longitude,
                heading,
                speed,
                timestamp: pos.timestamp,
                error: null,
                ready: true
            });
        };

        const handleError = (error) => {
            setLocation(prev => ({ ...prev, error: error.message, ready: true }));
        };

        const watcher = navigator.geolocation.watchPosition(
            handleSuccess,
            handleError,
            {
                enableHighAccuracy: true,
                timeout: 30000,
                maximumAge: 10000,
                ...options
            }
        );

        return () => navigator.geolocation.clearWatch(watcher);
    }, []);

    return location;
};
