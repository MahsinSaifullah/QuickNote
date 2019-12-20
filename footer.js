import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Button} from 'native-base';

class AppFooter extends Component {
  state = {};
  render() {
    const {filter} = this.props;
    return (
      <View style={styles.container}>
        <Button
          rounded
          style={{backgroundColor: '#aa26da'}}
          onPress={() => this.props.onFilter('ALL')}>
          <View style={styles.button}>
            <Text style={styles.text}>All</Text>
          </View>
        </Button>
        <Button
          rounded
          style={{backgroundColor: '#aa26da'}}
          onPress={() => this.props.onFilter('ACTIVE')}>
          <View style={styles.button}>
            <Text style={styles.text}>Active</Text>
          </View>
        </Button>
        <Button
          rounded
          style={{backgroundColor: '#aa26da'}}
          onPress={() => this.props.onFilter('COMPLETED')}>
          <View style={styles.button}>
            <Text style={styles.text}>Completed</Text>
          </View>
        </Button>
        <Button rounded danger onPress={this.props.onClear}>
          <View style={styles.button}>
            <Text style={styles.text}>Clear</Text>
          </View>
        </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  button: {
    padding: 20,
  },
  text: {
    color: 'white',
  },
});

export default AppFooter;
