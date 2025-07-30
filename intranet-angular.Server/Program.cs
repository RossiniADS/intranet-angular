using intranet_angular.Server.Context;
using intranet_angular.Server.Interfaces;
using intranet_angular.Server.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.FileProviders;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Configuração do DbContext (MySQL)
builder.Services.AddDbContext<IntraNetDbContext>(options =>
    options.UseMySql(builder.Configuration.GetConnectionString("IntraNetConnectionString"),
    new MySqlServerVersion(new Version(8, 0, 30))));

// JWT
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.RequireHttpsMetadata = false;
    options.SaveToken = true;
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = builder.Configuration["Jwt:Issuer"],
        ValidAudience = builder.Configuration["Jwt:Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]))
    };
});

// CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigin", policy =>
    {
        policy.WithOrigins(
                "https://localhost:52789",
                "https://localhost:7227",
                "https://127.0.0.1:52789",
                "http://localhost:80",
                "http://192.168.20.233:80",
                "http://192.168.20.233")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

// DI dos serviços
builder.Services.AddScoped<ICategoriaService, CategoriaService>();
builder.Services.AddScoped<IEventoService, EventoService>();
builder.Services.AddScoped<IFuncionarioService, FuncionarioService>();
builder.Services.AddScoped<IMidiaNoticiaService, MidiaNoticiaService>();
builder.Services.AddScoped<INoticiaService, NoticiaService>();
builder.Services.AddScoped<IPaginaService, PaginaService>();
builder.Services.AddScoped<ISlideService, SlideService>();
builder.Services.AddScoped<IGrupoDeSlidesService, GrupoDeSlidesService>();
builder.Services.AddScoped<ICardapioService, CardapioService>();
builder.Services.AddScoped<IMenuItemService, MenuItemService>();
builder.Services.AddScoped<ISugestaoService, SugestaoService>();
builder.Services.AddScoped<IUsuarioService>(provider =>
{
    var context = provider.GetRequiredService<IntraNetDbContext>();
    return new UsuarioService(context, builder.Configuration["Jwt:Key"]);
});

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.WebHost.ConfigureKestrel(options =>
{
    options.Limits.MaxRequestBodySize = null; // sem limite
});

builder.Services.Configure<FormOptions>(options =>
{
    options.MultipartBodyLengthLimit = long.MaxValue; // sem limite para multipart/form-data
});

var app = builder.Build();

// Middleware
app.UseCors("AllowSpecificOrigin");

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
else
{
    // Habilita HSTS em produção
    app.UseHsts();
}

// HTTPS
app.UseHttpsRedirection();

// Servir arquivos Angular do wwwroot
app.UseDefaultFiles();
app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(
        Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "browser")),
    RequestPath = ""
});


// Arquivos de upload (Uploads/)
var uploadsPath = Path.Combine(Directory.GetCurrentDirectory(), "Uploads");

if (!Directory.Exists(uploadsPath))
{
    Directory.CreateDirectory(uploadsPath);
}

app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(Path.Combine(Directory.GetCurrentDirectory(), "Uploads")),
    RequestPath = "/uploads"
});

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

// Fallback para SPA Angular
app.MapFallbackToFile("index.html", new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(
        Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "browser"))
});

app.Run();