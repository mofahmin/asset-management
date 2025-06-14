"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { ListViewHeader } from "@/components/layout/list-view-header"
import { ListViewBody } from "@/components/layout/list-view-body"
import { Moon, ChevronDown, ChevronUp, Edit, MoreHorizontal, Plus, Trash, Building } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { useMobile } from "@/hooks/use-mobile"
import { PullToRefresh } from "@/components/pull-to-refresh"
import { FloatingActionButton } from "@/components/ui/floating-action-button"
import { useToast } from "@/hooks/use-toast"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useRouter } from "next/navigation"

export default function AccountPage() {
  const isMobile = useMobile()
  const { toast } = useToast()
  const router = useRouter()
  const [searchValue, setSearchValue] = useState("")
  const [accounts, setAccounts] = useState([
    {
      id: "acc-1",
      name: "Masjid Al-Falah",
      type: "Masjid",
      industry: "Technology",
      phone: "(555) 123-4567",
      website: "www.acmecorp.com",
      owner: "John Doe",
      status: "Active",
    },
    {
      id: "acc-2",
      name: "Masjid Al-Nur",
      type: "Masjid",
      industry: "Manufacturing",
      phone: "(555) 987-6543",
      website: "www.globexinc.com",
      owner: "Jane Smith",
      status: "Active",
    },
    {
      id: "acc-3",
      name: "Masjid Al-Hidayah",
      type: "Masjid",
      industry: "Finance",
      phone: "(555) 456-7890",
      website: "www.initech.com",
      owner: "John Doe",
      status: "Inactive",
    },
    {
      id: "acc-4",
      name: "Surau Al-Muhtadin",
      type: "Surau",
      industry: "Healthcare",
      phone: "(555) 789-0123",
      website: "www.umbrellacorp.com",
      owner: "Jane Smith",
      status: "Active",
    },
    {
      id: "acc-5",
      name: "Surau Al-Mawaddah",
      type: "Surau",
      industry: "Technology",
      phone: "(555) 234-5678",
      website: "www.starkindustries.com",
      owner: "John Doe",
      status: "Active",
    },
  ])

  const columns = [
    {
      key: "name",
      label: "Name",
      sortable: true,
      searchable: true,
      render: (value, row) => (
        <Link href={`/account/${row.id}`} className="flex items-center gap-2 font-medium hover:underline">
          <Moon className="h-4 w-4" />
          {value}
        </Link>
      ),
    },
    {
      key: "type",
      label: "Type",
      sortable: true,
      editable: true,
      searchable: true,
    },
    {
      key: "industry",
      label: "Industry",
      sortable: true,
      editable: true,
      searchable: true,
    },
    {
      key: "phone",
      label: "Phone",
      editable: true,
      searchable: true,
    },
    {
      key: "website",
      label: "Website",
      editable: true,
      searchable: true,
    },
    {
      key: "owner",
      label: "Owner",
      sortable: true,
      editable: true,
      searchable: true,
    },
    {
      key: "status",
      label: "Status",
      sortable: true,
      searchable: true,
      render: (value) => <Badge variant={value === "Active" ? "default" : "secondary"}>{value}</Badge>,
    },
  ]

  const [isRefreshing, setIsRefreshing] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [accountToDelete, setAccountToDelete] = useState<string | null>(null)

  const handleRefresh = async () => {
    setIsRefreshing(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsRefreshing(false)
    toast({
      title: "Refreshed",
      description: "Account list has been updated",
      variant: "success",
    })
  }

  const handleCellEdit = async (id: string, field: string, value: string) => {
    try {
      // Update the local state
      setAccounts(accounts.map((account) => (account.id === id ? { ...account, [field]: value } : account)))

      // Here you would typically make an API call to update the server
      // await updateAccount(id, { [field]: value })

      toast({
        title: "Account updated",
        description: `${field} has been updated successfully`,
        variant: "success",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update account. Please try again.",
        variant: "destructive",
      })
      throw error // Re-throw to let the component handle the error state
    }
  }

  const handleNewAccount = () => {
    router.push("/account/new")
  }

  const confirmDelete = (id: string) => {
    setAccountToDelete(id)
    setDeleteDialogOpen(true)
  }

  const handleDelete = () => {
    if (accountToDelete) {
      setAccounts(accounts.filter((account) => account.id !== accountToDelete))
      setDeleteDialogOpen(false)
      setAccountToDelete(null)
      toast({
        title: "Account deleted",
        description: "The account has been successfully deleted",
        variant: "success",
      })
    }
  }

  const handleViewAccount = (account: any) => {
    router.push(`/account/${account.id}`)
  }
  const handleEditAccount = (account: any) => {
    router.push(`/account/${account.id}/edit`)
  }

  const actions = [
    {
      label: "View",
      onClick: handleViewAccount,
    },
    {
      label: "Delete",
      // icon: <Trash className="h-4 w-4" />,
      onClick: confirmDelete,
      variant: "ghost",
      className: "text-destructive",
    },
  ]

  // Desktop table view
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <ListViewHeader
            title="Organisasi"
            entityName="Organisasi"
            description="Urus semua aset masjid dan surau di sini"
            onNew={handleNewAccount}
            searchValue={searchValue}
            onSearchChange={setSearchValue}
            searchPlaceholder="Search Organisasi..."
          />
        </CardHeader>
        <CardContent>
          <ListViewBody
            data={accounts}
            columns={columns}
            actions={actions}
            onRowClick={handleViewAccount}
            onEdit={handleEditAccount}
            onNew={handleNewAccount}
            onRefresh={handleRefresh}
            onCellEdit={handleCellEdit}
            searchValue={searchValue}
            selectable={true}
            editable={true}
            // mobileCardRender={mobileCardRender}
            emptyMessage="No accounts found. Create your first account to get started."
          />
        </CardContent>
      </Card>
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the account and all associated data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

