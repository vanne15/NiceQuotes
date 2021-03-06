import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import {
  Alert,
  StyleSheet,
  View,
  Button,
  SafeAreaView,
  Platform,
  Text
} from 'react-native';
import Quote from './js/components/Quote';
import NewQuote from './js/components/NewQuote';
//import AsyncStorage from '@react-native-community/async-storage'; //Key Value Store
import Firebase from './js/Firebase';
//TODO import * as SQLite from 'expo-sqlite';
//TODO const database = SQLite.openDatabase('quotes.db');

//const STORE_KEY = "QUOTES3";

export default class App extends Component {
  state = { index: 0, showNewQuote: false, quotes: [] }; //initialer Zustand
  // //promises herkömmlich
  //_receiveData (){
  // AsyncStorage.getItem('QUOTES').then(value => {
  //   if (value !== null) {
  //     value = JSON.parse(value);
  //     this.setState({ quotes: value });
  //   }
  // })
  //}

  //promises moderner mit async/await
  _receiveData() {
    // database.transaction(
    //   transaction => transaction.executeSql(
    //     'SELECT * FROM quotes', [],
    //     //(transaction, result) => this.setState({ quotes: result.rows._array })
    //     (_, result) => this.setState({ quotes: result.rows._array })
    //   )
    //TODO Firebase
  }

  _storeData(quotes) {
    const newLocal = JSON.stringify(quotes);
    //alert("Save: " + newLocal);
    //AsyncStorage.setItem(STORE_KEY, newLocal);
  }

  _saveQuoteToDB(text, author, quotes) {
    Firebase.db.collection('quotes').add({ text, author });
    // database.transaction(
    //   transaction => transaction.executeSql(
    //     'INSERT INTO quotes (text, author) VALUES (?,?)',
    //     [text, author],
    //     //(transaction, result) => console.log('ID des Zitats: ', result.insertId)
    //     (_, result) => quotes[quotes.length - 1].id = result.insertId)
    // )
    //TODO Firebase
  }

  _deleteQuoteFromDB(id) {
    // database.transaction(
    //   transaction => transaction.executeSql(
    //     'DELETE FROM quotes WHERE id = ?', [id]
    //   )
    // )
    //TODO Firebase
  }

  _delButton() {
    Alert.alert('Zitat löschen?', 'Dieses kann nicht rückgängig gemacht werden.',
      [
        { text: 'Abbrechen', style: 'cancel' },
        { text: 'Löschen', style: 'destructive', onPress: () => this._delZitat() }
      ]);
  }

  _delZitat() {
    let { index, quotes } = this.state;
    quotes.splice(index, 1); //aus array löschen
    this._deleteQuoteFromDB(quotes[index].id);
    this.setState({ index: 0, quotes });
  }

  _displayNextQuote() {
    let { index, quotes } = this.state;

    let nextIndex = index + 1;
    if (nextIndex === quotes.length) nextIndex = 0;
    this.setState({ index: nextIndex });
  }

  _displayPrevQuote() {
    let { index, quotes } = this.state;

    let prevIndex = index - 1;
    if (prevIndex === -1) prevIndex = quotes.length - 1;
    this.setState({ index: prevIndex });
  }

  // => erzwingt en context von this auf App
  _addQuote = (text, author) => {
    //alert('add quote prop aus app.js');
    let { quotes } = this.state;
    if (text && author) {
      quotes.push({ text, author });
      // speichern ->  expo install @react-native-community/async-storage
      //this._storeData(quotes);
      this._saveQuoteToDB(text, author, quotes);
      //alert('after store');
    }
    this.setState({ showNewQuote: false, quotes, index: quotes.length - 1 });
  }

  componentDidMount() {
    // database.transaction(
    //   transaction => transaction.executeSql('CREATE TABLE IF NOT EXISTS quotes(id INTEGER PRIMARY KEY NOT NULL, text TEXT, author TEXT)')
    // )
    // Firebase initialisieren
    Firebase.init();
    this._receiveData();
  }
  //Lebenszyklus Methode: Mounting initialen Zustand setze
  render() {
    let { index, quotes } = this.state;
    const quote = quotes[index];

    let content = <Text>keine Zitate vorhanden</Text>;
    if (quote) content = <Quote text={quote.text} author={quote.author}></Quote>;

    //Fall a keine Zitate
    //Fall b Zitate da
    return (
      <SafeAreaView style={styles.container}>
        <StyledButton visible={true} style={styles.newButton} title="Neu" onPress={() => this.setState({ showNewQuote: true })} />
        <StyledButton visible={quotes.length >= 1} style={styles.deleteButton} title="Löschen" onPress={() => this._delButton()} />
        <NewQuote visible={this.state.showNewQuote} onSave={this._addQuote}></NewQuote>
        <StyledButton visible={quotes.length >= 2} style={styles.prevButton} title="< Vorheriges Zitat" onPress={() => this._displayPrevQuote()} />

        {content}

        <Text>Nummer {quotes.length === 0 ? 0 : index + 1} von insgesamt {quotes.length} Zitaten.</Text>
        <StyledButton visible={quotes.length >= 2} style={styles.nextButton} title="Nächstes Zitat >" onPress={() => this._displayNextQuote()} />
        <StatusBar style="auto" />
      </SafeAreaView >
    );
  }

}

function StyledButton(props) {
  let button = null;
  if (props.visible)
    button =
      (
        <View style={props.style}>
          <Button title={props.title} onPress={props.onPress}></Button>
        </View>
      );
  return button;
}

const styles = StyleSheet.create({
  newButton: {
    position: 'absolute',
    right: 0,
    top: 50
  },
  nextButton: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 20 : 0, // Tenärer Operator möglich weil javascript um Geräre Besonderheiten zu steuern
    right: 0
  },
  deleteButton: {
    position: 'absolute',
    top: 50
  },
  prevButton: {
    position: 'absolute', top: 50, left: 0
  },
  container: {
    flex: 1,
    backgroundColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
