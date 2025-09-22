using System;
using System.ComponentModel.DataAnnotations;

namespace pocketApi.Models
{
    public class Pocket
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public decimal Amount { get; set; }
    }
}
