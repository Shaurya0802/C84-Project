import React from 'react';
import {Text, View, FlatList} from 'react-native';
import db from '../config';
import firebase from 'firebase';
import MyHeader from '../components/MyHeader';

export default class NotificationsScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            allNotifications: [],
            userId: firebase.auth().currentUser.email
        }

        this.requestRef = null;
    }

    getNotifications = () => {
        this.requestRef = db.collection('all_notifications').where('notification_status', '==', 'unread').where('targeted_user_id', '==', this.state.userId)
        .onSnapshot((snapshot) => {
            var allNotifications = [];
            snapshot.docs.map((doc) => {
                var notification = doc.data();
                notification['doc_id'] = doc.id;
                allNotifications.push(notification);
            });
            this.setState({
                allNotifications: allNotifications
            });
        });
    }

    componentDidMount() {
        this.getNotifications();
    }

    keyExtractor = (item, index) => index.toString()

    renderItem = ({item,index}) =>{
        return (
            <ListItem
                key={index}
                title={item.book_name}
                titleStyle={{ color: 'black', fontWeight: 'bold' }}
                subtitle={item.message}
                bottomDivider
            />
        )
    }

    render() {
        return (
        <View style={{flex: 1}}>
            <View style={{flex:0.1}}>
                <MyHeader title={"Notifications"} navigation={this.props.navigation}/>
            </View>

            <View style={{flex:0.9}}>
                {
                this.state.allNotifications.length === 0 ? (
                    <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                        <Text style={{fontSize:25}}>You have no notifications</Text>
                    </View>
                ) : (
                    <FlatList
                        keyExtractor={this.keyExtractor}
                        data={this.state.allNotifications}
                        renderItem={this.renderItem}
                    />
                )
                }
            </View>
        </View>
        );
    }
}
