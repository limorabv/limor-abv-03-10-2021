import { useSelector, useDispatch } from 'react-redux';
import { favoritesActions } from '../store/index';
import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import './Favorites.css';




const Favorites = () => {
  const favorites = useSelector( state => state.favorites.favList);
  const dispatch = useDispatch();

    return (
      <Fragment>
        <h1>The Favorites Page</h1>
        <ul>
          {favorites.map(favoriteItem => 
            <li className = "favorite-item">
              <Link to = {`/city/${favoriteItem.name}`}> {favoriteItem.name} </Link>
              <p>{favoriteItem.currentWeather}</p>

              <button onClick = {() => {dispatch(favoritesActions.removeFavorite(favoriteItem.id))}}>remove</button>
              
            </li>)}
        </ul>
      </Fragment>  

      );

  };
  
  export default Favorites;