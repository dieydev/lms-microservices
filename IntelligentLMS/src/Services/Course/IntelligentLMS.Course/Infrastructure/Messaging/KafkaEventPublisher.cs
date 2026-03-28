using Confluent.Kafka;
using System.Text.Json;
using IntelligentLMS.Course.Application.Interfaces;

namespace IntelligentLMS.Course.Infrastructure.Messaging;

public class KafkaEventPublisher : IEventPublisher, IDisposable
{
    private readonly IProducer<Null, string> _producer;
    private readonly ILogger<KafkaEventPublisher> _logger;

    public KafkaEventPublisher(IConfiguration configuration, ILogger<KafkaEventPublisher> logger)
    {
        _logger = logger;
        var bootstrapServers = configuration["Kafka:BootstrapServers"] ?? "localhost:9092";

        var config = new ProducerConfig
        {
            BootstrapServers = bootstrapServers,
            AllowAutoCreateTopics = true,
            Acks = Acks.All,
            MessageSendMaxRetries = 3,
            RetryBackoffMs = 1000
        };

        _producer = new ProducerBuilder<Null, string>(config).Build();
    }

    public async Task PublishAsync<T>(string topic, T @event)
    {
        try
        {
            var message = JsonSerializer.Serialize(@event);
            var deliveryResult = await _producer.ProduceAsync(topic, new Message<Null, string> { Value = message });

            _logger.LogInformation($"[Kafka] Published to '{deliveryResult.TopicPartitionOffset}': {message}");
        }
        catch (ProduceException<Null, string> e)
        {
            _logger.LogError($"[Kafka] Delivery failed: {e.Error.Reason}");
            // We log but don't crash the service to ensure resilience, or rethrow if strict consistency is required
            // throw; 
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "[Kafka] Unexpected error publishing message");
        }
    }

    public void Dispose()
    {
        _logger.LogInformation("[Kafka] Flushing producer...");
        _producer?.Flush(TimeSpan.FromSeconds(10));
        _producer?.Dispose();
    }
}
