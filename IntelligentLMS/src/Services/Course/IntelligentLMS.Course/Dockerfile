FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 8080

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app

# Copy Shared Project
COPY ["src/Shared/IntelligentLMS.Shared/IntelligentLMS.Shared.csproj", "src/Shared/IntelligentLMS.Shared/"]

# Copy Course Project
COPY ["src/Services/Course/IntelligentLMS.Course/IntelligentLMS.Course.csproj", "src/Services/Course/IntelligentLMS.Course/"]

# Restore
RUN dotnet restore "src/Services/Course/IntelligentLMS.Course/IntelligentLMS.Course.csproj"

# Copy source code
COPY src ./src

# Build
WORKDIR "src/Services/Course/IntelligentLMS.Course"
RUN dotnet build "IntelligentLMS.Course.csproj" -c Release -o /app/build

FROM build AS publish
WORKDIR /app/src/Services/Course/IntelligentLMS.Course
RUN dotnet publish IntelligentLMS.Course.csproj -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "IntelligentLMS.Course.dll"]
