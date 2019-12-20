import React, {Component} from 'react';
import {StyleSheet, SafeAreaView, Image} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createDrawerNavigator, DrawerItems} from 'react-navigation-drawer';
import HomeScreen from './HomeScreen';
import About from './About';
import {Container, Header, Left, Icon} from 'native-base';
// import Icon from 'react-native-vector-icons/FontAwesome5';

const CustomDrawerContentComponent = props => (
  <Container>
    <Header noShadow style={{height: 150, backgroundColor: 'white'}}>
      <Left>
        <Image
          style={styles.drawerLogo}
          source={require('./assests/images/drawerLogo.png')}
        />
      </Left>
    </Header>
    <DrawerItems {...props} />
  </Container>
);

const MyDrawerNavigator = createDrawerNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    About: {
      screen: About,
    },
  },
  {
    initialRouteName: 'Home',
    contentComponent: CustomDrawerContentComponent,
    contentOptions: {
      activeTintColor: '#aa26da',
      activeBackgroundColor: '#f7e8f6',
    },
  },
);

export default createAppContainer(MyDrawerNavigator);

const styles = StyleSheet.create({
  drawerLogo: {
    marginRight: 50,
    height: 80,
    width: 80,
    // borderRadius: 75,
  },
});
