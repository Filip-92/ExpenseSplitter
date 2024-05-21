using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Helpers;

namespace API.Interfaces
{
    public interface IExpensesRepository
    {
        Task<IEnumerable<Category>> GetCategories(string username);
        Task<IEnumerable<Category>> GetClosedCategories(string username);
        Task<Category> GetCategoryById(int id);
        Task<IEnumerable<Expenses>> GetCategoryExpenses(int id);
        Task<IEnumerable<Contributors>> GetCategoryContributors(int id);
        Task<IEnumerable<Expenses>> GetContributorExpenses(int id, string username);
        Task<IEnumerable<Expenses>> GetContributorExpensesSum(int id, string username);
        Task<IEnumerable<Spendings>> GetUserSpendings(int id, string username);
        Task<IEnumerable<Spendings>> GetExpenseSpendings(int expenseId);
        Task<Spendings> GetSpendingById(int id);
        Task<IEnumerable<Contributors>> GetContributors();
        Task<IEnumerable<Spendings>> WhoOwesWho(int id, string whoPaid, string whoOwes);
    }
}