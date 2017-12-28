import React from 'react';
import {connect} from 'react-redux';
import {addCard,addDeck,addCarding} from '../actions';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity,TextInput } from 'react-native';
import {purple,blue,white} from '../utils/colors';
import {saveDeck} from '../utils/helpers'

class NewDeck extends React.Component {

	static navigationOptions = {
  		title:'Create a new Deck'
  	}

	constructor(props){
		super(props);
		this.state = {
			text: ''
		}
	}

	handleSubmit = () => {
		if(this.state.text.length === 0){
			return
		} else {
			const cardObj = this.deckBuilder()
			const title = this.state.text
			const emptyQ = []
			//this.props.addCard(cardObj)
			saveDeck(title,emptyQ).then(() => {
				this.props.dispatch(addCarding(cardObj))
				this.props.toCard(cardObj[title])
				this.setState({text:''})
			})
		}
	}

	deckBuilder = () => {
		return {
			[this.state.text]:{
				title:this.state.text,
				questions:[]
			}
		}
	}

	render(){
		return (
			<View style={{flex: 1,backgroundColor:white,justifyContent:'center'}}>
				<Text style={styles.title}>What is the title of your new deck</Text>
				<TextInput
					style={styles.textInput}
					placeholder="Enter title here"
					onChangeText={(text) => this.setState({text})}
				/>
				<TouchableOpacity
					onPress={this.handleSubmit}
				>
					<Text style={styles.button}>Submit</Text>
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
		textAlign:'center',
		marginTop:40,
		padding: 20,
		backgroundColor: blue,
		width: 200,
		alignSelf: 'center',
		color: white,
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


function mapDispatchToProps(dispatch,{navigation}){
	return {
		//addCard:(card) => dispatch(addCard(card)),
		toCard:({questions,title}) => navigation.navigate('Question',{questions,title}),
		dispatch:dispatch
	}
}

export default connect(null,mapDispatchToProps)(NewDeck)