import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Platform,
  FlatList,
  StatusBar,
} from 'react-native';
import {
  Icon,
  Button,
  Container,
  Header,
  Content,
  Body,
  Title,
} from 'native-base';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
// import Icon from 'react-native-vector-icons/FontAwesome5';
import AppHeader from './header';
import AppFooter from './footer';
import Row from './row';

const qs=require('querystring');
const url = 'http://192.168.0.30:3000';
const config = {
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
}



const filterItems = (filter, items) => {
  return items.filter(item => {
    if (filter == 'ALL') return true;
    if (filter == 'COMPLETED') return item.complete;
    if (filter == 'ACTIVE') return !item.complete;
  });
};

class HomeScreen extends Component {
  static navigationOptions = {
    drawerLabel: 'Home',
    drawerIcon: ({tintColor}) => (
      <Icon name="home" color={tintColor} size={22} />
    ),
  };
  state = {
    loading: true,
    allComplete: false,
    filter: 'ALL',
    value: '',
    items: [],
    displayItems: [],
  };

  componentDidMount() {
    axios
      .get(url + '/items')
      .then(result => this.setState({
        items: result.data, 
        loading: false,
        displayItems: result.data
      }));

    StatusBar.setHidden(true);
  }

// toggles the complete button for all the task
  handleOnPress = () => {
    const complete = !this.state.allComplete;
    let data = {
      complete: complete
    };
    const newItems = this.state.items.map(item => {
      axios
        .put(url + '/items/' + item.key, qs.stringify(data), config)
        .then(res => {
          console.log(res);
          console.log(res.data);
        });
      return {
        ...item,
        complete,
      };
    });


    this.setState({
      items: newItems,
      allComplete: complete,
      displayItems: filterItems(this.state.filter, newItems),
    });
  
  };


//toggles the complete button of a particular task
  handleToggleComplete = (key, complete) => {
    let data = {
      complete: complete
    };
    const newItems = this.state.items.map(item => {
      if (item.key !== key) return item;
      axios
        .put(url +'/items/' + key, qs.stringify(data), config)
        .then(res => {
          console.log(res);
          console.log(res.data);
        });
      return {
        ...item,
        complete,
      };
    });

    this.setState({
      items: newItems,
      displayItems: filterItems(this.state.filter, newItems),
    });

  };

  // adds item to the list
  handleAddItem = () => {
    if (!this.state.value) return;

    let data={
      key: Date.now(),
      text: this.state.value,
      complete: false,
    };

    axios.post(url + '/items', qs.stringify(data), config)
  .then((result) => {
    console.log(result)
  })
  .catch((err) => {
    console.log(err)
  })



    const newItems = [
      ...this.state.items,
      data,
    ];

    this.setState({
      items: newItems,
      value: '',
      displayItems: filterItems(this.state.filter, newItems),
    });

  };

  //removes item from the list
  handleRemoveItem = key => {

    axios.delete(url + '/items/' + key).then(res => {
      console.log(res);
      console.log(res.data);
    });

    const newItems = this.state.items.filter(item => item.key !== key);

    this.setState({
      items: newItems,
      displayItems: newItems,
    });

   
  };

  //filters item according to their filter state
  handleFilter = filter => {
    this.setState({
      displayItems: filterItems(filter, this.state.items),
      filter,
    });
  };

  // clears only the completed task
  handleClear = () => {
    this.state.items.map(item => {
      if (item.complete) {
        axios
          .delete(url + '/items/' + item.key)
          .then(res => {
            console.log(res);
            console.log(res.data);
          });
      }
    });
    const newItems = filterItems('ACTIVE', this.state.items);
    this.setState({
      items: newItems,
      displayItems: filterItems(this.state.filter, newItems),
    });

  };

  render() {
    return (
      <Container contentContainerStyle={styles.container}>
        <Header
          androidStatusBarColor="#aa26da"
          style={{
            backgroundColor: '#aa26da',
          }}>
          <Body style={{flex: 1, flexDirection: 'row'}}>
            <Icon
              style={{color: 'white'}}
              name="menu"
              onPress={() => this.props.navigation.toggleDrawer()}
            />
            <Title style={{marginLeft: 100}}>QuickNote</Title>
          </Body>
        </Header>
        <View></View>
        <AppHeader
          value={this.state.value}
          onAddItem={this.handleAddItem}
          onChange={value => this.setState({value})}
          onPress={this.handleOnPress}
        />
        <Container contentContainerStyle={styles.content}>
          <FlatList
            style={styles.list}
            data={this.state.displayItems}
            renderItem={({item}) => {
              return (
                <Row
                  onComplete={complete =>
                    this.handleToggleComplete(item.key, complete)
                  }
                  text={item.text}
                  complete={item.complete}
                  onRemove={() => this.handleRemoveItem(item.key)}
                />
              );
            }}
            keyExtractor={item => item.key.toString()}
          />
        </Container>
        <AppFooter
          count={filterItems('ACTIVE', this.state.items).length}
          onFilter={filter => this.handleFilter(filter)}
          filter={this.state.filter}
          onClear={this.handleClear}
        />
        {this.state.loading && (
          <View style={styles.loading}>
            <ActivityIndicator animating size="large" />
          </View>
        )}
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eeeeee',
    ...Platform.select({
      android: {paddingTop: 30},
    }),
  },
  content: {
    flex: 1,
  },

  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
  },

  list: {
    backgroundColor: '#FFF',
  },
});

export default HomeScreen;
