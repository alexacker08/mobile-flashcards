import React from 'react';
import { StyleSheet, Text, View, ScrollView, AsyncStorage } from 'react-native';
import Quiz from './component/Quiz';
import Deck from './component/Deck';
import NewDeck from './component/NewDeck';
import IndvDeck from './component/IndvDeck';
import Question from './component/NewQuestion';
import Answer from './component/Answer';
import {createStore,applyMiddleware,compose} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import reducer from './reducer';
import {TabNavigator,StackNavigator} from 'react-navigation';
import {purple,blue,white} from './utils/colors';
import {getDecks,checkKey,DECK_STORAGE_KEY,addData} from './utils/helpers';
import {FontAwesome, Ionicons} from '@expo/vector-icons';



const Tabs = TabNavigator({
  Deck:{
    screen: Deck,
    navigationOptions: {
      tabBarLabel:"Decks"
    }
  },
  NewDeck:{
    screen: NewDeck,
    navigationOptions: {
      tabBarLabel:"New Deck"
    }
  },
}, {
  tabBarOptions: {
    activeTintColor: purple,
    style: {
      height: 60,
      backgroundColor: white,
      shadowColor: 'rgba(0,0,0,0.24)',
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1,
      justifyContent:'center',
      alignItems:'center'
    },
    labelStyle:{
        fontSize: 16,
        paddingBottom: 10
    },
  },
  swipeEnabled:true,
  animationEnabled:true
})

const MainNavigator = StackNavigator({
  Home:{
    screen: Tabs,
  },
  NewDeck:{
    screen: NewDeck
  },
  IndvDeck:{
    screen: IndvDeck
  },
  Quiz:{
    screen: Quiz
  },
  Answer:{
    screen: Answer
  },
  Question:{
    screen: Question
  }
})


const middleWare = applyMiddleware(thunk)
const store = createStore(reducer,compose(middleWare))

export default class App extends React.Component {


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

