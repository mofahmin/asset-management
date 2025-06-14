import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Calendar, Plus } from "lucide-react"

export function TasksList() {
  const tasks = [
    {
      id: "task-1",
      title: "Follow up with Acme Corp",
      dueDate: "Today",
      priority: "High",
      related: "Acme Corporation",
      relatedPath: "/accounts/acc-1",
      assignee: "JD",
      completed: false,
    },
    {
      id: "task-2",
      title: "Prepare proposal for Globex",
      dueDate: "Tomorrow",
      priority: "Medium",
      related: "Globex Inc",
      relatedPath: "/accounts/acc-2",
      assignee: "JD",
      completed: false,
    },
    {
      id: "task-3",
      title: "Call Jane Smith about project timeline",
      dueDate: "Mar 12",
      priority: "Medium",
      related: "Jane Smith",
      relatedPath: "/contacts/con-1",
      assignee: "JD",
      completed: false,
    },
    {
      id: "task-4",
      title: "Send contract to John Doe",
      dueDate: "Mar 15",
      priority: "Low",
      related: "John Doe",
      relatedPath: "/contacts/con-2",
      assignee: "JD",
      completed: true,
    },
  ]

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold">My Tasks</h3>
        <Button size="sm" variant="outline">
          <Plus className="h-4 w-4 mr-2" />
          New Task
        </Button>
      </div>
      <div className="space-y-4">
        {tasks.map((task) => (
          <div
            key={task.id}
            className={`flex items-start gap-4 p-3 rounded-md ${task.completed ? "bg-muted/50" : "hover:bg-muted"}`}
          >
            <Checkbox checked={task.completed} className="mt-1" />
            <div className="flex-1 space-y-1">
              <p className={`font-medium ${task.completed ? "line-through text-muted-foreground" : ""}`}>
                {task.title}
              </p>
              <div className="flex flex-wrap gap-2 text-sm">
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Calendar className="h-3 w-3" />
                  {task.dueDate}
                </div>
                <Badge
                  variant={
                    task.priority === "High" ? "destructive" : task.priority === "Medium" ? "default" : "outline"
                  }
                >
                  {task.priority}
                </Badge>
                <span className="text-muted-foreground">
                  Related to:{" "}
                  <a href={task.relatedPath} className="hover:underline">
                    {task.related}
                  </a>
                </span>
              </div>
            </div>
            <Avatar className="h-8 w-8">
              <AvatarFallback className="text-xs">{task.assignee}</AvatarFallback>
            </Avatar>
          </div>
        ))}
      </div>
    </div>
  )
}

