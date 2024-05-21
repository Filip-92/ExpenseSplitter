using System.Threading.Tasks;

namespace API.Interfaces
{
    public interface IUnitOfWork
    {
        IUserRepository UserRepository { get; }
        IMessageRepository MessageRepository { get; }
        IPhotoRepository PhotoRepository { get; }
        IExpensesRepository ExpensesRepository { get; }
        IToDoListRepository ToDoListRepository { get; }
        Task<bool> Complete();
        bool HasChanges();
    }
}