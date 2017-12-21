import React from 'react';
import { StyleSheet, Text, View, ScrollView,TouchableOpacity,TextInput } from 'react-native';
import {purple,blue,white} from '../utils/colors';
import {connect} from 'react-redux';
import {addQuestion} from '../actions';
import {NavigationActions} from 'react-navigation';

class Question extends React.Component {

	constructor(props){
		super(props)
		this.state = {
			text:'',
		}
	}

	submitQuestion = (answer) => {
		const currentQuestions = this.props.questionList
		const newDeck = currentQuestions.length === 0 ? true : false
		const cardTitle = this.props.navigation.state.params.title
		const newQuestion = {
			question: this.state.text,
			answer
		}
		currentQuestions.push(newQuestion)
		//Dispatch action here
		this.props.addQuestion(cardTitle,currentQuestions)
		//Send back to IndvCard comp
		if(newDeck){
			//this.props.goToCard({card:this.props.state[cardTitle]})
			this._backtoCards(this.props.state[cardTitle])
		} else {
			this.props.goBack()
		}
	}
	_backtoCards = (card) => {
		const resetAction = NavigationActions.reset({
			index: 1,
			actions:[
				NavigationActions.navigate({routeName:'Home'}),
				NavigationActions.navigate({routeName:'IndvDeck',params:{card:card}})
			]
		});
		this.props.navigation.dispatch(resetAction)
	}

	render(){
		console.log(this.props.navigation.state.params)
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
						onPress={() => this.submitQuestion('Correct')}
					>
						<Text style={styles.btnText}>Correct</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={[styles.button,{marginLeft:10}]}
						onPress={() => this.submitQuestion('Incorrect')}
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
		alignSelf:'center',
		fontSize: 18,
		borderRadius: 4,
		borderColor: '#ccc',
		borderWidth: 1,
		paddingLeft: 80,
		paddingRight: 80,
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
		addQuestion:(title,newQuestions) => dispatch(addQuestion(title,newQuestions)),
		//addQuestion:() => console.log('ADDING QUESTION'),
		goBack:() => navigation.goBack(),
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(Question)

