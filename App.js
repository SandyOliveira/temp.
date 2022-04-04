import React, {Component} from 'react';
import { Text, View, StyleSheet,Image } from 'react-native';


export default class WeatherScreen extends Component{
  constructor(){
    super()

    this.state = {
      weather:''
    }
  }

  getWeather = async ()=>{
    var url = 'https://fcc-weather-api.glitch.me/api/current?lat=-19.912998&lon=-43.940933';
    return fetch(url)
      .then(response => response.json())
      .then(responseJson =>{
        this.setState({
          weather:responseJson,
        })
      })
      .catch(error =>{
        console.log(error)
      })
  }

  componentDidMount = () => {
    this.getWeather();
  };

  render(){
    if(this.state.weather === ''){
      return(
        <View style={styles.container}>
          <Text>Carregando...</Text>
        </View>
      )

    }else{
      return(
        <View style={styles.container}>
          <View style={styles.subContainer}>
            <Text style={styles.title}>Previsão do Tempo</Text>
            <Image style={styles.cloudImage} source={require('./cloud.png')} />
            <View>
            <Text style={{fontSize:20,margin:2}}>Região: {this.state.weather.name}</Text>
            <Text style={{fontSize:18,margin:2}}>{this.state.weather.main.temp}&deg;C</Text>
            <Text style={{fontSize:20,margin:2}}>Temperatura Min: {this.state.weather.main.temp_min}&deg;C</Text>
            <Text style={{fontSize:20,margin:2}}>Temperatura Máx: {this.state.weather.main.temp_max}&deg;C</Text>

            </View>
            <View style={styles.textContainer}>
            
             
              <Text style={{fontSize:20,margin:10}}>Humidade: {this.state.weather.main.humidity}</Text>
              <Text style={{fontSize:20}}>{this.state.weather.weather[0].description}</Text>
            </View>
            
          </View>
        </View>
      )
    }
  }

}

const styles = StyleSheet.create({
  container: {
   flex:1
  },
  subContainer : { 
    flex: 1, 
    borderWidth: 1, 
    alignItems: 'center' 
    },
    title:{ 
      marginTop: 50, 
      fontSize: 30,
      fontWeight: 'bold'
    },
    cloudImage :{ 
      width: 200, 
      height: 200, 
      marginTop: 30 
    },
    textContainer : { 
      flex: 1,
      alignItems: 'center', 
      flexDirection:'row', 
      marginTop:-150
    }
});
