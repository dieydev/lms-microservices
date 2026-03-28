FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 8080

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app

# Copy Shared Project
COPY ["src/Shared/IntelligentLMS.Shared/IntelligentLMS.Shared.csproj", "src/Shared/IntelligentLMS.Shared/"]

# Copy Progress Project
COPY ["src/Services/Progress/IntelligentLMS.Progress/IntelligentLMS.Progress.csproj", "src/Services/Progress/IntelligentLMS.Progress/"]

# Restore
RUN dotnet restore "src/Services/Progress/IntelligentLMS.Progress/IntelligentLMS.Progress.csproj"

# Copy source code
COPY src ./src

# Build
WORKDIR "src/Services/Progress/IntelligentLMS.Progress"
RUN dotnet build "IntelligentLMS.Progress.csproj" -c Release -o /app/build

FROM build AS publish
WORKDIR /app/src/Services/Progress/IntelligentLMS.Progress
RUN dotnet publish IntelligentLMS.Progress.csproj -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "IntelligentLMS.Progress.dll"]
