import React from 'react';
import {connect} from 'react-redux';
import { addCard, addDeck, addCarding } from '../actions';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity,TextInput } from 'react-native';
import { purple, blue, white, lightGray } from '../utils/colors';
import { saveDeck } from '../utils/api';
import { NavigationActions } from 'react-navigation';

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
			//Updates storage first with new deck of cards holder and then dispatches to update the store following the promise
			saveDeck(title,emptyQ = []).then(() => {
				this.props.dispatch(addCarding(cardObj))
				this.setState({text:''})
				this._toIndvView(title)
			})
		}
	}
	//Helps to build the structure of the deck to have submitted to the store and AsyncStorage
	deckBuilder = () => {
		return {
			[this.state.text]:{
				title:this.state.text,
				questions:[]
			}
		}
	}
	//Update the Navigation to reset so as to remove the back button being the "New Deck" comp
	_toIndvView = (title) => {
		const resetAction = NavigationActions.reset({
			index: 1,
			actions:[
				NavigationActions.navigate({routeName:'Home'}),
				NavigationActions.navigate({routeName:'IndvDeck',params:{title:title}})
			]
		})
		this.props.navigation.dispatch(resetAction)
	}

	render(){
		return (
			<View style={{flex: 1,justifyContent:'center'}}>
				<Text style={styles.title}>What is the title of your new deck</Text>
				<TextInput
					style={styles.textInput}
					placeholder="Enter title here"
					onChangeText={(text) => this.setState({text})}
				/>
				<TouchableOpacity
					onPress={this.handleSubmit}
					style={styles.button}
				>
					<Text style={styles.btnText}>Submit</Text>
				</TouchableOpacity>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	title:{
		textAlign:'center',
		fontSize: 20,
		marginBottom: 40
	},
	button:{
		marginTop:40,
		padding: 20,
		backgroundColor: blue,
		width: 225,
		alignSelf: 'center',
		borderRadius: 4
	},
	btnText:{
		textAlign:'center',
		color: white
	},
	textInput:{
		height: 50,
		width: 275,
		alignSelf:'center',
		fontSize: 18,
		borderRadius: 4,
		borderColor: lightGray,
		borderWidth: 1,
		paddingLeft: 40,
		paddingRight: 40,
		backgroundColor: white,
		textAlign:'center'
	}
})


function mapDispatchToProps(dispatch,{navigation}){
	return {
		toCard:(title) => navigation.navigate('IndvDeck',{title:title}),
		dispatch:dispatch
	}
}

export default connect(null,mapDispatchToProps)(NewDeck)