using Microsoft.Extensions.Caching.Memory;
using PokeApi_Backend.Models;
using System.Text.Json;

namespace PokeApi_Backend.Services
{
    public interface IPokemonService
    {
        Task<PagedPokemonsDto> GetPagedPokemons(int pageSize, int pageNumber);
        Task<PokemonResponseDto> GetPokemonByName(string name);
        Task AddFavoritePokemon(string name);
        List<string> GetFavorites();
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

        public async Task AddFavoritePokemon(string name)
        {
            var response = await _client.GetAsync($"{_baseUri}/{name}");

            response.EnsureSuccessStatusCode();

            var favorites = _memoryCache.Get<List<string>>(FavoritePokemonKey) ?? new List<string>();

            if (favorites.Contains(name))
            {
                favorites.Remove(name);
            }
            else
            {
                favorites.Add(name);
            }

            _memoryCache.Set(FavoritePokemonKey, favorites, new MemoryCacheEntryOptions().SetAbsoluteExpiration(TimeSpan.FromDays(1)));
        }

        public List<string> GetFavorites()
        {
            return _memoryCache.Get<List<string>>(FavoritePokemonKey) ?? new List<string>();
        }
    }
}
