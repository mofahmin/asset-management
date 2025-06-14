import { Building2, User, Calendar, ListTodo, type Icon } from "lucide-react"

export function getIconForEntity(entityName: string | undefined): Icon {
  if (!entityName) {
    return Building2 // Default icon if entityName is undefined
  }

  switch (entityName.toLowerCase()) {
    case "account":
      return Building2
    case "contact":
      return User
    case "project":
      return ListTodo
    case "opportunity":
      return Calendar
    default:
      return Building2
  }
}

