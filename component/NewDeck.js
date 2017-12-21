import React from 'react';
import {connect} from 'react-redux';
import {addCard} from '../actions';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity,TextInput } from 'react-native';
import {purple,blue,white} from '../utils/colors';

class NewDeck extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			text: ''
		}
	}

	handleSubmit = () => {
		const cardObj = this.objectBuilder()
		this.props.addCard(cardObj)
		this.props.toCard(cardObj[this.state.text])
		this.setState({text:''})
	}

	objectBuilder = () => {
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
		addCard:(card) => dispatch(addCard(card)),
		toCard:({questions,title}) => navigation.navigate('Question',{questions,title})
	}
}

export default connect(null,mapDispatchToProps)(NewDeck)