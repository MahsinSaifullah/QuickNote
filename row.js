import React, {Component} from 'react';
import {View, Text, StyleSheet, Switch, TouchableOpacity} from 'react-native';
import {Icon, Card, CardItem, Body, Content} from 'native-base';
class Row extends Component {
  state = {};
  render() {
    const {complete} = this.props;
    return (
      <View style={styles.item}>
        <Card bordered>
          <CardItem>
            <Switch
              value={this.props.complete}
              onValueChange={this.props.onComplete}
            />
            <View style={styles.textWrap}>
              <Text style={[styles.text, complete && styles.complete]}>
                {this.props.text}
              </Text>
            </View>
            <TouchableOpacity onPress={this.props.onRemove}>
              <Icon style={styles.delete} name="trash" />
            </TouchableOpacity>
          </CardItem>
        </Card>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  textWrap: {
    flex: 1,
    marginHorizontal: 10,
  },
  text: {
    fontSize: 20,
    color: '#4d4d4d',
  },
  complete: {
    textDecorationLine: 'line-through',
  },
  delete: {
    color: '#f45905',
    fontSize: 25,
  },
  item: {
    marginVertical: -3,
    marginHorizontal: 10,
  },
});

export default Row;
