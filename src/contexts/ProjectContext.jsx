import React, { createContext, useContext, useState, useEffect } from 'react';
import { db } from '../lib/db';

const ProjectContext = createContext(null);

export const useProject = () => {
    const context = useContext(ProjectContext);
    if (!context) {
        throw new Error('useProject must be used within ProjectProvider');
    }
    return context;
};

export const ProjectProvider = ({ children }) => {
    const [project, setProject] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [showOnboarding, setShowOnboarding] = useState(false);

    useEffect(() => {
        // Check if project exists in IndexedDB
        const loadProject = async () => {
            try {
                const cached = await db.offline_cache.get('current_project');
                if (cached && cached.value) {
                    setProject(cached.value);
                    setShowOnboarding(false);
                } else {
                    setShowOnboarding(true);
                }
            } catch (e) {
                console.error('Failed to load project', e);
                setShowOnboarding(true);
            } finally {
                setIsLoading(false);
            }
        };
        loadProject();
    }, []);

    const saveProject = async (projectData) => {
        try {
            await db.offline_cache.put({ key: 'current_project', value: projectData });
            setProject(projectData);
            setShowOnboarding(false);
        } catch (e) {
            console.error('Failed to save project', e);
        }
    };

    const clearProject = async () => {
        await db.offline_cache.delete('current_project');
        setProject(null);
        setShowOnboarding(true);
    };

    return (
        <ProjectContext.Provider value={{
            project,
            isLoading,
            showOnboarding,
            setShowOnboarding,
            saveProject,
            clearProject
        }}>
            {children}
        </ProjectContext.Provider>
    );
};
