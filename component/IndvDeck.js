import React from 'react';
import { connect } from 'react-redux'
import { StyleSheet, Text, View, ScrollView,TouchableOpacity } from 'react-native';
import {purple,blue,white} from '../utils/colors';
import {deletingCard} from '../actions';


class IndvDeck extends React.Component {

	_deleteDeck(){
		const title = this.props.card.title
		this.props.dispatch(deletingCard(title))
		this.props.navigation.goBack()
	}

	render(){
		const {navigation,card} = this.props
		console.log(card)
		const questionsLength = this.props.card.questions.length
		return (
			<View style={{flex: 1,backgroundColor:white,justifyContent:'center'}}>
				<Text style={styles.title}>{card.title}</Text>
				<Text style={{textAlign:'center'}}>{questionsLength}{questionsLength > 1 ? ' cards' : ' card'}</Text>
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
					style={styles.button}
					onPress={() => this._deleteDeck()}
				>
					<Text style={{textAlign:'center',color:white}}>Delete</Text>
				</TouchableOpacity>
			</View>
		)
	}
}


const styles = StyleSheet.create({
	title:{
		textAlign:'center',
		fontSize: 20,
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