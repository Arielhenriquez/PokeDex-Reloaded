using System.Text.Json.Serialization;

namespace PokeApi_Backend.Models
{
    public class PagedPokemonsDto
    {
        [JsonPropertyName("count")]
        public int Count { get; set; }
        [JsonPropertyName("next")]
        public string Next { get; set; } = string.Empty;
        [JsonPropertyName("previous")]
        public string Previous { get; set; } = string.Empty;
        [JsonPropertyName("results")]
        public List<AllPokemonsInfo>? Results { get; set; }
    }
    public class AllPokemonsInfo
    {
        [JsonPropertyName("name")]
        public string Name { get; set; } = string.Empty;
        [JsonPropertyName("url")]
        public string Url { get; set; } = string.Empty;
        public string Photo { get; set; } = string.Empty;
    }
}
