import React from 'react'
import { AsyncStorage } from 'react-native'
import { Notifications, Permissions } from 'expo';

const NOTIFICATION_KEY = 'Notification@FlashCards';

export function clearLocalNotification() {
    return AsyncStorage.removeItem(NOTIFICATION_KEY).then(()=>{
        Notifications.cancelAllScheduledNotificationsAsync();
    })
}

function createLocalNotification() {
    return {
        title: 'Quiz yourself',
        body:'👋 don\'t forget to take your quiz today!',
        ios: {
            sound: true,
        },
        andriod: {
            sound: true,
            priority: 'high',
            sticky: false,
            vibrate: true,
        }
    }
}

export function setLocalNotification() {
    return AsyncStorage.getItem(NOTIFICATION_KEY)
        .then(JSON.parse)
        .then((data)=>{
            if (data === null) {
                Notifications.cancelAllScheduledNotificationsAsync();
                Permissions.askAsync(Permissions.NOTIFICATIONS).then(({status})=>{
                    if (status==='granted') {
                        const tomorrow = new Date();
                        tomorrow.setDate(tomorrow.getDate()+1);
                        tomorrow.setHours(20);
                        tomorrow.setMinutes(0);
                        console.log(tomorrow);
                        Notifications.scheduleLocalNotificationAsync(
                            createLocalNotification(),
                            {
                                time: tomorrow,
                                repeat: 'day',
                            }
                        );
                        AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
                    }

                }).catch((err)=>{
                    console.warn(err)
                })
            }

        })

}