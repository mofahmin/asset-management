import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Check if user has permission to view audit logs
    if (session.user.role !== "Admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    // Get query parameters
    const { searchParams } = new URL(request.url)
    const action = searchParams.get("action")
    const entity = searchParams.get("entity")
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "10")

    // Build filter
    const filter: any = {
      masjidId: session.user.masjidId,
    }

    if (action && action !== "all") {
      filter.action = action
    }

    if (entity && entity !== "all") {
      filter.entity = entity
    }

    // In a real implementation, this would fetch from the database
    // For now, we'll return mock data
    const mockAuditLogs = [
      {
        id: "LOG-001",
        action: "CREATE",
        entity: "Asset",
        entityId: "A001",
        description: "Aset baru didaftarkan: Kerusi Pejabat",
        user: "Ahmad Bin Abdullah",
        timestamp: "2023-05-15T10:30:00",
        ipAddress: "192.168.1.100",
      },
      {
        id: "LOG-002",
        action: "UPDATE",
        entity: "Asset",
        entityId: "A001",
        description: "Aset dikemaskini: Lokasi berubah dari 'Stor' ke 'Pejabat Pentadbiran'",
        user: "Ahmad Bin Abdullah",
        timestamp: "2023-05-16T14:45:00",
        ipAddress: "192.168.1.100",
      },
    ]

    return NextResponse.json({
      logs: mockAuditLogs,
      pagination: {
        page,
        limit,
        total: mockAuditLogs.length,
        totalPages: Math.ceil(mockAuditLogs.length / limit),
      },
    })
  } catch (error) {
    console.error("Error fetching audit logs:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
