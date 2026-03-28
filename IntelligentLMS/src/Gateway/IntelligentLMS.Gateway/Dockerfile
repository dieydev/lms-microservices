FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 8080

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app

# Copy Shared Project
COPY ["src/Shared/IntelligentLMS.Shared/IntelligentLMS.Shared.csproj", "src/Shared/IntelligentLMS.Shared/"]

# Copy Gateway Project
COPY ["src/Gateway/IntelligentLMS.Gateway/IntelligentLMS.Gateway.csproj", "src/Gateway/IntelligentLMS.Gateway/"]

# Restore
RUN dotnet restore "src/Gateway/IntelligentLMS.Gateway/IntelligentLMS.Gateway.csproj"

# Copy source code
COPY src ./src

# Build
WORKDIR "src/Gateway/IntelligentLMS.Gateway"
RUN dotnet build "IntelligentLMS.Gateway.csproj" -c Release -o /app/build

FROM build AS publish
WORKDIR /app/src/Gateway/IntelligentLMS.Gateway
RUN dotnet publish IntelligentLMS.Gateway.csproj -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "IntelligentLMS.Gateway.dll"]
