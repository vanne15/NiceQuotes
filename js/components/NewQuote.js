import React, { Component } from 'react';
import { Button, Modal, TextInput, View, StyleSheet } from 'react-native';
export default class NewQuote extends Component {
    state = { content: null, author: null }
    render() {

        const { visible, onSave } = this.props;
        const { content, author } = this.state;
        return (
            <Modal
                visible={visible}
                animationType="slide"
                onRequestClose={() => {
                    this.setState({ content: null, author: null });
                    onSave(null, null);
                }}>
                <View style={styles.container}>
                    <TextInput
                        placeholder="Zitat"
                        style={[styles.input, { height: 150, textAlignVertical: 'top' }]}
                        multiline={true}
                        underlineColorAndroid="transparent"
                        onChangeText={text => this.setState({ content: text })} />
                    <TextInput placeholder="Author" style={styles.input} underlineColorAndroid="transparent"
                        onChangeText={text => this.setState({ author: text })} />
                    <Button title="Speichern" onPress={() => {
                        //this.setState({ content: null, author: null });
                        onSave(content, author)
                    }}></Button>
                </View>
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ccc',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: 40
    },
    input: {
        borderWidth: 1,
        borderColor: 'deepskyblue',
        borderRadius: 5,
        //Breite
        width: '80%',
        marginBottom: 20,
        fontSize: 20,
        padding: 10,
        height: 50
    }
});