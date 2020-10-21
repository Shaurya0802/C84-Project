import React from 'react'
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { Card,Icon,ListItem } from 'react-native-elements'
import MyHeader from '../components/MyHeader.js'
import firebase from 'firebase';
import db from '../config.js'

export default class MyBartersScreen extends React.Component {
    static navigationOptions = {header: null};

    constructor() {
        super();
        this.state = {
            userId: firebase.auth().currentUser.email,
            allDonations: []
        }

        this.requestRef = null;
    }

    getAllBarters = () => {
        this.requestRef = db.collection('all_barters').where('donor_id', '==', this.state.userId)
        .onSnapshot((snapshot) => {
            var allDonations = snapshot.docs.map((document) => document.data());
            this.setState({
                allDonations: allDonations
            });
        });
    }

    sendNotification = (thingDetails, requestStatus) => {
        var requestId = thingDetails.request_id;
        var donorId = thingDetails.donor_id;

        db.collection('all_notifications').where('request_id', '==', requestId).where('donor_id', '==', donorId).then((snapshot) => {
            snapshot.forEach((doc) => {
                var message = "";

                if (requestStatus === 'Thing Sent') {
                    message = this.state.donorName + "sent you your requested item";
                } else {
                    message = this.state.donorName + "has shown interest in donating your requested item";
                }

                db.collection('all_notifications').doc(doc.id).update({
                    'message': message,
                    'notification_status': 'unread',
                    'date': firebase.firestore.FieldValue.serverTimestamp()  
                });
            });
        });
    }

    sendRequestedItem = (thingDetails) => {
        if (thingDetails.request_status === 'Requested item sent') {
            var requestStatus = "Donor Interested";
            db.collection('all_donations').doc(thingDetails.doc_id).update({
                'request_status': 'Donor Interested'
            });

            this.sendNotification(thingDetails, requestStatus);
        } else {
            var requestStatus = "Requested item sent";
            db.collection('all_donations').doc(thingDetails.doc_id).update({
                'request_status': 'Donor Interested'
            });

            this.sendNotification(thingDetails, requestStatus);
        }
    }

    keyExtractor = (item, index) => index.toString()

    renderItem = ( {item, i} ) =>(
        <ListItem
            key={i}
            title={item.thing_name}
            subtitle={"Requested By : " + item.requested_by +"\nStatus : " + item.request_status}
            titleStyle={{ color: 'black', fontWeight: 'bold' }}
            rightElement={
                <TouchableOpacity 
                    style={[styles.button, {backgroundColor: item.request_status === "Requested item sent" ? 'green' : '#ff5722'}]} 
                    onPress={() => {this.sendRequestedItem(item)}}
                >
                    <Text style={{color:'#ffff'}}>{item.request_status === "Requested item sent" ? "Requested item sent" : "Send requested item"}</Text>
                </TouchableOpacity>
                }
            bottomDivider
        />
    )

    componentDidMount(){
        this.getAllBarters();
    }

    componentWillUnmount(){
        this.requestRef();
    }

    render() {
        return (
            <View style={{flex:1}}>
                <MyHeader navigation={this.props.navigation} title="My Donations"/>

                <View style={{flex:1}}>
                    {this.state.allDonations.length !== 0 ? (
                        <FlatList
                            keyExtractor={this.keyExtractor}
                            data={this.state.allDonations}
                            renderItem={this.renderItem}
                        />                        
                    ) : (
                        <View style={styles.subtitle}>
                            <Text style={{fontSize: 20}}>List of all barters</Text>
                        </View>
                    )}
                </View>
            </View>
        );
    } 
}

const styles = StyleSheet.create({
    button:{
      width:100,
      height:30,
      justifyContent:'center',
      alignItems:'center',
      backgroundColor:"#ff5722",
      shadowColor: "#000",
      shadowOffset: {
         width: 0,
         height: 8
       },
      elevation : 16
    },
    subtitle :{
      flex:1,
      fontSize: 20,
      justifyContent:'center',
      alignItems:'center'
    }
});