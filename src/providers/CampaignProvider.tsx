import React, { Dispatch, ReactNode, SetStateAction } from 'react';

type CampaignProviderProps = {
    children: ReactNode;
};

type CampaignType = {
    currentCampaign: string;
    setCurrentCampaign: Dispatch<SetStateAction<string>>;
};

const CampaignContext = React.createContext<CampaignType | null>(null);

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
    const isInitialMount = React.useRef(true);
    const [currentCampaign, setCurrentCampaign] = React.useState(() => {
        return localStorage.getItem('currentCampaign') || '';
    });

    React.useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
        } else {
            localStorage.removeItem('lastPlotPage');
            localStorage.removeItem('lastCodexPage');
            localStorage.removeItem('lastWorkshopPage');
            localStorage.removeItem('selectedUnits');
        }

        localStorage.setItem('currentCampaign', currentCampaign);
    }, [currentCampaign]);

    return (
        <CampaignContext.Provider
            value={{ currentCampaign, setCurrentCampaign }}
        >
            {children}
        </CampaignContext.Provider>
    );
};
