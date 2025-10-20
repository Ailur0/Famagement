import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { getCalendarEvents, saveCalendarEvents } from '@/lib/storage';
import { CalendarEvent } from '@/types';
import { Plus, Calendar as CalendarIcon } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

export default function CalendarPage() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setEvents(getCalendarEvents());
  }, []);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    endDate: '',
    attendees: '',
    color: '#3b82f6',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newEvent: CalendarEvent = {
      id: Date.now().toString(),
      title: formData.title,
      description: formData.description,
      date: formData.date,
      endDate: formData.endDate || undefined,
      attendees: formData.attendees.split(',').map(a => a.trim()),
      color: formData.color,
      recurring: false,
      createdAt: new Date().toISOString(),
    };

    const updatedEvents = [...events, newEvent];
    setEvents(updatedEvents);
    saveCalendarEvents(updatedEvents);
    
    toast({
      title: 'Event created',
      description: `${newEvent.title} has been added to the calendar`,
    });

    setOpen(false);
    setFormData({
      title: '',
      description: '',
      date: '',
      endDate: '',
      attendees: '',
      color: '#3b82f6',
    });
  };

  const upcomingEvents = events
    .filter(e => new Date(e.date) >= new Date())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const pastEvents = events
    .filter(e => new Date(e.date) < new Date())
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Family Calendar</h2>
          <p className="text-muted-foreground">Manage family events and activities</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Event
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Event</DialogTitle>
              <DialogDescription>Add a new family event or activity</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Event Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date">Start Date</Label>
                  <Input
                    id="date"
                    type="datetime-local"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endDate">End Date (Optional)</Label>
                  <Input
                    id="endDate"
                    type="datetime-local"
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="attendees">Attendees (comma-separated)</Label>
                <Input
                  id="attendees"
                  value={formData.attendees}
                  onChange={(e) => setFormData({ ...formData, attendees: e.target.value })}
                  placeholder="Mom, Dad, Emma"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="color">Color</Label>
                <Input
                  id="color"
                  type="color"
                  value={formData.color}
                  onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                />
              </div>
              <Button type="submit" className="w-full">Create Event</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-semibold mb-4">Upcoming Events</h3>
          <div className="grid gap-4">
            {upcomingEvents.length > 0 ? (
              upcomingEvents.map((event) => (
                <Card key={event.id} className="border-l-4" style={{ borderLeftColor: event.color }}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{event.title}</CardTitle>
                        <CardDescription>{event.description}</CardDescription>
                      </div>
                      <CalendarIcon className="h-5 w-5 text-muted-foreground" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <span className="text-muted-foreground">📅</span>
                        <span>{new Date(event.date).toLocaleString()}</span>
                      </div>
                      {event.endDate && (
                        <div className="flex items-center gap-2">
                          <span className="text-muted-foreground">⏰</span>
                          <span>Until {new Date(event.endDate).toLocaleString()}</span>
                        </div>
                      )}
                      {event.attendees.length > 0 && (
                        <div className="flex items-center gap-2">
                          <span className="text-muted-foreground">👥</span>
                          <span>{event.attendees.join(', ')}</span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card>
                <CardContent className="py-12 text-center">
                  <p className="text-muted-foreground">No upcoming events</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {pastEvents.length > 0 && (
          <div>
            <h3 className="text-xl font-semibold mb-4">Past Events</h3>
            <div className="grid gap-4">
              {pastEvents.slice(0, 5).map((event) => (
                <Card key={event.id} className="border-l-4 opacity-60" style={{ borderLeftColor: event.color }}>
                  <CardHeader>
                    <CardTitle className="text-lg">{event.title}</CardTitle>
                    <CardDescription>
                      {new Date(event.date).toLocaleDateString()}
                    </CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
