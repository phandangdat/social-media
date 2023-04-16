import { ThemeProvider, createTheme } from '@mui/material';
import { locales } from 'locales';
import React, { useEffect, useMemo, useState } from 'react';
import { dark, light } from 'theme';

export const GlobalContext = React.createContext(null);

export const GlobalProvider = ({ children }) => {
  const [darkTheme, setDarkTheme] = useState();
  const [english, setEnglish] = useState();
  const settingDarkTheme = JSON.parse(
    localStorage.getItem('settingDarkTheme'),
  );
  const settingLocale = JSON.parse(
    localStorage.getItem('settingLocale'),
  );

  useEffect(() => {
    if (settingDarkTheme) setDarkTheme(settingDarkTheme.darkTheme);
    if (settingLocale) setEnglish(settingLocale.english);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChangeTheme = () => {
    setDarkTheme(!darkTheme);
    localStorage.setItem(
      'settingDarkTheme',
      JSON.stringify({ darkTheme: !darkTheme }),
    );
  };

  const theme = useMemo(
    () => createTheme(darkTheme ? dark : light),
    [darkTheme],
  );

  const handleChangeLocale = () => {
    setEnglish(!english);
    localStorage.setItem(
      'settingLocale',
      JSON.stringify({ english: !english }),
    );
  };

  const translate = (text) => {
    if (english) return locales.en[text];
    if (!english) return locales.vn[text];
  };

  return (
    <GlobalContext.Provider
      value={{
        darkTheme,
        english,
        translate,
        handleChangeTheme,
        handleChangeLocale,
      }}
    >
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </GlobalContext.Provider>
  );
};
