using API;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Configura��o para a API
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddRazorPages();

// Configura��o JWT para autentica��o
var key = Encoding.ASCII.GetBytes(Settings.Secret);
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.RequireHttpsMetadata = false; // Permite requisi��es sem HTTPS
        options.SaveToken = true; // Salva o token recebido do cliente
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true, // Valida a chave do emissor
            IssuerSigningKey = new SymmetricSecurityKey(key), // Define a chave secreta
            ValidateIssuer = false, // N�o valida o emissor (issuer)
            ValidateAudience = false // N�o valida a audi�ncia (audience)
        };
    });

// Configura��o de autoriza��o com pol�ticas (roles)
builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("user", policy => policy.RequireClaim("Store", "USER"));
    options.AddPolicy("admin", policy => policy.RequireClaim("Store", "ADMIN"));
});

var app = builder.Build();

// Middleware para ambiente de desenvolvimento
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Configura��es gerais
app.UseCors(x => x
    .AllowAnyOrigin()
    .AllowAnyMethod()
    .AllowAnyHeader());

app.UseHttpsRedirection();

app.UseRouting();
app.MapRazorPages();

app.UseAuthentication();
app.UseAuthorization();

// Configura��o de rotas e p�gina inicial
app.UseEndpoints(endpoints =>
{
    endpoints.MapControllers(); // Mapeia os controllers da API
    endpoints.MapFallbackToFile("index.html"); // Define o arquivo do React como p�gina inicial
});

app.Run();
