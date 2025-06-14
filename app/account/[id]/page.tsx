"use client"

import { useState } from "react"
import { CompactLayout } from "@/components/record/compact-layout"
import { RecordPath } from "@/components/record/record-path"
import { DetailTabs } from "@/components/record/detail-tabs"
import { Activities } from "@/components/record/activities"
import { RelatedList } from "@/components/record/related-list"
import { useToast } from "@/hooks/use-toast"

export default function AccountPage({ params }: { params: { id: string } }) {
  const { toast } = useToast()
  const [account, setAccount] = useState({
    id: params.id,
    name: "Masjid Al-Falah",
    type: "Masjid",
    industry: "Technology",
    phone: "(555) 123-4567",
    website: "www.acmecorp.com",
    owner: "John Doe",
    status: "Active",
    billingAddress: "123 Main St, San Francisco, CA 94105",
    shippingAddress: "123 Main St, San Francisco, CA 94105",
    description:
      "Acme Corporation is a leading technology company specializing in innovative solutions for businesses.",
    annualRevenue: "$10,000,000",
    employees: "500",
    founded: "2005",
    createdBy: "John Doe",
    createdDateTime: "Mar 10, 2023 • 2:00 PM",
    lastModifiedBy: "John Doe",
    lastModifiedDateTime: "Mar 10, 2023 • 2:00 PM",
  })

  const [currentStage, setCurrentStage] = useState("prospecting")

  const stages = [
    {
      id: "prospecting",
      name: "Prospecting",
      completed: true,
      guidance: "Identify potential customers and gather initial information about their needs and challenges.",
    },
    {
      id: "qualification",
      name: "Qualification",
      completed: true,
      guidance:
        "Determine if the prospect is a good fit for your products or services and if they have the budget and authority to make a purchase.",
    },
    {
      id: "needs-analysis",
      name: "Needs Analysis",
      completed: false,
      guidance:
        "Conduct a thorough assessment of the prospect's needs, pain points, and goals to tailor your solution accordingly.",
    },
    {
      id: "proposal",
      name: "Proposal",
      completed: false,
      guidance:
        "Prepare and present a compelling proposal that addresses the prospect's specific needs and demonstrates the value of your solution.",
    },
    {
      id: "negotiation",
      name: "Negotiation",
      completed: false,
      guidance:
        "Address any concerns, objections, or requests for modifications to reach a mutually beneficial agreement.",
    },
    {
      id: "closed",
      name: "Closed",
      completed: false,
      guidance:
        "Finalize the deal, ensure all paperwork is completed, and begin the onboarding process for the new customer.",
    },
  ]

  const compactFields = [
    { label: "Phone", value: account.phone },
    { label: "Website", value: account.website },
    { label: "Industry", value: account.industry },
    { label: "Type", value: account.type },
    {
      label: "Status",
      value: account.status,
      badge: true,
      badgeVariant: account.status === "Active" ? "default" : "secondary",
    },
    { label: "Owner", value: account.owner },
    { label: "Annual Revenue", value: account.annualRevenue },
    { label: "Employees", value: account.employees },
  ]

  const detailTabs = [
    {
      id: "details",
      label: "Details",
      sections: [
        {
          id: "account-information",
          title: "Account Information",
          fields: [
            { label: "Account Name", value: account.name },
            { label: "Type", value: account.type },
            { label: "Industry", value: account.industry },
            { label: "Phone", value: account.phone },
            { label: "Website", value: account.website },
            { label: "Employees", value: account.employees },
            { label: "Annual Revenue", value: account.annualRevenue },
            { label: "Founded", value: account.founded },
          ],
        },
        {
          id: "address-information",
          title: "Address Information",
          fields: [
            { label: "Billing Address", value: account.billingAddress },
            { label: "Shipping Address", value: account.shippingAddress },
          ],
        },
        {
          id: "description-information",
          title: "Description Information",
          fields: [{ label: "Description", value: account.description }],
        },
        {
          id: "system-information",
          title: "System Information",
          fields: [
            { label: "Created By", value: account.createdBy },
            { label: "Created DateTime", value: account.createdDateTime },
            { label: "Last Modified By", value: account.lastModifiedBy },
            { label: "Last Modified DateTime", value: account.lastModifiedDateTime },
          ],
        },
      ],
    },
    {
      id: "related",
      label: "Related",
      sections: [
        {
          id: "related-contacts",
          title: "Related Contacts",
          fields: [],
        },
        {
          id: "related-opportunities",
          title: "Related Opportunities",
          fields: [],
        },
      ],
    },
  ]

  const contacts = [
    {
      id: "con-1",
      name: "Jane Smith",
      path: "/contacts/con-1",
      fields: {
        name: "Jane Smith",
        title: "CEO",
        email: "jane@acmecorp.com",
        phone: "(555) 123-4567",
      },
    },
    {
      id: "con-2",
      name: "John Doe",
      path: "/contacts/con-2",
      fields: {
        name: "John Doe",
        title: "CTO",
        email: "john@acmecorp.com",
        phone: "(555) 987-6543",
      },
    },
    {
      id: "con-3",
      name: "Alice Johnson",
      path: "/contacts/con-3",
      fields: {
        name: "Alice Johnson",
        title: "Marketing Director",
        email: "alice@acmecorp.com",
        phone: "(555) 456-7890",
      },
    },
    {
      id: "con-4",
      name: "Bob Williams",
      path: "/contacts/con-4",
      fields: {
        name: "Bob Williams",
        title: "Sales Manager",
        email: "bob@acmecorp.com",
        phone: "(555) 789-0123",
      },
    },
  ]

  const projects = [
    {
      id: "proj-1",
      name: "Website Redesign",
      path: "/projects/proj-1",
      fields: {
        name: "Website Redesign",
        status: "In Progress",
        dueDate: "Apr 15, 2023",
        owner: "John Doe",
      },
    },
    {
      id: "proj-2",
      name: "Mobile App Development",
      path: "/projects/proj-2",
      fields: {
        name: "Mobile App Development",
        status: "Planning",
        dueDate: "Jun 30, 2023",
        owner: "Jane Smith",
      },
    },
  ]

  const handleStageComplete = (stageId: string) => {
    const stageIndex = stages.findIndex((s) => s.id === stageId)
    if (stageIndex !== -1 && stageIndex < stages.length - 1) {
      setCurrentStage(stages[stageIndex + 1].id)
      toast({
        title: "Stage Completed",
        description: `Moved to ${stages[stageIndex + 1].name} stage`,
        variant: "success",
      })
    }
  }

  const handleStageSelect = (stageId: string) => {
    setCurrentStage(stageId)
  }

  return (
    <div className="flex flex-col gap-6 p-4 md:p-8">
      <CompactLayout
        title={account.name}
        subtitle={account.industry}
        entityName="Account"
        fields={compactFields}
        onEdit={() => console.log("Edit account")}
        onDelete={() => console.log("Delete account")}
      />

      {/* <RecordPath
        stages={stages}
        currentStage={currentStage}
        onStageComplete={handleStageComplete}
        onStageSelect={handleStageSelect}
      /> */}



      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: DetailTabs (2 columns wide on large screens) */}
        <div className="lg:col-span-2">
          <DetailTabs tabs={detailTabs} />
        </div>
        {/* Right: RelatedLists (stacked vertically, 1 column wide) */}
        <div className="flex flex-col gap-6">
          <RelatedList
        title="Contacts (4)"
        entityName="Contact"
        items={contacts}
        columns={[
          { key: "name", label: "Name" },
          { key: "title", label: "Title" },
          { key: "email", label: "Email" },
        ]}
        onNew={() => console.log("New contact")}
          />
          <RelatedList
        title="Projects (2)"
        entityName="Project"
        items={projects}
        columns={[
          { key: "name", label: "Name" },
          { key: "status", label: "Status" },
          { key: "dueDate", label: "Due Date" },
        ]}
        onNew={() => console.log("New project")}
          />
        </div>
      </div>
            <Activities />
    </div>
  )
}

