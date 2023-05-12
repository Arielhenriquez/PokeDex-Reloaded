using Microsoft.AspNetCore.Mvc;
using PokeApi_Backend.Services;

namespace PokeApi_Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PokemonController : ControllerBase
    {
        private readonly IPokemonService _pokeService;

        public PokemonController(IPokemonService pokeService)
        {
            _pokeService = pokeService;
        }

        [HttpGet("paged-pokemons")]
        public async Task<IActionResult> GetPagedPokemons([FromQuery] int pageSize, int pageNumber)
        {
            var pokemons = await _pokeService.GetPagedPokemons(pageSize, pageNumber);
            return Ok(pokemons);
        }

        [HttpGet("{name}")]
        public async Task<IActionResult> GetPokemonByName([FromRoute] string name)
        {
            try
            {
                var singlePokemon = await _pokeService.GetPokemonByName(name);
                return Ok(singlePokemon);
            }

            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("{name}/favorite")]
        public async Task<IActionResult> AddFavoritePokemon([FromRoute] string name)
        {
            try
            {
                await _pokeService.AddFavoritePokemon(name);
                return Ok($"You added the pokemon {name} to your favorite list!");
            }

            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("favorites")]
        public ActionResult<List<string>> GetFavorites()
        {
            var favorites = _pokeService.GetFavorites();
            return Ok(favorites);
        }
    }
}
