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
    const type = searchParams.get("type") || "all"
    const status = searchParams.get("status") || "all"
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "10")

    // Build filter
    const filter: any = {
      masjidId: session.user.masjidId,
    }

    if (search) {
      filter.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { assetId: { contains: search, mode: "insensitive" } },
      ]
    }

    if (type && type !== "all") {
      filter.type = type
    }

    if (status && status !== "all") {
      filter.status = status
    }

    // In a real implementation, this would fetch from the database
    // For now, we'll return mock data
    const mockAssets = [
      {
        id: "A001",
        name: "Kerusi Pejabat",
        category: "Perabot",
        type: "Aset Alih",
        location: "Pejabat Pentadbiran",
        acquisitionDate: "2023-01-15",
        value: 450.0,
        status: "Aktif",
      },
      {
        id: "A002",
        name: "Komputer Riba",
        category: "Peralatan Elektronik",
        type: "Aset Alih",
        location: "Pejabat Pentadbiran",
        acquisitionDate: "2023-02-20",
        value: 3200.0,
        status: "Aktif",
      },
    ]

    // Log audit event
    await logAuditEvent({
      action: "VIEW",
      entity: "Asset",
      entityId: "LIST",
      description: "Viewed asset list",
      userId: session.user.id,
      masjidId: session.user.masjidId,
    })

    return NextResponse.json({
      assets: mockAssets,
      pagination: {
        page,
        limit,
        total: mockAssets.length,
        totalPages: Math.ceil(mockAssets.length / limit),
      },
    })
  } catch (error) {
    console.error("Error fetching assets:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Check if user has permission to create assets
    if (!["Admin", "Pegawai Aset"].includes(session.user.role)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    const data = await request.json()

    // Validate required fields
    const requiredFields = ["name", "type", "category", "acquisitionDate", "value", "location"]
    for (const field of requiredFields) {
      if (!data[field]) {
        return NextResponse.json({ error: `Missing required field: ${field}` }, { status: 400 })
      }
    }

    // Generate asset ID
    const assetId = `A${Math.floor(Math.random() * 10000)
      .toString()
      .padStart(4, "0")}`

    // In a real implementation, this would create in the database
    // For now, we'll just return the data with an ID
    const asset = {
      ...data,
      id: crypto.randomUUID(),
      assetId,
      status: "Aktif",
      createdAt: new Date(),
      updatedAt: new Date(),
      masjidId: session.user.masjidId,
      createdById: session.user.id,
      updatedById: session.user.id,
    }

    // Log audit event
    await logAuditEvent({
      action: "CREATE",
      entity: "Asset",
      entityId: assetId,
      description: `Created new asset: ${data.name}`,
      userId: session.user.id,
      masjidId: session.user.masjidId,
      changes: data,
    })

    return NextResponse.json(asset, { status: 201 })
  } catch (error) {
    console.error("Error creating asset:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
