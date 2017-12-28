import React from 'react';
import { StyleSheet, Text, View, ScrollView,TouchableOpacity,TextInput } from 'react-native';
import {purple,blue,white} from '../utils/colors';
import {connect} from 'react-redux';
import {addDeck,addQuestion} from '../actions';
import {NavigationActions} from 'react-navigation';
import {saveDeck} from '../utils/helpers'

class Question extends React.Component {

	constructor(props){
		super(props)
		this.state = {
			text:'',
		}
	}

	_submitQuestion = (answer) => {
		const currentQuestions = this.props.questionList
		const newDeck = currentQuestions.length === 0 ? true : false
		const cardTitle = this.props.navigation.state.params.title

		//Builds new Question object that will be added to question array below
		const newQuestion = {
			question: this.state.text,
			answer
		}

		//Add new question to previous question array
		currentQuestions.push(newQuestion)

		//Update Storage and Store here
		saveDeck(cardTitle,currentQuestions).then(() => {
			this.props.dispatch(addDeck(cardTitle,currentQuestions))
			this._backtoCards(this.props.state.cards[cardTitle])
		})
	}
	//Sends user back to initial card screen after question is submitted
	_backtoCards = (card) => {
		const resetAction = NavigationActions.reset({
			index: 1,
			actions:[
				NavigationActions.navigate({routeName:'Home'}),
				NavigationActions.navigate({routeName:'IndvDeck',params:{title:card.title}})
			]
		});
		this.props.navigation.dispatch(resetAction)
	}

	render(){
		return (
			<View style={styles.container}>
				<Text style={styles.title}>Add a question to your cards</Text>
				<TextInput
					style={styles.textInput}
					placeholder="Enter Question Here"
					onChangeText={(text) => this.setState({text})}
				/>
				<View style={{flexDirection:'row',justifyContent:'space-around'}}>
					<TouchableOpacity
						style={[styles.button,{marginRight:10}]}
						onPress={() => this._submitQuestion('Correct')}
					>
						<Text style={styles.btnText}>Correct</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={[styles.button,{marginLeft:10}]}
						onPress={() => this._submitQuestion('Incorrect')}
					>
						<Text style={styles.btnText}>Incorrect</Text>
					</TouchableOpacity>
				</View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container:{
		flex: 1,
		backgroundColor: '#FFF',
		alignItems:'center',
		justifyContent:'center'
	},
	title:{
		textAlign:'center',
		fontSize: 26,
		marginBottom: 20
	},
	textInput:{
		height: 50,
		width: 250,
		alignSelf:'center',
		textAlign:'center',
		fontSize: 18,
		borderRadius: 4,
		borderColor: '#ccc',
		borderWidth: 1,
		paddingLeft: 40,
		paddingRight: 40,
		color: '#000'
	},
	button:{
		marginTop:40,
		padding: 20,
		backgroundColor: white,
		borderWidth	: 2,
		borderColor: purple,
		alignSelf: 'center',
		borderRadius: 4,
		width: 140
	},
	btnText:{
		textAlign:'center'
	}
})

function mapStateToProps(state, {navigation}){
	const {questions} = navigation.state.params
	return {
		questionList: questions,
		state:state
	}
}

function mapDispatchToProps(dispatch,{navigation}){
	return {
		dispatch:dispatch
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(Question)

