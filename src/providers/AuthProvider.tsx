import React, { ReactNode } from 'react';

type AuthProviderProps = {
    children: ReactNode;
};

type AuthType = {
    isAuthenticated: boolean;
    login: (username: string, password: string) => boolean;
    logout: () => void;
};

const AuthContext = React.createContext<AuthType | null>(null);

export const useAuth = () => {
    const context = React.useContext(AuthContext);

    if (!context) {
        throw new Error('useAuth must be used within a AuthProvider');
    }
    return context;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const mockUsername = 'master';
    const mockPassword = 'dnd';

    const [isAuthenticated, setIsAuthenticated] = React.useState<boolean>(
        () => {
            const storedAuthState = localStorage.getItem('isAuthenticated');
            return storedAuthState === 'true';
        }
    );

    const login = React.useCallback(
        (username: string, password: string): boolean => {
            if (username === mockUsername && password === mockPassword) {
                localStorage.setItem('isAuthenticated', 'true');
                setIsAuthenticated(true);
                return true;
            }
            return false;
        },
        []
    );

    const logout = React.useCallback(() => {
        localStorage.removeItem('isAuthenticated');
        setIsAuthenticated(false);
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
