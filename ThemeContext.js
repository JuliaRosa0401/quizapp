import React, { createContext, useState, useContext, children} from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState('light');

    const toggleTheme = () => {
        setTheme(theme === 'light'?'dark': 'light');
    };

    const colors = {
        light: {
            background: '#959fcdff',
            text: '#000000',
            button: '#EFEFEF',
    },
        dark: {
        background: '#121212',
        text: '#FFFFFF',
        button: '#333333',
        },
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme, colors: colors[theme] }}>
            {children}
        </ThemeContext.Provider>
    );
 
};
export const useTheme = () => useContext(ThemeContext); 
