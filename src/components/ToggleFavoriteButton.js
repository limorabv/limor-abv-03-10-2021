

const ToggleFavoriteButton = (props) => {
    return (
        <button onClick = { props.isFavorite ? props.removeFavoriteHandler : props.addFavoriteHandler }>{props.isFavorite ? 'Remove  Favorite': 'Add favorite'}</button>
        )
}

export default ToggleFavoriteButton;