using Microsoft.AspNetCore.Mvc;
using PokeApi_Backend.Exceptions;
using PokeApi_Backend.Services;
using Swashbuckle.AspNetCore.Annotations;

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

        [SwaggerOperation(
            Summary = "Gets pokemons paginated",
            Description = "It receives the amount of pokemon do you want, and the page number")]

        [HttpGet("paged-pokemons")]
        public async Task<IActionResult> GetPagedPokemons([FromQuery] int pageSize, int pageNumber)
        {
            var pokemons = await _pokeService.GetPagedPokemonsAsync(pageSize, pageNumber);
            return Ok(pokemons);
        }

        [SwaggerOperation(Summary = "Get single pokemon by name")]

        [HttpGet("{name}")]
        public async Task<IActionResult> GetPokemonByName([FromRoute] string name)
        {
            try
            {
                var singlePokemon = await _pokeService.GetPokemonByNameAsync(name);
                return Ok(singlePokemon);
            }

            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [SwaggerOperation(Summary = "Add a pokemon as a favorite by name")]
        [HttpPut("{name}/favorite")]
        public async Task<IActionResult> AddFavoritePokemon([FromRoute] string name)
        {
            try
            {
                await _pokeService.AddFavoritePokemonAsync(name);
                return Ok($"Pokemon: {name} added to the favorite list");
            }
            catch (PokemonAlreadyFavoriteException ex)
            {
                return Conflict(ex.Message);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [SwaggerOperation(Summary = "Remove a pokemon as a favorite by name")]
        [HttpDelete("{name}/favorite")]
        public async Task<IActionResult> RemoveFavoritePokemon([FromRoute] string name)
        {
            try
            {
                await _pokeService.RemoveFavoritePokemonAsync(name);
                return NoContent();
            }
            catch (PokemonNotFavoriteException ex)
            {
                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }

        [SwaggerOperation(Summary = "List all favorite pokemons")]
        [HttpGet("favorites")]
        public ActionResult<List<string>> GetFavorites()
        {
            var favorites = _pokeService.GetFavorites();
            return Ok(favorites);
        }
    }
}
