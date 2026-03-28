namespace IntelligentLMS.Course.Application.Interfaces;

public interface IEventPublisher
{
    Task PublishAsync<T>(string topic, T @event);
}
