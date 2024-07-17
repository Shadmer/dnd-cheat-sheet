import React, { ReactNode } from 'react';

type CampaignProviderProps = {
    children: ReactNode;
};

const CampaignContext = React.createContext<any | null>(null);

export const useCampaign = () => {
    const context = React.useContext(CampaignContext);

    if (!context) {
        throw new Error('useCampaign must be used within a CampaignProvider');
    }
    return context;
};

export const CampaignProvider: React.FC<CampaignProviderProps> = ({
    children,
}) => {
    const [currentCampaign, setCurrentCampaign] = React.useState('');

    return (
        <CampaignContext.Provider value={{ currentCampaign }}>
            {children}
        </CampaignContext.Provider>
    );
};
