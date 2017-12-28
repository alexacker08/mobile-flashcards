import { AsyncStorage } from 'react-native'
import { Notifications, Permissions } from 'expo'

export const NOTIFICATION_KEY = 'StudyDeck:notifications'
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