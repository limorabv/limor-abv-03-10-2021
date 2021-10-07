import { useSelector } from 'react-redux';
import { currentCityActions, favoritesActions } from '../store/index';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import Forcast from './Forcast';
import { Fragment } from 'react';
import { useParams, useHistory } from 'react-router';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { KEY } from '../utils';
import Card from '../UI/Card';
import './CurrentCity.css';


toast.configure();

const CurrenCity = () => {
    const dispatch = useDispatch();
    const currentCityName = useSelector(state => state.currentCity.cityName);
    const currentWeather = useSelector(state => state.currentCity.currWeather);
    const currCityId = useSelector(state => state.currentCity.cityId);
    const favorites = useSelector( state => state.favorites.favList);
    const params = useParams();
    const history = useHistory();

  
    
    let isFavorite = favorites.find( favorite => favorite.id === currCityId);

    const searchClickedHandler = (e) => {
        const searchedName = document.querySelector('#city-input').value;
        history.push(`/city/${searchedName}`)
      
    }

    const addFavoriteHandler = () => {
        dispatch(favoritesActions.addFavorite({ name: currentCityName, id: currCityId, currentWeather: currentWeather.weatherText, currentTemp: currentWeather.temperature.imperial}))
    }

    const removeFavoriteHandler = () => {
        dispatch( favoritesActions.removeFavorite(currCityId));
    }

    const fetchCity = async (name) => {
        console.log("inside fetch city");
        try {
            const currCityResponse = await fetch(`https://dataservice.accuweather.com/locations/v1/cities/autocomplete/?apikey=${KEY}&q=${name}`);
            const currCityJson = await currCityResponse.json();
            const cityId = currCityJson[0].Key;

            const cityName = currCityJson[0].LocalizedName;
            dispatch(currentCityActions.updateCurrentCity({cityName, cityId: cityId}));
        } catch (error){
            toast.error('city search faild');
            console.log('city search faild');
        }
    }

    const fetchCurrWeather = async (cityId) => {

        try { 

            const currWeatherResponse = await fetch (`https://dataservice.accuweather.com/currentconditions/v1/${currCityId}?apikey=${KEY}`);
            const currentWeatherJson = await currWeatherResponse.json();
            dispatch (currentCityActions.updateCurrentWeather({
                weatherText: currentWeatherJson[0].WeatherText,
                weatherIcon: currentWeatherJson[0].WeatherIcon, 
                imperial: currentWeatherJson[0].Temperature.Imperial.Value, 
                metric: currentWeatherJson[0].Temperature.Metric.Value
        }));
        } catch (error) {
            toast.error('failed fetching weather');
            console.log ('failed fetching weather');
        }
    }

    const success = async (position) => {
        try {const latitude  = position.coords.latitude;
        const longitude = position.coords.longitude;
        console.log(`lat: ${latitude}, lon: ${longitude}`);
        const cityResponse = await fetch(`https://dataservice.accuweather.com/locations/v1/cities/geoposition/search?q=${latitude},${longitude}&apikey=${KEY}`)
        const cityJson = await cityResponse.json();
        console.log(cityJson);
        const cityName = cityJson.LocalizedName;
        const cityId = cityJson.Key;
        console.log(`from sucsses func id: ${cityId}`);
        dispatch(currentCityActions.updateCurrentCity({cityName:cityName , cityId: cityId}))
    } catch (error){
        console.log(error);
        toast.error('error');
    }
    }
    

    if (params.name) {
        fetchCity(params.name);
    }
    else {
        if('geolocation' in navigator) {
            /* geolocation is available */
            navigator.geolocation.getCurrentPosition(success, () => {fetchCity('Tel Aviv')})
          }
    }

    useEffect (() => {
        console.log('inside use effect:' + currCityId );
        const fetchData = async () => {
            await fetchCurrWeather (currCityId);

        }
        fetchData();
    }, [currentCityName, currCityId]);

    console.log(currCityId);
    


    
    return (
    <Fragment>
        <form onSubmit = { (e) => {e.preventDefault()}}> 
            <div className = 'input-container'>
                <input type="search" id = 'city-input'/>
                <button type="submit" onClick = { searchClickedHandler } > Search </button>
            </div>
        </form>
        <Card className = 'city'>
            { currentCityName &&<div>
            <h2 class = 'city-title'>{currentCityName}</h2>
            {console.log(currentWeather.temperature)}
            {currentWeather && <h2>{currentWeather.temperature.imperial}<span>&#176;F</span></h2>}
            {currentWeather && <h3>{ currentWeather.weatherText }</h3>}
            <img src = {`https://developer.accuweather.com/sites/default/files/${String(currentWeather.weatherIcon).padStart(2, '0')
}-s.png`}/>
            < Forcast cityId = { currCityId } />
            

            <button className = 'fav-btn ' class="btn btn-success"onClick = { isFavorite ? removeFavoriteHandler : addFavoriteHandler }>{isFavorite ? 'Remove Favorite': 'Add Favorite'}</button>
            </div>}
        </Card>
    </Fragment>
    );
  };
  
  export default CurrenCity;