import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { getTasks, getExpenses, getCalendarEvents } from '@/lib/storage';
import { CheckSquare, DollarSign, Calendar, TrendingUp } from 'lucide-react';

export default function Dashboard() {
  const tasks = getTasks();
  const expenses = getExpenses();
  const events = getCalendarEvents();

  const completedTasks = tasks.filter(t => t.status === 'completed').length;
  const pendingTasks = tasks.filter(t => t.status === 'pending').length;
  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);
  const upcomingEvents = events.filter(e => new Date(e.date) > new Date()).length;

  const stats = [
    {
      title: 'Pending Tasks',
      value: pendingTasks,
      description: `${completedTasks} completed`,
      icon: CheckSquare,
      color: 'text-primary',
    },
    {
      title: 'Total Expenses',
      value: `$${totalExpenses.toFixed(2)}`,
      description: 'This month',
      icon: DollarSign,
      color: 'text-accent',
    },
    {
      title: 'Upcoming Events',
      value: upcomingEvents,
      description: 'Next 30 days',
      icon: Calendar,
      color: 'text-secondary',
    },
    {
      title: 'Family Members',
      value: '4',
      description: 'Active members',
      icon: TrendingUp,
      color: 'text-primary',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">
          Overview of your family's activities and finances
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Tasks</CardTitle>
            <CardDescription>Your latest family tasks</CardDescription>
          </CardHeader>
          <CardContent>
            {tasks.slice(0, 5).length > 0 ? (
              <div className="space-y-3">
                {tasks.slice(0, 5).map((task) => (
                  <div key={task.id} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{task.title}</p>
                      <p className="text-sm text-muted-foreground">{task.category}</p>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded ${
                      task.status === 'completed' ? 'bg-primary/20 text-primary' : 'bg-muted'
                    }`}>
                      {task.status}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-sm">No tasks yet. Create one to get started!</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Expenses</CardTitle>
            <CardDescription>Latest family expenses</CardDescription>
          </CardHeader>
          <CardContent>
            {expenses.slice(0, 5).length > 0 ? (
              <div className="space-y-3">
                {expenses.slice(0, 5).map((expense) => (
                  <div key={expense.id} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{expense.description}</p>
                      <p className="text-sm text-muted-foreground">{expense.category}</p>
                    </div>
                    <span className="font-semibold text-accent">${expense.amount.toFixed(2)}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-sm">No expenses yet. Add one to start tracking!</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
