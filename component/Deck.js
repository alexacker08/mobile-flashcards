import React from 'react';
import { connect } from 'react-redux'
import { StyleSheet, Text, View, ScrollView,TouchableOpacity } from 'react-native';
import {purple,blue,white} from '../utils/colors';

function CardTest(props){
	console.log(props)
  return (
    <View style={styles.card}>
      <TouchableOpacity onPress={() => {}}>
      	<Text style={styles.cardText}>{props.name}</Text>
      </TouchableOpacity>
    </View>
  )
}

class Deck extends React.Component {

  render() {
    const navigate = this.props.navigation;
    console.log(navigate);
    return (
        <View style={{flex: 1}}>
          <ScrollView>
            {this.props.cards.map((card) => {
            	return (
            		<CardTest key={card.title} name={card.title}/>
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