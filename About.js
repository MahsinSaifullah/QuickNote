import React, {Component} from 'react';

import {View, Text, StyleSheet, Image} from 'react-native';
import {
  Icon,
  Button,
  Container,
  Header,
  Content,
  Body,
  Title,
} from 'native-base';
// import Icon from 'react-native-vector-icons/FontAwesome5';

export default class About extends Component {
  static navigationOptions = {
    drawerLabel: 'About',
    drawerIcon: ({tintColor}) => (
      <Icon name="ios-alert" color={tintColor} size={22} />
    ),
  };
  render() {
    return (
      <Container contentContainerStyle={{flex: 1, padding: 40}}>
        <Header style={{backgroundColor: '#aa26da'}}>
          <Body style={{flex: 1, flexDirection: 'row'}}>
            <Icon
              name="menu"
              onPress={() => this.props.navigation.toggleDrawer()}
            />
            <Title style={{marginLeft: 100}}>QuickNote</Title>
          </Body>
        </Header>
        <Text style={styles.header}>About QuickNote</Text>

        <View style={styles.icon}>
          <Image
            style={styles.drawerLogo}
            source={require('./assests/images/drawerLogo.png')}
          />
        </View>

        <Text style={styles.text}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque
          et ligula ullamcorper, pellentesque magna quis, lobortis quam.
        </Text>
        <Text style={styles.text}>
          Mauris efficitur elementum cursus. Cras ultrices urna in ex rutrum
          rutrum nec sit amet lacus. Suspendisse ullamcorper lectus eget ornare
          venenatis. Suspendisse potenti.
        </Text>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    marginTop: 50,
    marginBottom: 20,
    textAlign: 'center',
    fontSize: 20,
  },
  icon: {
    marginVertical: 20,
    marginLeft: 50,
    alignSelf: 'center',
  },
  drawerLogo: {
    marginRight: 50,
    height: 100,
    width: 100,
    // borderRadius: 75,
  },
  text: {
    fontSize: 14,
    color: '#444',
    marginTop: 20,
    marginHorizontal: 50,
  },
});
