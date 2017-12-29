import React from 'react';
import { StyleSheet, Text, View, ScrollView,TouchableOpacity,Animated } from 'react-native';
import { purple, blue, white } from '../utils/colors';
import Modal from 'react-native-modal';
import { NavigationActions } from 'react-navigation';
import FlipCard from 'react-native-flip-card'

class Quiz extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			numQuestions: 0,
			questionIndex: 0,
			score:0,
			flipCard:false
		}
	}

	_showModal = () => this.setState({flipCard:true})
	_hideModal = () => this.setState({flipCard:false})

	answerSubmit = (userAnswer) => {
		//let newIndex = this.state += 1;
		//let score = userAnswer === qAnswer ? 1 : 0
		let score = userAnswer === 'Correct' ? 1 : 0

		let newScore = this.state.score += score
		let newIndex = this.state.questionIndex += 1

		if(newIndex === this.state.numQuestions){
			//Navigate to Answer component
			this.resetNavigation(newScore)
			return
		}

		this.setState({
			score:newScore,
			questionIndex:newIndex
		})
	}

	resetNavigation = (score) => {
		const resetAction = NavigationActions.reset({
			index:0,
			actions:[
				NavigationActions.navigate({
					routeName: 'Answer',
					params:{
						score,
						card:this.props.navigation.state.params.card
					}
				})
			]
		});
		this.props.navigation.dispatch(resetAction)
	}

	componentDidMount(){
		this.setState({
			numQuestions:this.props.navigation.state.params.card.questions.length
		})
	}

	render(){
		const {questions} = this.props.navigation.state.params.card;
		const qIndex = this.state.questionIndex
		const answer = questions.length !== this.state.questionIndex ? questions[qIndex].answer : ''
		const currentQuestion = questions.length !== this.state.questionIndex ? questions[qIndex].question : ''

		return (
			<View style={{flex: 1}}>
				<FlipCard
					style={{flex:1,backgroundColor:white,borderWidth:0}}
					friction={6}
					perspective={0}
					clickable={false}
					flip={this.state.flipCard}
				>
					<View style={{flex: 1,justifyContent:'flex-start'}}>
						<Text style={{textAlign:'left',marginBottom:50,marginTop:20,paddingLeft: 20,fontSize:18}}>{this.state.questionIndex + 1}/{questions.length}</Text>
						<Text style={styles.title}>Question: {currentQuestion}</Text>
						<TouchableOpacity
							onPress={() => this._showModal()}
							style={{alignSelf:'center'}}

						>
							<Text style={{textAlign:'center',fontSize: 20}}>Answer</Text>
						</TouchableOpacity>
						<TouchableOpacity
							onPress={() => this.answerSubmit('Correct')}
							style={styles.button}
						>
							<Text style={styles.btnText}>Correct</Text>
						</TouchableOpacity>
						<TouchableOpacity
							onPress={() => this.answerSubmit('Incorrect')}
							style={styles.button}
						>
							<Text style={styles.btnText}>Incorrect</Text>
						</TouchableOpacity>
					</View>
					<View style={{flex:1,justifyContent:'center'}}>
						<Text style={styles.title}>The Answer is</Text>
						<Text style={[styles.title,styles.boldTitle]}>{answer}</Text>
						<TouchableOpacity style={styles.button} onPress={() => this._hideModal()}>
							<Text style={styles.btnText}>Go Back</Text>
						</TouchableOpacity>
					</View>
				</FlipCard>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	title:{
		textAlign:'center',
		fontSize: 26,
		marginBottom: 20,
		paddingLeft: 15,
		paddingRight: 15
	},
	boldTitle:{
		fontSize: 28,
		fontWeight: 'bold',
		paddingLeft: 15,
		paddingRight: 15
	},
	button:{
		marginTop:40,
		padding: 20,
		backgroundColor: blue,
		width: 200,
		alignSelf: 'center',
		borderRadius: 4
	},
	btnText:{
		textAlign:'center',
		color:white
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
})

export default Quiz