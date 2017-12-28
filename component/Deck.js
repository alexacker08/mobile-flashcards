import React from 'react';
import { connect } from 'react-redux'
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, AsyncStorage } from 'react-native';
import {purple,blue,white} from '../utils/colors';
import {getDecks,checkKey,DECK_STORAGE_KEY,addData,getDeck} from '../utils/helpers';
import {appPull} from '../actions'
import Swipeable from 'react-native-swipeable'
import { FontAwesome, Ionicons } from '@expo/vector-icons';

//Stateless component that builds the initial card decks
function Card(props){
  const navigate = props.navoptions.navigate
  const cardselect = props.card
  return (
    <View style={styles.card}>
      <TouchableOpacity onPress={() => navigate('IndvDeck',{title:props.card.title})}>
      	<Text style={styles.cardText}>{props.card.title}</Text>
      </TouchableOpacity>
    </View>
  )
}

class Deck extends React.Component {

  static navigationOptions = {
  	title:'Your Study Cards',
  }

  componentDidMount(){
    this.props.dispatch(appPull())
    //AsyncStorage.clear()
  }

  render() {
    const navigate = this.props.navigation;
    return (
        <View style={{flex: 1}}>
          <ScrollView>
            {this.props.cards.map((card) => {
            	if(!card.deleted){
                return (
                  <Card key={card.title} card={card} navoptions={navigate}/>
                )
              }
            })}
          </ScrollView>
        </View>
    );
  }
}


const styles = StyleSheet.create({
  card: {
    backgroundColor: purple,
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    paddingTop: 30,
    paddingBottom: 30,
    justifyContent:'center',
    flex: 1,
  },
  cardText: {
  	color: white,
  	textAlign:'center',
  	display:'flex',
  	fontSize: 20
  }
});

function mapStateToProps(state){
  return {
		cards: Object.keys(state.cards).reduce((cardAgg,card) => {
			var tempCard = state.cards[card];
			cardAgg.push(tempCard);
			return cardAgg
		},[])
  }
}

function mapDispatchToProps(dispatch){
  return {
    dispatch:dispatch
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Deck)