import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getGroceryItems, saveGroceryItems, getMealPlans, saveMealPlans } from '@/lib/storage';
import { getCurrentUser } from '@/lib/auth';
import { GroceryItem, MealPlan } from '@/types';
import { Plus, ShoppingCart, Utensils } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

export default function Meals() {
  const [groceryItems, setGroceryItems] = useState<GroceryItem[]>([]);
  const [mealPlans, setMealPlans] = useState<MealPlan[]>([]);
  const [groceryOpen, setGroceryOpen] = useState(false);
  const [mealOpen, setMealOpen] = useState(false);
  const user = getCurrentUser();

  useEffect(() => {
    setGroceryItems(getGroceryItems());
    setMealPlans(getMealPlans());
  }, []);

  const [groceryForm, setGroceryForm] = useState({
    name: '',
    quantity: '1',
    category: '',
  });

  const [mealForm, setMealForm] = useState({
    date: '',
    mealType: 'dinner' as MealPlan['mealType'],
    recipe: '',
    ingredients: '',
  });

  const handleGrocerySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newItem: GroceryItem = {
      id: Date.now().toString(),
      name: groceryForm.name,
      quantity: parseInt(groceryForm.quantity),
      category: groceryForm.category,
      checked: false,
      addedBy: user?.name || '',
    };

    const updatedItems = [...groceryItems, newItem];
    setGroceryItems(updatedItems);
    saveGroceryItems(updatedItems);
    
    toast({
      title: 'Item added',
      description: `${newItem.name} added to grocery list`,
    });

    setGroceryOpen(false);
    setGroceryForm({
      name: '',
      quantity: '1',
      category: '',
    });
  };

  const handleMealSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newMeal: MealPlan = {
      id: Date.now().toString(),
      date: mealForm.date,
      mealType: mealForm.mealType,
      recipe: mealForm.recipe,
      ingredients: mealForm.ingredients.split(',').map(i => i.trim()),
    };

    const updatedMeals = [...mealPlans, newMeal];
    setMealPlans(updatedMeals);
    saveMealPlans(updatedMeals);
    
    toast({
      title: 'Meal planned',
      description: `${newMeal.recipe} added to meal plan`,
    });

    setMealOpen(false);
    setMealForm({
      date: '',
      mealType: 'dinner',
      recipe: '',
      ingredients: '',
    });
  };

  const toggleGroceryItem = (id: string) => {
    const updatedItems = groceryItems.map(item =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setGroceryItems(updatedItems);
    saveGroceryItems(updatedItems);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Meal Planning</h2>
        <p className="text-muted-foreground">Plan meals and manage grocery shopping</p>
      </div>

      <Tabs defaultValue="grocery">
        <TabsList>
          <TabsTrigger value="grocery">Grocery List</TabsTrigger>
          <TabsTrigger value="meals">Meal Plans</TabsTrigger>
        </TabsList>

        <TabsContent value="grocery" className="space-y-4">
          <div className="flex justify-end">
            <Dialog open={groceryOpen} onOpenChange={setGroceryOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Item
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add Grocery Item</DialogTitle>
                  <DialogDescription>Add an item to your shopping list</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleGrocerySubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Item Name</Label>
                    <Input
                      id="name"
                      value={groceryForm.name}
                      onChange={(e) => setGroceryForm({ ...groceryForm, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="quantity">Quantity</Label>
                      <Input
                        id="quantity"
                        type="number"
                        min="1"
                        value={groceryForm.quantity}
                        onChange={(e) => setGroceryForm({ ...groceryForm, quantity: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="category">Category</Label>
                      <Input
                        id="category"
                        value={groceryForm.category}
                        onChange={(e) => setGroceryForm({ ...groceryForm, category: e.target.value })}
                        placeholder="e.g., Produce"
                      />
                    </div>
                  </div>
                  <Button type="submit" className="w-full">Add Item</Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid gap-4">
            {groceryItems.length > 0 ? (
              groceryItems.map((item) => (
                <Card key={item.id}>
                  <CardContent className="py-4">
                    <div className="flex items-center gap-4">
                      <Checkbox
                        checked={item.checked}
                        onCheckedChange={() => toggleGroceryItem(item.id)}
                      />
                      <ShoppingCart className="h-5 w-5 text-muted-foreground" />
                      <div className="flex-1">
                        <p className={`font-medium ${item.checked ? 'line-through text-muted-foreground' : ''}`}>
                          {item.name}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Qty: {item.quantity} • {item.category}
                        </p>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        Added by {item.addedBy}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card>
                <CardContent className="py-12 text-center">
                  <p className="text-muted-foreground">No items in grocery list</p>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="meals" className="space-y-4">
          <div className="flex justify-end">
            <Dialog open={mealOpen} onOpenChange={setMealOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Plan Meal
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Plan a Meal</DialogTitle>
                  <DialogDescription>Add a meal to your family plan</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleMealSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="recipe">Recipe/Meal Name</Label>
                    <Input
                      id="recipe"
                      value={mealForm.recipe}
                      onChange={(e) => setMealForm({ ...mealForm, recipe: e.target.value })}
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="date">Date</Label>
                      <Input
                        id="date"
                        type="date"
                        value={mealForm.date}
                        onChange={(e) => setMealForm({ ...mealForm, date: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="mealType">Meal Type</Label>
                      <select
                        id="mealType"
                        value={mealForm.mealType}
                        onChange={(e) => setMealForm({ ...mealForm, mealType: e.target.value as MealPlan['mealType'] })}
                        className="w-full h-10 px-3 rounded-md border border-input bg-background"
                        required
                      >
                        <option value="breakfast">Breakfast</option>
                        <option value="lunch">Lunch</option>
                        <option value="dinner">Dinner</option>
                        <option value="snack">Snack</option>
                      </select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="ingredients">Ingredients (comma-separated)</Label>
                    <Input
                      id="ingredients"
                      value={mealForm.ingredients}
                      onChange={(e) => setMealForm({ ...mealForm, ingredients: e.target.value })}
                      placeholder="chicken, rice, broccoli"
                    />
                  </div>
                  <Button type="submit" className="w-full">Plan Meal</Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid gap-4">
            {mealPlans.length > 0 ? (
              mealPlans
                .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                .map((meal) => (
                  <Card key={meal.id}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3">
                          <Utensils className="h-5 w-5 text-primary mt-1" />
                          <div>
                            <CardTitle className="text-lg">{meal.recipe}</CardTitle>
                            <CardDescription>
                              {new Date(meal.date).toLocaleDateString()} • {meal.mealType}
                            </CardDescription>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    {meal.ingredients.length > 0 && (
                      <CardContent>
                        <p className="text-sm text-muted-foreground">
                          Ingredients: {meal.ingredients.join(', ')}
                        </p>
                      </CardContent>
                    )}
                  </Card>
                ))
            ) : (
              <Card>
                <CardContent className="py-12 text-center">
                  <p className="text-muted-foreground">No meals planned yet</p>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
