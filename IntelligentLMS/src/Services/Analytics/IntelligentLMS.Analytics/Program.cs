using IntelligentLMS.Analytics;
using IntelligentLMS.Analytics.Infrastructure.Messaging;

var builder = Host.CreateApplicationBuilder(args);

builder.Services.AddHostedService<KafkaConsumerHostedService>();

var host = builder.Build();
host.Run();
