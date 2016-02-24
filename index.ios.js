/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
 'use strict';
 import React, {
   AppRegistry,
   Component,
   StyleSheet,
   Text,
   View,
   Image,
   ListView,
 } from 'react-native';

 const styles = StyleSheet.create({
   container: {
     flex: 1,
     flexDirection: 'row',
     justifyContent: 'center',
     alignItems: 'center',
     backgroundColor: '#F5FCFF',
     padding: 20,
   },
   thumbnail: {
     width: 53,
     height: 81,
   },
   rightContainer: {
     flex: 1,
   },
   listView: {
   },
   title: {
     fontSize: 20,
     marginBottom: 8,
     textAlign: 'center',
   },
   year: {
     textAlign: 'center',
   },
 });

 const MOVIE_API_URL = 'https://raw.githubusercontent.com/facebook/react-native/master/docs/MoviesExample.json';

 class MovieData extends Component {
   constructor(props) {
     super(props);
     this.state = {
       loading: true,
       dataSource: new ListView.DataSource({
         rowHasChanged: (row1, row2) => row1 !== row2,
       }),
     };
   }
   componentDidMount() {
     this.fetchData();
   }
   fetchData() {
     this.setState({ loading: true });
     fetch(MOVIE_API_URL)
       .then((res) => res.json())
       .then((data) => {
         this.setState({
           loading: false,
           dataSource: this.state.dataSource.cloneWithRows(data.movies),
         });
       })
       .done();
   }
   renderLoadingView() {
     return (
       <View style={styles.container}>
         <Text>
           Loading movies...
         </Text>
       </View>
     );
   }
   renderMovies() {
     return (
       <ListView
         dataSource={this.state.dataSource}
         renderRow={this.renderMovie}
         style={styles.listView}
       />
     );
   }
   renderMovie(movie) {
     return (
       <View style={styles.container}>
         <Image
           source={{ uri: movie.posters.thumbnail }}
           style={styles.thumbnail}
         />
         <View style={styles.rightContainer}>
           <Text style={styles.title}>{movie.title}</Text>
           <Text style={styles.year}>{movie.year}</Text>
         </View>
       </View>
     );
   }
   render() {
     return this.state.loading ? this.renderLoadingView() : this.renderMovies();
   }
 }

 AppRegistry.registerComponent('MovieData', () => MovieData);
