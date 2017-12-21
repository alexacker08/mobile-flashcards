import React from 'react';
import { StyleSheet, Text, View, ScrollView,TouchableOpacity,Animated } from 'react-native';
import {purple,blue,white} from '../utils/colors';
import {NavigationActions} from 'react-navigation';


class Answer extends React.Component {

  	static navigationOptions = {
  		title:'Your Results'
  	}

	_backtoHome = () => {
		const resetAction = NavigationActions.reset({
			index:0,
			actions:[
				NavigationActions.navigate({routeName: 'Home'})
			]
		});
		this.props.navigation.dispatch(resetAction)
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
		const {questions,score,card} = this.props.navigation.state.params
		return(
			<View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
				<Text style={styles.title}>You got {score} {score > 1 ? 'questions' : 'question'} right out of {questions}</Text>
				<Text style={styles.title}>That comes out to {Math.floor((score/questions) * 100)}%</Text>
				<TouchableOpacity
					onPress={() => this._backtoCards(card)}
					style={styles.button}
				>
					<Text style={styles.btnText}>Restart</Text>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={this._backtoHome}
					style={styles.button}
				>
					<Text style={styles.btnText}>Back to my Cards</Text>
				</TouchableOpacity>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	title:{
		textAlign:'center',
		fontSize: 26,
		marginBottom: 20,
		paddingLeft: 10,
		paddingRight: 10
	},
	button:{
		marginTop:40,
		padding: 20,
		backgroundColor: white,
		borderWidth	: 2,
		borderColor: purple,
		width: 200,
		alignSelf: 'center',
		borderRadius: 4
	},
	btnText:{
		textAlign:'center',
		color:purple
	},
})

export default Answer