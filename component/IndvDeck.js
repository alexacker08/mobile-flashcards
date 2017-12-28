import React from 'react';
import { connect } from 'react-redux'
import { StyleSheet, Text, View, ScrollView,TouchableOpacity } from 'react-native';
import { purple, blue, white, gray } from '../utils/colors';
import { deletingCard } from '../actions';
import { FontAwesome, Ionicons } from '@expo/vector-icons';


class IndvDeck extends React.Component {

	//Activates a deletion of the Deck and a route back to the Home tab
	_deleteDeck(){
		const title = this.props.card.title
		this.props.dispatch(deletingCard(title))
		this.props.navigation.goBack()
	}

	render(){
		const {navigation,card} = this.props
		const questionsLength = this.props.card.questions.length
		return (
			<View style={{flex: 1,backgroundColor:white,justifyContent:'center'}}>
				<Text style={styles.title}>{card.title} Deck</Text>
				<FontAwesome style={{alignSelf:'center',marginBottom:20}} name="code" size={40} />
				<Text style={{textAlign:'center',fontSize: 20}}>{questionsLength}{questionsLength > 1 ? ' cards' : ' card'}</Text>
				<TouchableOpacity
					style={styles.button}
					onPress={() => navigation.navigate('Question',card)}
				>
					<Text style={{textAlign:'center',color:white}}>Add Card</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={styles.button}
					onPress={() => navigation.navigate('Quiz',{questions:card.questions,card:card})}
				>
					<Text style={{textAlign:'center',color:white}}>Start Quiz</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={styles.invertBtn}
					onPress={() => this._deleteDeck()}
				>
					<Text style={{textAlign:'center',color:blue}}>Delete</Text>
				</TouchableOpacity>
			</View>
		)
	}
}


const styles = StyleSheet.create({
	title:{
		textAlign:'center',
		fontSize: 30,
		marginBottom: 20
	},
	button:{
		marginTop:40,
		padding: 20,
		backgroundColor: blue,
		width: 200,
		alignSelf: 'center',
		borderRadius: 4
	},
	textInput:{
		height: 50,
		alignSelf:'center',
		fontSize: 18,
		borderRadius: 4,
		borderColor: '#ccc',
		borderWidth: 1,
		paddingLeft: 90,
		paddingRight: 90
	},
	invertBtn:{
		marginTop:40,
		padding: 20,
		backgroundColor: white,
		width: 200,
		alignSelf: 'center',
		borderRadius: 4,
		borderWidth: 2,
		borderColor: blue
	}
})

function mapStateToProps(state,{navigation}){
	const title = navigation.state.params.title
	return {
		card: state.cards[title]
	}
}

function mapDispatchToProps(dispatch){
	return {
		dispatch:dispatch
	}
}

export default connect(mapStateToProps)(IndvDeck)