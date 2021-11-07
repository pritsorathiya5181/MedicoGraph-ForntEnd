import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import RootStackScreen from './app/navigation/RootStackScreen';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import reducer from './app/reducer';
import {handleChanges, restoreState} from './app/services/persistHandler';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const store = createStoreWithMiddleware(reducer);

console.disableYellowBox = true;
console.ignoredYellowBox = ['Warning:'];

function App() {
  restoreState(store);
  handleChanges(store);
  return (
    <Provider store={store}>
      <NavigationContainer>
        <RootStackScreen />
      </NavigationContainer>
    </Provider>
  );
}

export default App;
