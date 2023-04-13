import { ThemeProvider, createTheme } from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react';
import { dark, light } from 'theme';

export const GlobalContext = React.createContext(null);

export const GlobalProvider = ({ children }) => {
  const [darkTheme, setDarkTheme] = useState();
  const [locale, setLocale] = React.useState('viVN');
  const setting = localStorage.getItem('setting');

  useEffect(() => {
    if (setting) setDarkTheme(JSON.parse(setting).darkTheme);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChangeTheme = () => {
    setDarkTheme(!darkTheme);
    localStorage.setItem(
      'setting',
      JSON.stringify({ darkTheme: !darkTheme, locale }),
    );
  };

  const theme = useMemo(
    () => createTheme(darkTheme ? dark : light),
    [darkTheme],
  );

  return (
    <GlobalContext.Provider
      value={{
        darkTheme,
        handleChangeTheme,
      }}
    >
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </GlobalContext.Provider>
  );
};
