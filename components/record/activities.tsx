"use client"

import { useState } from "react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, MessageSquare, Phone, Plus } from "lucide-react"

export function Activities() {
  const [activeTab, setActiveTab] = useState("all")

  const activities = [
    {
      id: "act-1",
      type: "call",
      title: "Call with Jane Smith",
      date: "Mar 10, 2023",
      time: "2:00 PM",
      user: "JD",
      description: "Discussed project timeline and next steps",
      icon: <Phone className="h-4 w-4" />,
    },
    {
      id: "act-2",
      type: "meeting",
      title: "Meeting with Acme Corp",
      date: "Mar 8, 2023",
      time: "10:00 AM",
      user: "JD",
      description: "Presented proposal and discussed requirements",
      icon: <Calendar className="h-4 w-4" />,
    },
    {
      id: "act-3",
      type: "note",
      title: "Note about Website Redesign",
      date: "Mar 5, 2023",
      time: "3:30 PM",
      user: "JD",
      description: "Client requested additional features for the homepage",
      icon: <MessageSquare className="h-4 w-4" />,
    },
  ]

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-md font-medium">Activities</CardTitle>
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => {
              // Show log call form
              alert("Log a Call form would appear here")
            }}
          >
            <Plus className="h-4 w-4 mr-2" />
            Log a Call
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => {
              // Show new task form
              alert("New Task form would appear here")
            }}
          >
            <Plus className="h-4 w-4 mr-2" />
            New Task
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => {
              // Show new event form
              alert("New Event form would appear here")
            }}
          >
            <Plus className="h-4 w-4 mr-2" />
            New Event
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full justify-start mb-4">
            <TabsTrigger value="all">All Activities</TabsTrigger>
            <TabsTrigger value="calls">Calls</TabsTrigger>
            <TabsTrigger value="meetings">Meetings</TabsTrigger>
            <TabsTrigger value="notes">Notes</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="space-y-4">
            {activities.map((activity) => (
              <div key={activity.id} className="flex gap-4 p-3 hover:bg-muted rounded-md">
                <Avatar className="h-10 w-10">
                  <AvatarFallback>{activity.user}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    {activity.icon}
                    <span className="font-medium">{activity.title}</span>
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">
                    {activity.date} • {activity.time}
                  </div>
                  <p className="text-sm mt-2">{activity.description}</p>
                </div>
              </div>
            ))}
          </TabsContent>
          <TabsContent value="calls" className="space-y-4">
            {activities
              .filter((a) => a.type === "call")
              .map((activity) => (
                <div key={activity.id} className="flex gap-4 p-3 hover:bg-muted rounded-md">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback>{activity.user}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      {activity.icon}
                      <span className="font-medium">{activity.title}</span>
                    </div>
                    <div className="text-sm text-muted-foreground mt-1">
                      {activity.date} • {activity.time}
                    </div>
                    <p className="text-sm mt-2">{activity.description}</p>
                  </div>
                </div>
              ))}
          </TabsContent>
          <TabsContent value="meetings" className="space-y-4">
            {activities
              .filter((a) => a.type === "meeting")
              .map((activity) => (
                <div key={activity.id} className="flex gap-4 p-3 hover:bg-muted rounded-md">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback>{activity.user}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      {activity.icon}
                      <span className="font-medium">{activity.title}</span>
                    </div>
                    <div className="text-sm text-muted-foreground mt-1">
                      {activity.date} • {activity.time}
                    </div>
                    <p className="text-sm mt-2">{activity.description}</p>
                  </div>
                </div>
              ))}
          </TabsContent>
          <TabsContent value="notes" className="space-y-4">
            {activities
              .filter((a) => a.type === "note")
              .map((activity) => (
                <div key={activity.id} className="flex gap-4 p-3 hover:bg-muted rounded-md">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback>{activity.user}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      {activity.icon}
                      <span className="font-medium">{activity.title}</span>
                    </div>
                    <div className="text-sm text-muted-foreground mt-1">
                      {activity.date} • {activity.time}
                    </div>
                    <p className="text-sm mt-2">{activity.description}</p>
                  </div>
                </div>
              ))}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

