import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import Quiz from './component/Quiz';
import Deck from './component/Deck';
import NewDeck from './component/NewDeck';
import Question from './component/NewQuestion';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import reducer from './reducer';
import {TabNavigator,StackNavigator} from 'react-navigation';
import {purple,blue,white} from './utils/colors';
import {FontAwesome, Ionicons} from '@expo/vector-icons'



const Tabs = TabNavigator({
  Deck:{
    screen: Deck,
    navigationOptions: {
      tabBarLabel:"Decks"
    }
  },
  Quiz:{
    screen: NewDeck,
    navigationOptions: {
      tabBarLabel:"New Deck"
    }
  },
}, {
  navigationOptions: {
    header: null
  },
  tabBarOptions: {
    activeTintColor: purple,
    style: {
      height: 36,
      backgroundColor: white,
      shadowColor: 'rgba(0,0,0,0.24)',
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1
    }
  }
})

const MainNavigator = StackNavigator({
  Home:{
    screen: Tabs
  }
})

export default class App extends React.Component {

  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={{flex: 1,paddingTop:45}}>
          <MainNavigator />
        </View>
      </Provider>
    );
  }
}

