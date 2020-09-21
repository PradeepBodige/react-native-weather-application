import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import { AppLoading } from 'expo';
import * as Location from 'expo-location'
import WeatherInfo from './components/WeatherInfo'

const WEATHER_API_KEY = ''// your key here
const BASE_WEATHER_URL = 'https://api.openweathermap.org/data/2.5/weather?'
export default function App() {

  const [errorMessage, setErrorMessage] = useState(null)
  const [currentWeather, setCurrentWeather] = useState(null)
  const [unitSystem, setUnitSystem] = useState('imperial');
  useEffect(()=>{
    load()
  }, [])
  async function load(){
    try{
      let { status } = await Location.requestPermissionsAsync()
      if(status !== 'granted'){
        setErrorMessage('Access to location is needed to run the app')
        return
      }
      const location = await Location.getCurrentPositionAsync()
      const {latitude, longitude} = location.coords
      alert(`latitude: ${latitude}, Logitude: ${longitude}`)

      const weatherUrl = `${BASE_WEATHER_URL}lat=${latitude}&lon=${longitude}&units=${unitSystem}&appid=${WEATHER_API_KEY}`;
      const response = await fetch(weatherUrl);

      const result = await response.json();

      if(response.ok){
        setCurrentWeather(result);
      }else{
        setErrorMessage(result.message);
      }
    }catch(error){
      setErrorMessage(error.message)
     }
  }
  if (currentWeather){
    return (

      <View style={styles.container}>
          <ImageBackground 
               style={{flex: 1,width: '100%', height: '100%', resizeMode: 'cover', opacity:1}}
               source={require('./assets/nature.jpg')}>
          <View style={styles.main}>
            <WeatherInfo currentWeather={currentWeather}/>
        
         
           <Text style={{zIndex:100, backgroundColor:'black', top:200, color:'white', textAlign:"center"}}> @copyright Pradeep Goud</Text>
           </View>
        </ImageBackground>
       
        
        <StatusBar style="auto" />
      </View>
    );
  }else{
    return (
     
        
        <View style={styles.container}>
          <ImageBackground 
          style={{flex: 1,width: '100%', height: '100%', resizeMode: 'cover'}}
        source={require('./assets/nature.jpg')}
        ></ImageBackground>
          <Text>{errorMessage}</Text>
          <StatusBar style="auto"/>
       </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  main:{
    flex: 1,
    justifyContent: 'center'
  }
});
