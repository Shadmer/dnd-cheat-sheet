import React, { ReactNode } from 'react';

import RootStore from '@src/store/RootStore';
import { RootStoreContext } from '@src/providers/RootStoreContext';
import { AuthProvider } from '@src/providers/AuthProvider';
import { NavigateWithSaveProvider } from '@src/providers/NavigateWithSaveProvider';
import { DrawerProvider } from '@src/providers/DrawerProvider';
import { DialogProvider } from '@src/providers/DialogProvider';
import { DrawerComponent } from '@src/components/common/DrawerComponent';
import { DialogComponent } from '@src/components/common/DialogComponent';
import { CustomThemeProvider } from '@src/providers/CustomThemeProvider';
import { CampaignProvider } from '@src/providers/CampaignProvider';

type ProvidersProps = Readonly<{
    children: ReactNode;
}>;

export const Providers = ({ children }: ProvidersProps) => {
    return (
        <RootStoreContext.Provider value={new RootStore()}>
            <CustomThemeProvider>
                <CampaignProvider>
                    <AuthProvider>
                        <NavigateWithSaveProvider>
                            <DrawerProvider>
                                <DialogProvider>
                                    <DrawerComponent />
                                    <DialogComponent />
                                    {children}
                                </DialogProvider>
                            </DrawerProvider>
                        </NavigateWithSaveProvider>
                    </AuthProvider>
                </CampaignProvider>
            </CustomThemeProvider>
        </RootStoreContext.Provider>
    );
};
