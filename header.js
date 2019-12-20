import React, {Component} from 'react';
import {Content, Item, Input} from 'native-base';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';

class AppHeader extends Component {
  state = {};

  render() {
    return (
      <View style={styles.header}>
        <Content>
          <Item rounded>
            <TouchableOpacity onPress={this.props.onPress}>
              <Text style={styles.toggleIcon}>
                {String.fromCharCode(10003)}
              </Text>
            </TouchableOpacity>
            <Input
              value={this.props.value}
              onChangeText={this.props.onChange}
              onSubmitEditing={this.props.onAddItem}
              placeholder="What needs to be done?"
              blurOnSubmit={false}
              returnKeyType="done"
              style={styles.input}
            />
          </Item>
        </Content>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 16,
    marginTop: 20,
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },

  toggleIcon: {
    marginLeft: 20,
    fontSize: 25,
    color: '#CCC',
  },

  input: {
    fontSize: 17,
    flex: 1,
    marginLeft: 16,
    height: 50,
  },
});

export default AppHeader;
