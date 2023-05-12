using System.Text.Json.Serialization;

namespace PokeApi_Backend.Models
{
    public class PokemonResponseDto
    {
        [JsonPropertyName("id")]
        public int Id { get; set; }

        [JsonPropertyName("name")]
        public string Name { get; set; } = string.Empty;

        [JsonPropertyName("sprites")]
        public PokemonImages? Images { get; set; }
    }
    public class PokemonImages
    {
        [JsonPropertyName("front_default")]
        public string FrontImage { get; set; } = string.Empty;

        [JsonPropertyName("back_default")]
        public string BackImage { get; set; } = string.Empty;
    }
}
