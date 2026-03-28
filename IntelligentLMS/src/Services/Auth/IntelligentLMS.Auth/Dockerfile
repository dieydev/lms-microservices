FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 8080

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app

# Copy Shared Project
COPY ["src/Shared/IntelligentLMS.Shared/IntelligentLMS.Shared.csproj", "src/Shared/IntelligentLMS.Shared/"]

# Copy Auth Project
COPY ["src/Services/Auth/IntelligentLMS.Auth/IntelligentLMS.Auth.csproj", "src/Services/Auth/IntelligentLMS.Auth/"]

# Restore
RUN dotnet restore "src/Services/Auth/IntelligentLMS.Auth/IntelligentLMS.Auth.csproj"

# Copy source code
COPY src ./src

# Build
WORKDIR "src/Services/Auth/IntelligentLMS.Auth"
RUN dotnet build "IntelligentLMS.Auth.csproj" -c Release -o /app/build

FROM build AS publish
WORKDIR /app/src/Services/Auth/IntelligentLMS.Auth
RUN dotnet publish IntelligentLMS.Auth.csproj -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "IntelligentLMS.Auth.dll"]
