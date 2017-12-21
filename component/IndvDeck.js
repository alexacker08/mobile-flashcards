import React from 'react';
import { connect } from 'react-redux'
import { StyleSheet, Text, View, ScrollView,TouchableOpacity } from 'react-native';
import {purple,blue,white} from '../utils/colors';


class NewDeck extends React.Component {
	render(){
		const {navigation} = this.props
		const {card} = navigation.state.params
		const activeCard = this.props.cards[card.title]
		return (
			<View style={{flex: 1,backgroundColor:white,justifyContent:'center'}}>
				<Text style={styles.title}>{activeCard.title}</Text>
				<Text style={{textAlign:'center'}}>{activeCard.questions.length}{activeCard.questions.length > 1 ? ' cards' : ' card'}</Text>
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

function mapStateToProps(state){
	return {
		cards:state
	}
}

export default connect(mapStateToProps)(NewDeck)