using Confluent.Kafka;
using IntelligentLMS.Shared.Events;
using System.Text.Json;

namespace IntelligentLMS.Analytics.Infrastructure.Messaging;

public class KafkaConsumerHostedService : BackgroundService
{
    private readonly ILogger<KafkaConsumerHostedService> _logger;
    private readonly IConsumer<Ignore, string> _consumer;
    private readonly string[] _topics = new[] { "user-registered", "course-enrolled", "progress-updated" };

    public KafkaConsumerHostedService(IConfiguration configuration, ILogger<KafkaConsumerHostedService> logger)
    {
        _logger = logger;
        
        var bootstrapServers = configuration["Kafka:BootstrapServers"] ?? "localhost:9092";
        var groupId = configuration["Kafka:GroupId"] ?? "analytics-service-group";

        var config = new ConsumerConfig
        {
            BootstrapServers = bootstrapServers,
            GroupId = groupId,
            AutoOffsetReset = AutoOffsetReset.Earliest,
            EnableAutoCommit = false
        };

        _consumer = new ConsumerBuilder<Ignore, string>(config).Build();
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        _consumer.Subscribe(_topics);
        
        // Wait for Kafka to be ready (optional simple delay or retry logic can be added here)
        await Task.Yield(); 

        try
        {
            while (!stoppingToken.IsCancellationRequested)
            {
                try
                {
                    var consumeResult = _consumer.Consume(stoppingToken);
                    if (consumeResult == null) continue;

                    ProcessMessage(consumeResult);

                    _consumer.Commit(consumeResult);
                }
                catch (ConsumeException e)
                {
                    _logger.LogError($"Kafka consume error: {e.Error.Reason}");
                    // Wait a bit before retrying to avoid spamming logs
                    await Task.Delay(1000, stoppingToken);
                }
                catch (Exception ex)
                {
                     _logger.LogError(ex, "Error processing message");
                }
            }
        }
        catch (OperationCanceledException)
        {
            _logger.LogInformation("Analytics consumer stopping.");
        }
        finally 
        {
            _consumer.Close();
        }
    }

    private void ProcessMessage(ConsumeResult<Ignore, string> result)
    {
        _logger.LogInformation($"[Analytics] Received message on topic '{result.Topic}': {result.Message.Value}");

        // In a real scenario, we would deserialize based on topic and save to DB
        // switch(result.Topic) { ... }
    }
    
    public override void Dispose()
    {
        _consumer.Dispose();
        base.Dispose();
    }
}
