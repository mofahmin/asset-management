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

    // Check if user has permission to view users
    if (session.user.role !== "Admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    // In a real implementation, this would fetch from the database
    // For now, we'll return mock data
    const mockUsers = [
      {
        id: "1",
        name: "Ahmad Bin Abdullah",
        email: "ahmad@example.com",
        role: "Pegawai Aset",
        createdAt: "2023-01-01T00:00:00.000Z",
      },
      {
        id: "2",
        name: "Siti Binti Hassan",
        email: "siti@example.com",
        role: "Pegawai Pengawal",
        createdAt: "2023-01-02T00:00:00.000Z",
      },
      {
        id: "3",
        name: "Mohamed Bin Ismail",
        email: "mohamed@example.com",
        role: "Jawatankuasa",
        createdAt: "2023-01-03T00:00:00.000Z",
      },
    ]

    // Log audit event
    await logAuditEvent({
      action: "VIEW",
      entity: "User",
      entityId: "LIST",
      description: "Viewed user list",
      userId: session.user.id,
      masjidId: session.user.masjidId,
    })

    return NextResponse.json(mockUsers)
  } catch (error) {
    console.error("Error fetching users:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Check if user has permission to create users
    if (session.user.role !== "Admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    const data = await request.json()

    // Validate required fields
    const requiredFields = ["name", "email", "role", "password"]
    for (const field of requiredFields) {
      if (!data[field]) {
        return NextResponse.json({ error: `Missing required field: ${field}` }, { status: 400 })
      }
    }

    // In a real implementation, this would create in the database
    // For now, we'll just return the data with an ID
    const user = {
      ...data,
      id: crypto.randomUUID(),
      masjidId: session.user.masjidId,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    // Remove password from response
    const { password, ...userWithoutPassword } = user

    // Log audit event
    await logAuditEvent({
      action: "CREATE",
      entity: "User",
      entityId: user.id,
      description: `Created new user: ${data.name} (${data.role})`,
      userId: session.user.id,
      masjidId: session.user.masjidId,
      changes: { ...data, password: "[REDACTED]" },
    })

    return NextResponse.json(userWithoutPassword, { status: 201 })
  } catch (error) {
    console.error("Error creating user:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
