import React from 'react';
import {TabNavigator, StackNavigator} from 'react-navigation';
import {purple, blue, white, gray} from '../utils/colors';
import Quiz from './Quiz';
import Deck from './Deck';
import NewDeck from './NewDeck';
import IndvDeck from './IndvDeck';
import Question from './NewQuestion';
import Answer from './Answer';
import { FontAwesome, Ionicons } from '@expo/vector-icons';


const Tabs = TabNavigator({
  Deck:{
    screen: Deck,
    navigationOptions: {
      tabBarLabel:"Decks",
      tabBarIcon: ({ tintColor }) => <FontAwesome name="bookmark" size={30} color={tintColor} />
    }
  },
  NewDeck:{
    screen: NewDeck,
    navigationOptions: {
      tabBarLabel:"New Deck",
      tabBarIcon: ({tintColor}) => <FontAwesome name="list" size={30} color={tintColor} />
    }
  },
}, {
  tabBarOptions: {
    activeTintColor: purple,
    style: {
      height: 65,
      backgroundColor: white,
      shadowColor: 'rgba(0,0,0,0.24)',
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1,
      justifyContent:'center',
    },
    labelStyle:{
        fontSize: 13,
        color: '#111',
        paddingTop: 5,
        paddingBottom: 5
    },
  },
  swipeEnabled:true,
  animationEnabled:true
})

const MainNavigator = StackNavigator({
  Home:{
    screen: Tabs,
    navigationOptions:{
      headerStyle:{
        backgroundColor:gray,
      },
      headerTintColor:'#000',
    }
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

export default MainNavigator