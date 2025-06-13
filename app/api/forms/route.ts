import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { logAuditEvent } from "@/lib/audit-logger"

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get query parameters
    const { searchParams } = new URL(request.url)
    const search = searchParams.get("search") || ""
    const status = searchParams.get("status") || "all"
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "10")

    // Build filter
    const filter: any = {
      masjidId: session.user.masjidId,
    }

    if (search) {
      filter.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { formId: { contains: search, mode: "insensitive" } },
      ]
    }

    if (status && status !== "all") {
      filter.status = status
    }

    // In a real implementation, this would fetch from the database
    // For now, we'll return mock data
    const mockForms = [
      {
        id: "BR-AMS-001-2023-001",
        name: "BR-AMS 001",
        title: "Senarai Daftar Harta Modal",
        submittedBy: "Ahmad Bin Abdullah",
        submittedDate: "2023-05-15",
        status: "Diluluskan",
      },
      {
        id: "BR-AMS-002-2023-001",
        name: "BR-AMS 002",
        title: "Senarai Daftar Inventori",
        submittedBy: "Ahmad Bin Abdullah",
        submittedDate: "2023-05-20",
        status: "Diluluskan",
      },
    ]

    // Log audit event
    await logAuditEvent({
      action: "VIEW",
      entity: "Form",
      entityId: "LIST",
      description: "Viewed form list",
      userId: session.user.id,
      masjidId: session.user.masjidId,
    })

    return NextResponse.json({
      forms: mockForms,
      pagination: {
        page,
        limit,
        total: mockForms.length,
        totalPages: Math.ceil(mockForms.length / limit),
      },
    })
  } catch (error) {
    console.error("Error fetching forms:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Check if user has permission to create forms
    if (!["Admin", "Pegawai Aset", "Pegawai Pengawal"].includes(session.user.role)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    const data = await request.json()

    // Validate required fields
    const requiredFields = ["formType", "title", "content"]
    for (const field of requiredFields) {
      if (!data[field]) {
        return NextResponse.json({ error: `Missing required field: ${field}` }, { status: 400 })
      }
    }

    // Generate form ID
    const formId = `${data.formType.replace(/\s+/g, "-")}-${new Date().getFullYear()}-${Math.floor(Math.random() * 1000)
      .toString()
      .padStart(3, "0")}`

    // In a real implementation, this would create in the database
    // For now, we'll just return the data with an ID
    const form = {
      ...data,
      id: crypto.randomUUID(),
      formId,
      status: "submitted",
      submittedDate: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
      masjidId: session.user.masjidId,
      createdById: session.user.id,
      updatedById: session.user.id,
    }

    // Log audit event
    await logAuditEvent({
      action: "CREATE",
      entity: "Form",
      entityId: formId,
      description: `Submitted new form: ${data.title}`,
      userId: session.user.id,
      masjidId: session.user.masjidId,
      changes: data,
    })

    return NextResponse.json(form, { status: 201 })
  } catch (error) {
    console.error("Error creating form:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
