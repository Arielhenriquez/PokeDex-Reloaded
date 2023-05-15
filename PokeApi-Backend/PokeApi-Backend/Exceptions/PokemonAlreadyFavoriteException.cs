namespace PokeApi_Backend.Exceptions
{
    public class PokemonAlreadyFavoriteException : Exception
    {
        public PokemonAlreadyFavoriteException(string message) : base(message)
        {

        }
    }
}
