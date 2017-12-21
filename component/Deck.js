import React from 'react';
import { connect } from 'react-redux'
import { StyleSheet, Text, View, ScrollView,TouchableOpacity } from 'react-native';
import {purple,blue,white} from '../utils/colors';

function Card(props){
  const navigate = props.navoptions.navigate
  const cardselect = props.card
  return (
    <View style={styles.card}>
      <TouchableOpacity onPress={() => navigate('IndvDeck',{card:cardselect})}>
      	<Text style={styles.cardText}>{props.card.title}</Text>
      </TouchableOpacity>
    </View>
  )
}

class Deck extends React.Component {

  static navigationOptions = {
  	title:'Your Study Cards'
  }

  render() {
    const navigate = this.props.navigation;
    return (
        <View style={{flex: 1}}>
          <ScrollView>
            {this.props.cards.map((card) => {
            	return (
            		<Card key={card.title} card={card} navoptions={navigate}/>
            	)
            })}
          </ScrollView>
        </View>
    );
  }
}


const styles = StyleSheet.create({
  card: {
    backgroundColor: purple,
    borderWidth: 1,
    borderColor: white,
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
		cards: Object.keys(state).reduce((cardAgg,card) => {
			var tempCard = state[card];
			cardAgg.push(tempCard);
			return cardAgg
		},[])
	}
}

export default connect(mapStateToProps)(Deck)