import React from 'react';
import { StyleSheet, Text, View, ScrollView,TouchableOpacity,TextInput } from 'react-native';
import {purple,blue,white} from '../utils/colors';
import {connect} from 'react-redux';

class Question extends React.Component {

	constructor(props){
		super(props)
		this.state = {
			text:'',
		}
	}

	render(){
		console.log(this.props.navigation.state.params)
		console.log(this.state.text)
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
					>
						<Text style={styles.btnText}>Correct</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={[styles.button,{marginLeft:10}]}
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

function mapDispatchToProps(dispatch,{navigation}){
	console.log(navigation)
	return {

	}
}

export default connect(mapDispatchToProps)(Question)

