export const analyzeWeldImage = async (imageBlob) => {
    // Simulate network processing time
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Mock detections formatted for Fabric.js usage or general consumption
    // We try to place them somewhat centrally assuming a standard landscape photo
    return {
        success: true,
        detections: [
            {
                id: 'defect-1',
                type: 'rect', // Shape type
                label: 'Porosity (92%)',
                color: '#f43f5e', // Rose-500
                left: 150,
                top: 150,
                width: 60,
                height: 60
            },
            {
                id: 'defect-2',
                type: 'rect',
                label: 'Crack (88%)',
                color: '#ef4444', // Red-500
                left: 320,
                top: 100,
                width: 100,
                height: 40
            }
        ]
    };
};
