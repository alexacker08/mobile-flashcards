import React from 'react';
import { View } from 'react-native';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import reducer from './reducer';
import { setLocalNotification } from './utils/notification';
import MainNavigator from './component/Navigators'


const middleWare = applyMiddleware(thunk)
const store = createStore(reducer,compose(middleWare))

export default class App extends React.Component {

  componentDidMount(){
    setLocalNotification()
  }

  render() {
    return (
      <Provider store={store}>
        <View style={{flex: 1}}>
          <MainNavigator />
        </View>
      </Provider>
    );
  }
}

