FROM mcr.microsoft.com/dotnet/runtime:8.0 AS base
USER app
WORKDIR /app

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /app

# Copy Shared Project
COPY ["src/Shared/IntelligentLMS.Shared/IntelligentLMS.Shared.csproj", "src/Shared/IntelligentLMS.Shared/"]

# Copy Analytics Project
COPY ["src/Services/Analytics/IntelligentLMS.Analytics/IntelligentLMS.Analytics.csproj", "src/Services/Analytics/IntelligentLMS.Analytics/"]

# Restore
RUN dotnet restore "src/Services/Analytics/IntelligentLMS.Analytics/IntelligentLMS.Analytics.csproj"

# Copy source code
COPY src ./src

# Build
WORKDIR "src/Services/Analytics/IntelligentLMS.Analytics"
RUN dotnet build "IntelligentLMS.Analytics.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
WORKDIR /app/src/Services/Analytics/IntelligentLMS.Analytics
RUN dotnet publish IntelligentLMS.Analytics.csproj -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "IntelligentLMS.Analytics.dll"]
