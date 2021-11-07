import AsyncStorage from '@react-native-community/async-storage';
import {handleWarning} from './errorHandler';

const mapStorageToValues = [
  'auth', // for save offline data
  // 'home',
];

const currentStorage = {};

const storeChanges = async store => {
  const state = store.getState();
  let changesApplied = false;

  mapStorageToValues.forEach(reduxKey => {
    const deepProp = Object.get(state, reduxKey);
    if (!deepProp) {
      Object.set(currentStorage, reduxKey, null);
    }
    if (deepProp !== Object.get(currentStorage, reduxKey)) {
      changesApplied = true;
      Object.set(currentStorage, reduxKey, deepProp);
    }
  });
  if (changesApplied) {
    try {
      await AsyncStorage.setItem('reduxDumb', JSON.stringify(currentStorage));
    } catch (error) {
      handleWarning(error);
    }
  }
};

export const handleChanges = store => {
  store.subscribe(() => storeChanges(store));
};

export const restoreState = async store => {
  try {
    const value = await AsyncStorage.getItem('reduxDumb');
    const storedState = JSON.parse(value);
    store.dispatch({type: 'restoreState', stateToRestore: storedState});
  } catch (error) {
    handleWarning(error);
  }
};
