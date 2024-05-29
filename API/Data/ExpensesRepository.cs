using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Helpers;
using API.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class ExpensesRepository : IExpensesRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public ExpensesRepository(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // Expenses
        public async Task<IEnumerable<Category>> GetCategories(string username)
        {
            return await _context.Category
                        .IgnoreQueryFilters()
                        .Where(m => m.Username == username)
                        .ToListAsync();
        }

        public async Task<IEnumerable<Contributors>> GetContributors()
        {
            return await _context.Contributors
                        .IgnoreQueryFilters()
                        .ToListAsync();
        }

        public async Task<IEnumerable<Category>> GetClosedCategories(string username)
        {
            return await _context.Category
                        .IgnoreQueryFilters()
                        .Where(m => m.Username == username && m.IsClosed == true)
                        .ToListAsync();
        }

        public async Task<Category> GetCategoryById(int id)
        {
            return await _context.Category
                .IgnoreQueryFilters()
                .SingleOrDefaultAsync(x => x.Id == id);
        }

        public async Task<IEnumerable<Expenses>> GetCategoryExpenses(int id)
        {
            return await _context.Expenses
                        .IgnoreQueryFilters()
                        .Where(m => m.CategoryId == id)
                        .ToListAsync();
        }

        public async Task<Expenses> GetExpenseById(int id)
        {
            return await _context.Expenses
                .IgnoreQueryFilters()
                .SingleOrDefaultAsync(x => x.Id == id);
        }

        public async Task<IEnumerable<Contributors>> GetCategoryContributors(int id)
        {
            return await _context.Contributors
                        .IgnoreQueryFilters()
                        .Where(m => m.CategoryId == id)
                        .ToListAsync();
        }

        public async Task<IEnumerable<Expenses>> GetContributorExpenses(int id, string username)
        {
            return await _context.Expenses
                        .IgnoreQueryFilters()
                        .Where(m => m.CategoryId == id && (m.WhoPaid == username))
                        .ToListAsync();
        }

        public async Task<IEnumerable<Expenses>> GetContributorExpensesSum(int id, string username)
        {
            return await _context.Expenses
                        .IgnoreQueryFilters()
                        .Where(m => m.CategoryId == id && (m.WhoPaid == username))
                        .ToListAsync();
        }

        public async Task<IEnumerable<Spendings>> GetUserSpendings(int categoryId, string username)
        {
            return await _context.Spendings
                        .IgnoreQueryFilters()
                        .Where(m => m.CategoryId == categoryId && m.WhoOwes == username)
                        .ToListAsync();
        }

        public async Task<IEnumerable<Spendings>> GetExpenseSpendings(int expenseId)
        {
            return await _context.Spendings
                        .IgnoreQueryFilters()
                        .Where(m => m.ExpenseId == expenseId)
                        .ToListAsync();
        }

        public async Task<Spendings> GetSpendingById(int id)
        {            
            return await _context.Spendings
                .IgnoreQueryFilters()
                .SingleOrDefaultAsync(x => x.Id == id);
        }

        public async Task<IEnumerable<Spendings>> WhoOwesWho(int id, string whoPaid, string whoOwes)
        {
                return await _context.Spendings
                    .IgnoreQueryFilters()
                    .Where(m => m.CategoryId == id && m.WhoPaid == whoPaid && m.WhoOwes == whoOwes && m.WhoPaid != whoOwes)
                    .ToListAsync();
        }

    }
}