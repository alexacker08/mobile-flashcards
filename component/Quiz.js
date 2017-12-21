import React from 'react';
import { StyleSheet, Text, View, ScrollView,TouchableOpacity,Animated } from 'react-native';
import {purple,blue,white} from '../utils/colors';
import Modal from 'react-native-modal';
import {NavigationActions} from 'react-navigation';

class Quiz extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			numQuestions: 0,
			questionIndex: 0,
			score:0,
			modalVisible:false
		}
	}

	_showModal = () => this.setState({modalVisible:true})
	_hideModal = () => this.setState({modalVisible:false})

	answerSubmit = (userAnswer,qAnswer) => {
		//let newIndex = this.state += 1;
		let score = userAnswer === qAnswer ? 1 : 0
		let newScore = this.state.score += score
		let newIndex = this.state.questionIndex += 1

		if(newIndex === this.state.numQuestions){
			//Navigate to Answer component
			this.resetNavigation(newScore)
			return
		}

		this.setState({
			score:score,
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
						questions:this.state.numQuestions,
						card:this.props.navigation.state.params.card
					}
				})
			]
		});
		this.props.navigation.dispatch(resetAction)
	}

	componentDidMount(){
		this.setState({
			numQuestions:this.props.navigation.state.params.questions.length
		})
	}

	render(){
		const {questions} = this.props.navigation.state.params;
		console.log(this.props.navigation)
		const qIndex = this.state.questionIndex
		const answer = questions.length !== this.state.questionIndex ? questions[qIndex].answer : ''
		const currentQuestion = questions.length !== this.state.questionIndex ? questions[qIndex].question : ''

		return (
			<View style={{flex:1,justifyContent:'flex-start',backgroundColor:white}}>
				<Text style={{textAlign:'left',marginBottom:50,marginTop:20,paddingLeft: 20,fontSize:18}}>{this.state.questionIndex + 1}/{questions.length}</Text>
				<View>
					<Text style={styles.title}>Question: {currentQuestion}</Text>
					<TouchableOpacity
						onPress={this._showModal}
						style={{alignSelf:'center'}}

					>
						<Text style={{textAlign:'center',fontSize: 20}}>Answer</Text>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() => this.answerSubmit('Correct',answer)}
						style={styles.button}
					>
						<Text style={styles.btnText}>Correct</Text>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() => this.answerSubmit('Incorrect',answer)}
						style={styles.button}
					>
						<Text style={styles.btnText}>Incorrect</Text>
					</TouchableOpacity>
				</View>
				<Modal isVisible={this.state.modalVisible}>
					<View style={styles.modal}>
						<Text style={styles.title}>The Answer is</Text>
						<Text style={[styles.title,styles.boldTitle]}>{answer}</Text>
						<TouchableOpacity onPress={this._hideModal} style={{alignSelf:'center'}}>
							<Text style={{textAlign:'center'}}>Go Back</Text>
						</TouchableOpacity>
					</View>
				</Modal>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	title:{
		textAlign:'center',
		fontSize: 26,
		marginBottom: 20
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
	modal:{
		backgroundColor:white,
		borderRadius: 5,
		paddingTop: 15,
		paddingBottom:15
	}
})

export default Quiz