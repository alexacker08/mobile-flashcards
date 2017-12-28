import {AsyncStorage} from 'react-native'
import {Notifications, Permissions} from 'expo'

export const DECK_STORAGE_KEY = 'StudyDeck:native'
export const NOTIFICATION_KEY = 'StudyDeck:notifications'

export function addData(decks){
	return AsyncStorage.setItem(DECK_STORAGE_KEY,JSON.stringify(decks))
}

export function getDecks(){
	return AsyncStorage.getItem(DECK_STORAGE_KEY)
}


export function saveDeck(title,questions){
	return AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify({
		[title]:{
			title,
			questions
		}
	}))
}

export function deleteDeckAPI(title){
	return AsyncStorage.getItem(DECK_STORAGE_KEY)
		.then((result) => {
			const data = JSON.parse(result)
			data[title] = undefined
			delete data[title]
			AsyncStorage.setItem(DECK_STORAGE_KEY,JSON.stringify(data))
		})
}

export function createLocalNotification(){
	return {
		title:'Don\'t forget to study!',
		body: 'You haven\'t studied in over 24 hours! Be sure to study today!',
		ios: {
			sound: true,
		},
		android:{
			sound: true,
			priority: 'high',
			stick: false,
			vibrate: true
		}
	}
}

export function clearLocalNotification(){
	return AsyncStorage.removeItem(NOTIFICATION_KEY)
		.then(Notifications.cancelAllScheduledNotificationsAsync)
}

export function setLocalNotification(){
	AsyncStorage.getItem(NOTIFICATION_KEY)
		.then(JSON.parse)
		.then((data) => {
			if(data === null){
				Permissions.askAsync(Permissions.NOTIFICATIONS)
					.then(({status}) => {
						if(status === 'granted'){
							Notifications.cancelAllScheduledNotificationsAsync()

							let tomorrow = new Date()
							tomorrow.setDate(tomorrow.getDate() + 1);
							tomorrow.setHours(19)
							tomorrow.setMinutes(0)

							Notifications.scheduleLocalNotificationAsync(
								createLocalNotification(),
								{
									time: tomorrow,
									repeat: 'day',
								}
							)
							AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
						}
					})
					.catch((err) => {
						console.warn('Error with Permission notifications: ', err)
					})
			}
		})
		.catch((err) => {
			console.warn('Error with Notification:', err)
		})
}

export function initialBuild(){
	return 	{
		'React':{
			title:'React',
			questions:[
				{
					question:'React is a JavaScript library',
					answer:'Correct'
				},
				{
					question:'JSX is used to write HTML in React',
					answer:'Correct'
				}
			]
		},
		'JavaScript':{
			title:'JavaScript',
			questions:[
				{
					question:'ES6 is currently not accepted by all browsers',
					answer:'Correct'
				},
				{
					question:'Java and JavaScript are same language',
					answer:'Incorrect'
				}
			]
		}
	}
}
