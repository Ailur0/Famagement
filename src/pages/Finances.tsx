import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getExpenses, saveExpenses, getBudgets, saveBudgets } from '@/lib/storage';
import { getCurrentUser } from '@/lib/auth';
import { Expense, Budget } from '@/types';
import { Plus, TrendingUp, TrendingDown } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

export default function Finances() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [expenseOpen, setExpenseOpen] = useState(false);
  const [budgetOpen, setBudgetOpen] = useState(false);
  const user = getCurrentUser();

  useEffect(() => {
    setExpenses(getExpenses());
    setBudgets(getBudgets());
  }, []);

  const [expenseForm, setExpenseForm] = useState({
    amount: '',
    category: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
  });

  const [budgetForm, setBudgetForm] = useState({
    category: '',
    allocated: '',
    month: new Date().toISOString().slice(0, 7),
  });

  const handleExpenseSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newExpense: Expense = {
      id: Date.now().toString(),
      amount: parseFloat(expenseForm.amount),
      category: expenseForm.category,
      description: expenseForm.description,
      date: expenseForm.date,
      paidBy: user?.name || '',
      recurring: false,
      createdAt: new Date().toISOString(),
    };

    const updatedExpenses = [...expenses, newExpense];
    setExpenses(updatedExpenses);
    saveExpenses(updatedExpenses);
    
    // Update budget spent amount
    const budget = budgets.find(b => b.category === newExpense.category && b.month === budgetForm.month);
    if (budget) {
      const updatedBudgets = budgets.map(b =>
        b.id === budget.id ? { ...b, spent: b.spent + newExpense.amount } : b
      );
      setBudgets(updatedBudgets);
      saveBudgets(updatedBudgets);
    }
    
    toast({
      title: 'Expense added',
      description: `$${newExpense.amount} for ${newExpense.category}`,
    });

    setExpenseOpen(false);
    setExpenseForm({
      amount: '',
      category: '',
      description: '',
      date: new Date().toISOString().split('T')[0],
    });
  };

  const handleBudgetSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newBudget: Budget = {
      id: Date.now().toString(),
      category: budgetForm.category,
      allocated: parseFloat(budgetForm.allocated),
      spent: 0,
      month: budgetForm.month,
    };

    const updatedBudgets = [...budgets, newBudget];
    setBudgets(updatedBudgets);
    saveBudgets(updatedBudgets);
    
    toast({
      title: 'Budget created',
      description: `$${newBudget.allocated} allocated for ${newBudget.category}`,
    });

    setBudgetOpen(false);
    setBudgetForm({
      category: '',
      allocated: '',
      month: new Date().toISOString().slice(0, 7),
    });
  };

  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);
  const totalBudget = budgets.reduce((sum, b) => sum + b.allocated, 0);
  const totalSpent = budgets.reduce((sum, b) => sum + b.spent, 0);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Financial Management</h2>
        <p className="text-muted-foreground">Track expenses and manage family budget</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Budget
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">${totalBudget.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground mt-1">This month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Spent
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-accent">${totalSpent.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {totalBudget > 0 ? `${((totalSpent / totalBudget) * 100).toFixed(1)}% of budget` : 'No budget set'}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Remaining
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-3xl font-bold ${totalBudget - totalSpent >= 0 ? 'text-primary' : 'text-destructive'}`}>
              ${(totalBudget - totalSpent).toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {totalBudget - totalSpent >= 0 ? 'Under budget' : 'Over budget'}
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="expenses">
        <TabsList>
          <TabsTrigger value="expenses">Expenses</TabsTrigger>
          <TabsTrigger value="budgets">Budgets</TabsTrigger>
        </TabsList>

        <TabsContent value="expenses" className="space-y-4">
          <div className="flex justify-end">
            <Dialog open={expenseOpen} onOpenChange={setExpenseOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Expense
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add Expense</DialogTitle>
                  <DialogDescription>Record a new family expense</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleExpenseSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="amount">Amount</Label>
                    <Input
                      id="amount"
                      type="number"
                      step="0.01"
                      value={expenseForm.amount}
                      onChange={(e) => setExpenseForm({ ...expenseForm, amount: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Input
                      id="category"
                      value={expenseForm.category}
                      onChange={(e) => setExpenseForm({ ...expenseForm, category: e.target.value })}
                      placeholder="e.g., Groceries, Utilities"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={expenseForm.description}
                      onChange={(e) => setExpenseForm({ ...expenseForm, description: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="date">Date</Label>
                    <Input
                      id="date"
                      type="date"
                      value={expenseForm.date}
                      onChange={(e) => setExpenseForm({ ...expenseForm, date: e.target.value })}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full">Add Expense</Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid gap-4">
            {expenses.length > 0 ? (
              expenses.map((expense) => (
                <Card key={expense.id}>
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{expense.description}</CardTitle>
                        <CardDescription>{expense.category}</CardDescription>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-accent">${expense.amount.toFixed(2)}</div>
                        <p className="text-xs text-muted-foreground">{new Date(expense.date).toLocaleDateString()}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">Paid by {expense.paidBy}</p>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card>
                <CardContent className="py-12 text-center">
                  <p className="text-muted-foreground">No expenses recorded yet</p>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="budgets" className="space-y-4">
          <div className="flex justify-end">
            <Dialog open={budgetOpen} onOpenChange={setBudgetOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Budget
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create Budget</DialogTitle>
                  <DialogDescription>Set a budget for a category</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleBudgetSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="budgetCategory">Category</Label>
                    <Input
                      id="budgetCategory"
                      value={budgetForm.category}
                      onChange={(e) => setBudgetForm({ ...budgetForm, category: e.target.value })}
                      placeholder="e.g., Groceries, Entertainment"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="allocated">Budget Amount</Label>
                    <Input
                      id="allocated"
                      type="number"
                      step="0.01"
                      value={budgetForm.allocated}
                      onChange={(e) => setBudgetForm({ ...budgetForm, allocated: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="month">Month</Label>
                    <Input
                      id="month"
                      type="month"
                      value={budgetForm.month}
                      onChange={(e) => setBudgetForm({ ...budgetForm, month: e.target.value })}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full">Create Budget</Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid gap-4">
            {budgets.length > 0 ? (
              budgets.map((budget) => {
                const percentage = (budget.spent / budget.allocated) * 100;
                const isOverBudget = percentage > 100;
                
                return (
                  <Card key={budget.id}>
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg">{budget.category}</CardTitle>
                          <CardDescription>{budget.month}</CardDescription>
                        </div>
                        <div className="flex items-center gap-2">
                          {isOverBudget ? (
                            <TrendingDown className="h-5 w-5 text-destructive" />
                          ) : (
                            <TrendingUp className="h-5 w-5 text-primary" />
                          )}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Spent</span>
                        <span className="font-semibold">${budget.spent.toFixed(2)} / ${budget.allocated.toFixed(2)}</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className={`h-2 rounded-full transition-all ${
                            isOverBudget ? 'bg-destructive' : 'bg-primary'
                          }`}
                          style={{ width: `${Math.min(percentage, 100)}%` }}
                        />
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {percentage.toFixed(1)}% used • ${(budget.allocated - budget.spent).toFixed(2)} remaining
                      </p>
                    </CardContent>
                  </Card>
                );
              })
            ) : (
              <Card>
                <CardContent className="py-12 text-center">
                  <p className="text-muted-foreground">No budgets created yet</p>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
