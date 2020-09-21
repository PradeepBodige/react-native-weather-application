import React from 'react'
import {View, Text, StyleSheet, Image} from 'react-native'

export default function WeatherInfo({currentWeather}){
    const {main:{temp},
        weather:[details],
        name: name,
        clouds: clouds,
        wind: wind
    } = currentWeather
    const {icon, main, description} = details
    
    const iconUrl = `https://openweathermap.org/img/wn/${icon}@4x.png`
     return(
        <View style={styles.WeatherInfo}>
            <Image style={styles.WeatherIcon} source={{uri:iconUrl}}/>
            
            <Text style={styles.weatherDesc}>{name}</Text>
            <Text style={styles.temper}> {temp}&#176;F</Text>
            <Text style={styles.weatherDesc}>{description}</Text>
            <Text style={styles.weatherDesc}>{main}</Text>
            <Text style={styles.weatherDesc}>Wind Speed:{wind.speed}</Text>
           {/*} <Text style={styles.weatherDesc}>clouds:{clouds.all}%</Text>
            <Text style={styles.weatherDesc}>feels like:{main.feels_like}</Text>*/}
            
            
            <Text></Text>
        </View>
    )
}

const styles = StyleSheet.create({
    WeatherInfo: {
        alignItems: 'center'
    },
    temper:{top:100, color:'white', fontSize:40, top:1},
    WeatherIcon:{width: 100, height: 100},
    weatherDesc: {textTransform:'uppercase'}
})