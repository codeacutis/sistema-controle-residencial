using System.Text.Json.Serialization;
using Microsoft.EntityFrameworkCore;
using SistemaControle.Data;
using SistemaControle.Interface;
using SistemaControle.Service;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

// Registra o contexto do banco de dados SQLite usando a connection string do appsettings
builder.Services.AddDbContext<ConnectionContextDb>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));

// Registra os serviços com ciclo de vida Scoped
builder.Services.AddScoped<IPessoaService, PessoaService>();
builder.Services.AddScoped<ITransacaoService, TransacaoService>();
builder.Services.AddControllers() //
    .AddJsonOptions(options =>
        options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter())); // Força o sistema a ler o valor de Enums como string

// Configura a política de CORS permitindo requisições do frontend em localhost:5173
builder.Services.AddCors(options =>
{
    options.AddPolicy("PermitirFrontend", policy =>
    {
        policy.WithOrigins("http://localhost:5173")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

// app.UseHttpsRedirection();
app.UseCors("PermitirFrontend");
app.MapControllers();

app.Run();


