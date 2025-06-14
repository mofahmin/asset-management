import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, Plus, Users } from "lucide-react"

export function UpcomingEvents() {
  const events = [
    {
      id: "event-1",
      title: "Meeting with Acme Corp",
      date: "Today",
      time: "2:00 PM - 3:00 PM",
      type: "Meeting",
      attendees: ["JD", "JS"],
      related: "Acme Corporation",
      relatedPath: "/accounts/acc-1",
    },
    {
      id: "event-2",
      title: "Call with Jane Smith",
      date: "Tomorrow",
      time: "10:00 AM - 10:30 AM",
      type: "Call",
      attendees: ["JD"],
      related: "Jane Smith",
      relatedPath: "/contacts/con-1",
    },
    {
      id: "event-3",
      title: "Project Kickoff",
      date: "Mar 12",
      time: "1:00 PM - 2:30 PM",
      type: "Meeting",
      attendees: ["JD", "JS", "JD"],
      related: "Website Redesign",
      relatedPath: "/projects/proj-1",
    },
  ]

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold">Upcoming Events</h3>
        <Button size="sm" variant="outline">
          <Plus className="h-4 w-4 mr-2" />
          New Event
        </Button>
      </div>
      <div className="space-y-4">
        {events.map((event) => (
          <div key={event.id} className="flex flex-col gap-2 p-3 rounded-md hover:bg-muted">
            <div className="flex items-start justify-between">
              <div>
                <h4 className="font-medium">{event.title}</h4>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                  <Calendar className="h-3 w-3" />
                  <span>{event.date}</span>
                  <Clock className="h-3 w-3 ml-2" />
                  <span>{event.time}</span>
                </div>
              </div>
              <Badge variant="outline">{event.type}</Badge>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground">
                Related to:{" "}
                <a href={event.relatedPath} className="hover:underline">
                  {event.related}
                </a>
              </span>
              <div className="flex items-center gap-1">
                <Users className="h-3 w-3 text-muted-foreground" />
                <div className="flex -space-x-2">
                  {event.attendees.map((attendee, i) => (
                    <Avatar key={i} className="h-6 w-6 border-2 border-background">
                      <AvatarFallback className="text-xs">{attendee}</AvatarFallback>
                    </Avatar>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

