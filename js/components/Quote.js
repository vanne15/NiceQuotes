import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';//So werden dann auch Validierungen durcchgeführt!

// export default class Quote extends Component {

//     render() {
//         const { text, author } = this.props;//destructuring Destrukturierende Ziweisung seit 2015 in js
//         return (
//             <Fragment>
//                 <Text>{text}</Text>
//                 <Text>-- {author}</Text>
//             </Fragment>
//         );
//     }
// }

//Funktionsschreibweise geht nur wenn zustandslos also kein state verwendet wird, ist dann kürzer:
export default function Quote(props) {

    const { text, author } = props;//destructuring Destrukturierende Ziweisung seit 2015 in js
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{text}</Text>
            <Text style={styles.author}>&mdash; {author}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    //Achtung: das sind JavaScript Objekte!
    container: {
        paddingHorizontal: 30,
        backgroundColor: 'white',
        margin: 50,
        borderRadius: 10,
        borderBottomWidth: 5,
        borderRightWidth: 5,
        borderColor: 'gray',
        elevation: 20

    },
    text: {
        fontSize: 36, fontStyle: 'italic', color: 'blue',
        marginBottom: 30, textAlign: "center"
    },
    author: { fontSize: 20, textAlign: "right" }
});
