import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Building2, Calendar, User } from "lucide-react"
import Link from "next/link"

export function RecentRecords() {
  const recentRecords = [
    {
      id: "acc-1",
      type: "account",
      name: "Acme Corporation",
      updatedAt: "2 hours ago",
      path: "/accounts/acc-1",
      icon: <Building2 className="h-4 w-4" />,
      initials: "AC",
    },
    {
      id: "con-1",
      type: "contact",
      name: "Jane Smith",
      updatedAt: "3 hours ago",
      path: "/contacts/con-1",
      icon: <User className="h-4 w-4" />,
      initials: "JS",
    },
    {
      id: "proj-1",
      type: "project",
      name: "Website Redesign",
      updatedAt: "5 hours ago",
      path: "/projects/proj-1",
      icon: <Calendar className="h-4 w-4" />,
      initials: "WR",
    },
    {
      id: "acc-2",
      type: "account",
      name: "Globex Inc",
      updatedAt: "1 day ago",
      path: "/accounts/acc-2",
      icon: <Building2 className="h-4 w-4" />,
      initials: "GI",
    },
    {
      id: "con-2",
      type: "contact",
      name: "John Doe",
      updatedAt: "1 day ago",
      path: "/contacts/con-2",
      icon: <User className="h-4 w-4" />,
      initials: "JD",
    },
  ]

  return (
    <div className="p-4">
      <div className="space-y-4">
        {recentRecords.map((record) => (
          <Link key={record.id} href={record.path} className="flex items-center gap-4 p-3 rounded-md hover:bg-muted">
            <Avatar className="h-10 w-10">
              <AvatarFallback>{record.initials}</AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-1">
              <div className="flex items-center gap-2">
                {record.icon}
                <span className="text-sm text-muted-foreground capitalize">{record.type}</span>
              </div>
              <p className="font-medium">{record.name}</p>
            </div>
            <div className="text-sm text-muted-foreground">{record.updatedAt}</div>
          </Link>
        ))}
      </div>
    </div>
  )
}

