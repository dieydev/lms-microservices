FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 8080

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app

# Copy Shared Project
COPY ["src/Shared/IntelligentLMS.Shared/IntelligentLMS.Shared.csproj", "src/Shared/IntelligentLMS.Shared/"]

# Copy User Project
COPY ["src/Services/User/IntelligentLMS.User/IntelligentLMS.User.csproj", "src/Services/User/IntelligentLMS.User/"]

# Restore
RUN dotnet restore "src/Services/User/IntelligentLMS.User/IntelligentLMS.User.csproj"

# Copy source code
COPY src ./src

# Build
WORKDIR "src/Services/User/IntelligentLMS.User"
RUN dotnet build "IntelligentLMS.User.csproj" -c Release -o /app/build

FROM build AS publish
WORKDIR /app/src/Services/User/IntelligentLMS.User
RUN dotnet publish IntelligentLMS.User.csproj -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "IntelligentLMS.User.dll"]
