import { useState, useEffect } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { KEY } from '../utils'
import Card from '../UI/Card';
import './Forcast.css';



const Forcast = (props) => {
    const [forcast, setForcast] = useState([]);

    const fetchForcast = async (cityId) =>{
        try {const forcastResponse = await fetch(`http://dataservice.accuweather.com/forecasts/v1/daily/5day/${cityId}?apikey=${KEY}`);
        const forcastData = await forcastResponse.json();
        setForcast (forcastData.DailyForecasts);
    } catch (error) {
        toast.error('faild to load forcast');

    }
    }

    const parseDate = (dateString) => {
        const date = new Date (Date.parse(dateString));
        console.log(Date.parse(dateString));

        const dateObject = new Date(Date.UTC(dateString+''));
        console.log('parse date' + dateObject);
        return (date.toLocaleString('en-US', {weekday: 'short'}));

    }

    useEffect( () => {
        fetchForcast(props.cityId);
    }, [props.cityId])



   return (
        <ul className = 'forcast-list'>
            {forcast.map ((forcastItem) => 
                    <Card className = 'forcast-item'>
                        <li key = {new Date(Date.UTC(forcastItem.EpochDate))}> 
                            <p>{parseDate(forcastItem.Date)}</p>
                            <p>{forcastItem.Temperature.Minimum.Value}<span>&#176;F</span></p>
                            <img src = {`https://developer.accuweather.com/sites/default/files/${String(forcastItem.Day.Icon).padStart(2, '0')
}-s.png`}></img>
                            <p>{forcastItem.Day.IconPhrase}</p>
                         
                        </li>
                    </Card>
                        )}
        </ul>
    )
}

export default Forcast;