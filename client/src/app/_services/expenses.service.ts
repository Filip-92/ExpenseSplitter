import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Category } from '../_models/category';
import { Contributor } from '../_models/contributor';
import { Spending } from '../_models/spending';
import { Expense } from '../_models/expense';

@Injectable({
  providedIn: 'root'
})
export class ExpensesService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  addCategory(model: any) {
    return this.http.post(this.baseUrl + 'expenses/add-expense-category', model);
  }

  getCategories() {
    return this.http.get<Category>(this.baseUrl + 'users/get-categories');
  }

  getClosedCategories() {
    return this.http.get<Category>(this.baseUrl + 'users/get-closed-categories');
  }

  removeCategory(categoryId: number) {
    return this.http.post(this.baseUrl + 'expenses/remove-category/' + categoryId, {});
  }

  updateCategoryName(category: any) {
    return this.http.put(this.baseUrl + 'expenses/update-category-name/' + category.id, category, {});
  }

  addExpense(model: any) {
    return this.http.post(this.baseUrl + 'expenses/add-expense-amount', model);
  }

  removeExpense(expenseId: any) {
    return this.http.post(this.baseUrl + 'expenses/remove-expense/' + expenseId, {});
  }

  getCategoryExpenses(categoryId: number) {
    return this.http.get<Category>(this.baseUrl + 'users/get-expenses/' + categoryId, {});
  }

  addContributor(model: any) {
    return this.http.post(this.baseUrl + 'expenses/add-contributor', model);
  }

  removeContributor(contributorId: number) {
    return this.http.post(this.baseUrl + 'expenses/remove-contributor/' + contributorId, {});
  }

  updateContributor(contributor: any) {
    return this.http.put(this.baseUrl + 'expenses/update-contributor/' + contributor.id, contributor, {});
  }

  getCategoryContributors(categoryId: number) {
    return this.http.get<Contributor>(this.baseUrl + 'users/get-contributors/' + categoryId, {});
  }

  getUserPhoto(email: string) {
    return this.http.get<any>(this.baseUrl + 'users/get-user-photo/' + email, {});
  }

  getUserExpenses(categoryId: number, username: string) {
    return this.http.get<Expense>(this.baseUrl + 'users/get-user-expenses/' + categoryId + '/' + username, {});
  }

  getExpenses(categoryId: number) {
    return this.http.get<Expense>(this.baseUrl + 'users/get-category-expenses/' + categoryId, {});
  }

  getCategoryExpensesSum(categoryId: number) {
    return this.http.get<Expense>(this.baseUrl + 'users/get-category-expenses-sum/' + categoryId, {});
  }

  getUserExpensesSum(categoryId: number, username: string) {
    return this.http.get<Expense>(this.baseUrl + 'users/get-user-expenses-sum/' + categoryId + '/' + username, {});
  }

  addSpending(model: any) {
    return this.http.post(this.baseUrl + 'expenses/add-spending', model);
  }

  getUserSpendings(id: number, username: string) {
    return this.http.get<Spending>(this.baseUrl + 'users/get-user-spendings/' + id + '/' + username, {});
  }

  getUserSpendingsSum(id: number, username: string) {
    return this.http.get<Spending>(this.baseUrl + 'users/get-user-spendings-sum/' + id + '/' + username, {});
  }

  getExpenseSpendings(expenseId: number) {
    return this.http.get<Spending>(this.baseUrl + 'users/get-expense-spendings/' + expenseId, {});
  }

  removeSpending(spendingId: number) {
    return this.http.post(this.baseUrl + 'expenses/remove-spending/' + spendingId, {});
  }

  updateSpendingAmount(spending: any, spendingAmount: any) {
    return this.http.put(this.baseUrl + 'expenses/update-spending-amount/' + spending.id + '/' + spendingAmount, {});
  }

  checkIfContributorsAvailable(categoryId: number, expenseId: number) {
    return this.http.get<Contributor>(this.baseUrl + 'users/check-if-contributors-available/' + categoryId + '/' + expenseId, {});
  }

  getExpenseSpendingsSum(expenseId: number) {
    return this.http.get<Spending>(this.baseUrl + 'users/get-expense-spendings-sum/' + expenseId, {});
  }

  getDebtsSum(categoryId: number, whoPaid, whoOwes) {
    return this.http.get<Spending>(this.baseUrl + 'users/who-owes-who/' + categoryId + '/' + whoPaid + '/' + whoOwes, {});
  }

  closeCategory(category: any) {
    return this.http.put(this.baseUrl + 'expenses/close-category/' + category.id, {});
  }

  addCategoryPhoto(model: any, categoryId: number) {
    return this.http.post(this.baseUrl + 'users/add-category-photo/' + categoryId, model);
  }

  deletePhoto(photoId: number) {
    return this.http.delete(this.baseUrl + 'users/delete-photo/' + photoId);
  }
}
