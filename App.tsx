import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, Switch} from 'react-native';
import {ThemeContext} from './src/components/context/ThemeContext';
import {Keyboard} from './src/components/keyboard/Keyboard';

import {Colors} from './src/components/styles/Colors';

const App = () => {
  const [theme, setTheme] = useState('light');

  return (
    <ThemeContext.Provider value={theme}>
      <SafeAreaView
        style={
          theme === 'light'
            ? styles.container
            : [styles.container, {backgroundColor: 'black'}]
        }>
        <Switch
          value={theme === 'light'}
          onValueChange={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        />
        <Keyboard />
      </SafeAreaView>
    </ThemeContext.Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
});

export default App;
