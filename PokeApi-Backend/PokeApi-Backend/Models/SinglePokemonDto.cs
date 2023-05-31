using System.Text.Json.Serialization;

namespace PokeApi_Backend.Models
{
    public class SinglePokemonDto
    {
        [JsonPropertyName("id")]
        public int Id { get; set; }

        [JsonPropertyName("name")]
        public string Name { get; set; } = string.Empty;

        [JsonPropertyName("height")]
        public int Height { get; set; }

        [JsonPropertyName("weight")]
        public int Weight { get; set; }

        [JsonPropertyName("sprites")]
        public PokemonImages? Images { get; set; }

        [JsonPropertyName("types")]
        public List<Types>? Types { get; set; }
        public bool IsFavorite { get; set; } = false;
    }
    public class PokemonImages
    {
        [JsonPropertyName("front_default")]
        public string FrontImage { get; set; } = string.Empty;

        [JsonPropertyName("front_shiny")]
        public string FrontShinyImage { get; set; } = string.Empty;
    }
    public class Types
    {
        [JsonPropertyName("slot")]
        public int Slot { get; set; }

        [JsonPropertyName("type")]
        public TypeDetail? Type { get; set; }
    }

    public class TypeDetail
    {
        [JsonPropertyName("name")]
        public string Name { get; set; } = string.Empty;

        [JsonPropertyName("url")]
        public string Url { get; set; } = string.Empty;
    }

}
