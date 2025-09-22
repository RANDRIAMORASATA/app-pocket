using Microsoft.EntityFrameworkCore;
using pocketApi.Data;
using pocketApi.Models;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<PocketContext>(options =>
    options.UseInMemoryDatabase("PocketDB"));

var app = builder.Build();

app.MapGet("/pockets", async (PocketContext db) =>
{
    return await db.Pockets.ToListAsync();
});

app.Run();
