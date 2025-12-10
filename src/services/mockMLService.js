// Simulating the Python Microservice response for the Frontend Demo

export const fetchAnalyticsData = async () => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));

    // Generate mock localized dates
    const today = new Date();
    const dates = Array.from({ length: 30 }, (_, i) => {
        const d = new Date(today);
        d.setDate(d.getDate() - (29 - i));
        return d.toISOString().split('T')[0];
    });

    const historicalProgress = dates.map((date, i) => ({
        date,
        actual: 10 + (i * 1.5) + (Math.random() * 2), // Growing progress
        projected: 10 + (i * 1.6), // Linear projection
    }));

    // Future predictions (Prophet style)
    const futureDates = Array.from({ length: 15 }, (_, i) => {
        const d = new Date(today);
        d.setDate(d.getDate() + i + 1);
        return d.toISOString().split('T')[0];
    });

    const forecast = futureDates.map((date, i) => ({
        date,
        projected: 55 + (i * 1.4),
        lower_bound: 55 + (i * 1.2),
        upper_bound: 55 + (i * 1.6)
    }));

    return {
        kpi: {
            completionDate: new Date(today.setDate(today.getDate() + 45)).toLocaleDateString(),
            daysRemaining: 45,
            estimatedCost: 52400000,
            budget: 50000000,
            costVariance: 4.8, // 4.8% over
            weatherRisk: "High", // High/Medium/Low
        },
        progressChart: [...historicalProgress, ...forecast]
    };
};
