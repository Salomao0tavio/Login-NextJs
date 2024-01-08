using AuthApi;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Configuração para a API
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddRazorPages();

// Configuração JWT para autenticação
var key = Encoding.ASCII.GetBytes(Settings.Secret);
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.RequireHttpsMetadata = false; // Permite requisições sem HTTPS
        options.SaveToken = true; // Salva o token recebido do cliente
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true, // Valida a chave do emissor
            IssuerSigningKey = new SymmetricSecurityKey(key), // Define a chave secreta
            ValidateIssuer = false, // Não valida o emissor (issuer)
            ValidateAudience = false // Não valida a audiência (audience)
        };
    });

// Configuração de autorização com políticas (roles)
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

// Configurações gerais
app.UseCors(x => x
    .AllowAnyOrigin()
    .AllowAnyMethod()
    .AllowAnyHeader());

app.UseHttpsRedirection();

app.UseRouting();
app.MapRazorPages();

app.UseAuthentication();
app.UseAuthorization();

// Configuração de rotas e página inicial
app.UseEndpoints(endpoints =>
{
    endpoints.MapControllers(); // Mapeia os controllers da API
    endpoints.MapFallbackToFile("index.html"); // Define o arquivo do React como página inicial
});

app.Run();
