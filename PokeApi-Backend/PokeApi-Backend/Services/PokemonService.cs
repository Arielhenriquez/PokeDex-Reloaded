using Microsoft.Extensions.Caching.Memory;
using PokeApi_Backend.Models;
using System.Text.Json;

namespace PokeApi_Backend.Services
{
    public interface IPokemonService
    {
        Task<PagedPokemonsDto> GetPagedPokemons(int pageSize, int pageNumber);
        Task<PokemonResponseDto> GetPokemonByName(string name);
        Task<string> AddFavoritePokemon(string name);
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


        public async Task<PagedPokemonsDto> GetPagedPokemons(int pageSize, int pageNumber)
        {
            var response = await _client.GetAsync($"{_baseUri}?limit={pageSize}?offset={pageNumber}");

            response.EnsureSuccessStatusCode();

            var pokemonResponse = await JsonSerializer.DeserializeAsync<PagedPokemonsDto>(await response.Content.ReadAsStreamAsync());

            if (pokemonResponse == null) throw new ArgumentException("Invalid JSON response");


            return pokemonResponse;
        }

        public async Task<PokemonResponseDto> GetPokemonByName(string name)
        {
            var response = await _client.GetAsync($"{_baseUri}/{name}");

            response.EnsureSuccessStatusCode();

            var pokemonResponse = await JsonSerializer.DeserializeAsync<PokemonResponseDto>(await response.Content.ReadAsStreamAsync());

            if (pokemonResponse == null) throw new ArgumentException("Invalid JSON response");


            return pokemonResponse;
        }

        public async Task<string> AddFavoritePokemon(string name)
        {
            var response = await _client.GetAsync($"{_baseUri}/{name}");

            response.EnsureSuccessStatusCode();

            var pokemonResponse = await JsonSerializer.DeserializeAsync<PokemonResponseDto>(await response.Content.ReadAsStreamAsync());


            var favorites = _memoryCache.Get<List<PokemonResponseDto>>(FavoritePokemonKey) ?? new List<PokemonResponseDto>();

            var existingPokemon = favorites.FirstOrDefault(p => p.Name == name);
            if (existingPokemon == null)
            {
                pokemonResponse!.isFavorite = true;
                favorites.Add(pokemonResponse);
                _memoryCache.Set(FavoritePokemonKey, favorites, new MemoryCacheEntryOptions().SetAbsoluteExpiration(TimeSpan.FromDays(1)));
                return $"{name} has been added to the favorites list.";
            }
            else
            {
                favorites.Remove(existingPokemon);
                _memoryCache.Set(FavoritePokemonKey, favorites, new MemoryCacheEntryOptions().SetAbsoluteExpiration(TimeSpan.FromDays(1)));
                return $"{name} is already a favorite and has been removed from the favorites list.";
            }
        }


        public List<PokemonResponseDto> GetFavorites()
        {
            var favoritePokemons = _memoryCache.Get<List<PokemonResponseDto>>(FavoritePokemonKey) ?? new List<PokemonResponseDto>();
            return favoritePokemons.Where(p => p.isFavorite).ToList();
        }

    }
}
