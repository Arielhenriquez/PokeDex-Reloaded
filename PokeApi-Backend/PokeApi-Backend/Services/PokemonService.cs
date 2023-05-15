using Microsoft.Extensions.Caching.Memory;
using PokeApi_Backend.Models;
using System.Text.Json;

namespace PokeApi_Backend.Services
{
    public interface IPokemonService
    {
        Task<PagedPokemonsDto> GetPagedPokemonsAsync(int pageSize, int pageNumber);
        Task<PokemonResponseDto> GetPokemonByNameAsync(string name);
        Task<string> AddFavoritePokemonAsync(string name);
        Task<string> RemoveFavoritePokemonAsync(string name);
        List<PokemonResponseDto> GetFavorites();
    }

    public class PokemonService : IPokemonService
    {
        private readonly HttpClient _client;
        private readonly string _baseUri;
        private const string FavoritePokemonKey = "FavoritePokemon";
        private readonly IMemoryCache _memoryCache;

        public PokemonService(IConfiguration configuration, IHttpClientFactory httpClientFactory, IMemoryCache memoryCache)
        {
            _baseUri = configuration.GetValue<string>("PokeApiUrl")!;
            _client = httpClientFactory.CreateClient();
            _memoryCache = memoryCache;
        }

        private async Task<T> GetFromPokemonApiAsync<T>(string endpoint)
        {
            var response = await _client.GetAsync($"{_baseUri}/{endpoint}");

            response.EnsureSuccessStatusCode();

            var apiResponse = await JsonSerializer.DeserializeAsync<T>(await response.Content.ReadAsStreamAsync());

            if (apiResponse == null) throw new ArgumentException("Invalid JSON response");

            return apiResponse;
        }

        public async Task<PagedPokemonsDto> GetPagedPokemonsAsync(int pageSize, int pageNumber)
        {
            int offset = (pageNumber - 1) * pageSize;
            var pokemonResponse = await GetFromPokemonApiAsync<PagedPokemonsDto>($"?limit={pageSize}&offset={offset}");

            var tasks = pokemonResponse.Results!.Select(async pokemon =>
            {
                var pokemonInfoResponse = await GetPokemonByNameAsync(pokemon.Name);
                pokemon.Photo = pokemonInfoResponse.Images?.FrontImage!;
            });

            await Task.WhenAll(tasks);

            return pokemonResponse;
        }


        public async Task<PokemonResponseDto> GetPokemonByNameAsync(string name)
        {
            var pokemonResponse = await GetFromPokemonApiAsync<PokemonResponseDto>(name);

            var (favorites, favoritePokemon) = GetFavoritesAndExistingPokemon(name);
            if (favoritePokemon != null)
            {
                pokemonResponse.IsFavorite = true;
            }

            return pokemonResponse;
        }

        private (List<PokemonResponseDto> FavoritePokemons, PokemonResponseDto? ExistingPokemon) GetFavoritesAndExistingPokemon(string name)
        {
            var favorites = _memoryCache.Get<List<PokemonResponseDto>>(FavoritePokemonKey) ?? new List<PokemonResponseDto>();
            var existingPokemon = favorites.FirstOrDefault(p => p.Name == name);

            return (FavoritePokemons: favorites, ExistingPokemon: existingPokemon);
        }
        public async Task<string> AddFavoritePokemonAsync(string name)
        {
            var (favorites, existingPokemon) = GetFavoritesAndExistingPokemon(name);

            if (existingPokemon == null)
            {
                var pokemonResponse = await GetFromPokemonApiAsync<PokemonResponseDto>(name);
                pokemonResponse.IsFavorite = true;
                favorites.Add(pokemonResponse);
                _memoryCache.Set(FavoritePokemonKey, favorites, new MemoryCacheEntryOptions().SetAbsoluteExpiration(TimeSpan.FromDays(1)));
                return $"Pokemon: {name} has been added to the favorites list.";
            }
            else
            {
                return $"Pokemon: {name} is already a favorite.";
            }
        }

        public async Task<string> RemoveFavoritePokemonAsync(string name)
        {
            var (favorites, existingPokemon) = GetFavoritesAndExistingPokemon(name);

            if (existingPokemon != null)
            {
                favorites.Remove(existingPokemon);
                _memoryCache.Set(FavoritePokemonKey, favorites, new MemoryCacheEntryOptions().SetAbsoluteExpiration(TimeSpan.FromDays(1)));
                return $"Pokemon: {name} has been removed from the favorites list.";
            }
            else
            {
                return $"Pokemon: {name} is not a favorite.";
            }
        }

        public List<PokemonResponseDto> GetFavorites()
        {
            var favoritePokemons = _memoryCache.Get<List<PokemonResponseDto>>(FavoritePokemonKey) ?? new List<PokemonResponseDto>();
            return favoritePokemons.Where(p => p.IsFavorite).ToList();
        }

    }
}
