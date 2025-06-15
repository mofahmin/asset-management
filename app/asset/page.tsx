"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  PlusIcon,
  SearchIcon,
  MoreHorizontalIcon,
  FileTextIcon,
  EditIcon,
  TrashIcon,
  DownloadIcon,
} from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { ListViewHeader } from "@/components/layout/list-view-header";
import { ListViewBody } from "@/components/layout/list-view-body";
import { ListViewChart } from "@/components/layout/list-view-chart";
import {
  Moon,
  ChevronDown,
  ChevronUp,
  Edit,
  MoreHorizontal,
  Plus,
  Trash,
  Building,
  Package,
  DollarSign,
  TrendingUp,
  Activity,
} from "lucide-react";
import { useMobile } from "@/hooks/use-mobile";
import { PullToRefresh } from "@/components/pull-to-refresh";
import { FloatingActionButton } from "@/components/ui/floating-action-button";
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useRouter } from "next/navigation";

export default function AssetPage() {
  const isMobile = useMobile();
  const { toast } = useToast();
  const router = useRouter();
  const [searchValue, setSearchValue] = useState("");
  const [showChart, setShowChart] = useState(true);
  const [assets, setAssets] = useState([
    {
      // Classification
      id: "001",
      registrationId: "MTAJ/HM/2018/001",
      classification: "Aset Alih",
      type: "Harta Modal",
      // Movable Asset Details
      name: "Kerusi Pejabat",
      description: "Kerusi pejabat untuk kegunaan staf masjid",
      notes: "Kerusi dalam keadaan baik, perlu diselenggara setiap 6 bulan.",
      image: "/assets/kerusi-pejabat.jpg",
      serialNumber: "SN123456",
      model: "Model X",
      manufacturer: "Syarikat Perabot Sdn Bhd",
      // Immovable Asset Details
      acquisitionSource: "Kerajaan Negeri",
      acquisitionCost: "Kerajaan Negeri",
      // Order details
      orderNumber: "PO123456",
      purchaseDate: "2023-01-15",
      purchasePrice: 450.0,
      warrantyPeriod: "2 tahun",
      warrantyExpiry: "2025-01-15",
      // Maintenance details
      lastMaintenanceDate: "2023-06-01",
      nextMaintenanceDue: "2024-06-01",
      category: "Perabot",
      location: "Pejabat Pentadbiran",
      acquisitionDate: "2023-01-15",
      acquisitionMethod: "Purchase",
      value: 450.0,
      status: "Aktif",
    },
    {
      id: "002",
      registrationId: "MTAJ/HM/2018/002",
      classification: "Aset Alih",
      type: "Harta Modal",
      name: "Komputer Riba",
      description: "Komputer riba untuk kegunaan pentadbiran",
      notes: "Perlu dikemaskini antivirus setiap bulan.",
      image: "/assets/komputer-riba.jpg",
      serialNumber: "SN654321",
      model: "Dell Inspiron 15",
      manufacturer: "Dell",
      acquisitionSource: "Sumbangan",
      acquisitionCost: "3200.0",
      orderNumber: "PO654321",
      purchaseDate: "2023-02-20",
      purchasePrice: 3200.0,
      warrantyPeriod: "1 tahun",
      warrantyExpiry: "2024-02-20",
      lastMaintenanceDate: "2023-08-01",
      nextMaintenanceDue: "2024-08-01",
      category: "Peralatan Elektronik",
      location: "Pejabat Pentadbiran",
      acquisitionDate: "2023-02-20",
      acquisitionMethod: "Purchase",
      value: 3200.0,
      status: "Aktif",
    },
    {
      id: "003",
      registrationId: "MTAJ/HM/2018/003",
      classification: "Aset Alih",
      type: "Harta Modal",
      name: "Sistem Pembesar Suara",
      description: "Sistem pembesar suara utama dewan solat",
      notes: "Perlu diselenggara setiap 3 bulan.",
      image: "/assets/sistem-pembesar-suara.jpg",
      serialNumber: "SN789012",
      model: "Yamaha X200",
      manufacturer: "Yamaha",
      acquisitionSource: "Pembelian",
      acquisitionCost: "5000.0",
      orderNumber: "PO789012",
      purchaseDate: "2022-11-05",
      purchasePrice: 5000.0,
      warrantyPeriod: "2 tahun",
      warrantyExpiry: "2024-11-05",
      lastMaintenanceDate: "2023-09-01",
      nextMaintenanceDue: "2024-09-01",
      category: "Peralatan Audio",
      location: "Dewan Solat",
      acquisitionDate: "2022-11-05",
      acquisitionMethod: "Purchase",
      value: 5000.0,
      status: "Penyelenggaraan",
    },
    {
      id: "004",
      registrationId: "MTAJ/I/2018/001",
      classification: "Aset Alih",
      type: "Inventori",
      name: "Penghawa Dingin",
      description: "Penghawa dingin untuk dewan solat",
      notes: "Servis setiap 6 bulan.",
      image: "/assets/penghawa-dingin.jpg",
      serialNumber: "SN345678",
      model: "Panasonic CS-XPU10WKH",
      manufacturer: "Panasonic",
      acquisitionSource: "Pembelian",
      acquisitionCost: "2800.0",
      orderNumber: "PO345678",
      purchaseDate: "2022-08-10",
      purchasePrice: 2800.0,
      warrantyPeriod: "1 tahun",
      warrantyExpiry: "2023-08-10",
      lastMaintenanceDate: "2023-02-10",
      nextMaintenanceDue: "2024-02-10",
      category: "Peralatan Elektronik",
      location: "Dewan Solat",
      acquisitionDate: "2022-08-10",
      acquisitionMethod: "Purchase",
      value: 2800.0,
      status: "Aktif",
    },
    {
      id: "005",
      registrationId: "A005",
      classification: "Aset Tak Alih",
      type: "",
      name: "Bangunan Utama",
      description: "Bangunan utama masjid",
      notes: "Bangunan dalam keadaan baik.",
      image: "/assets/bangunan-utama.jpg",
      serialNumber: "",
      model: "",
      manufacturer: "",
      acquisitionSource: "Kerajaan Negeri",
      acquisitionCost: "1500000.0",
      orderNumber: "",
      purchaseDate: "2010-05-20",
      purchasePrice: 1500000.0,
      warrantyPeriod: "",
      warrantyExpiry: "",
      lastMaintenanceDate: "2023-01-01",
      nextMaintenanceDue: "2024-01-01",
      category: "Bangunan",
      location: "Tapak Masjid",
      acquisitionDate: "2010-05-20",
      acquisitionMethod: "Purchase",
      value: 1500000.0,
      status: "Aktif",
    },
    {
      id: "006",
      registrationId: "A006",
      classification: "Aset Tak Alih",
      type: "",
      name: "Tanah Masjid",
      description: "Tanah tapak masjid",
      notes: "Tanah berstatus hak milik kekal.",
      image: "/assets/tanah-masjid.jpg",
      serialNumber: "",
      model: "",
      manufacturer: "",
      acquisitionSource: "Kerajaan Negeri",
      acquisitionCost: "1500000.0",
      orderNumber: "",
      purchaseDate: "2010-05-20",
      purchasePrice: 1500000.0,
      warrantyPeriod: "",
      warrantyExpiry: "",
      lastMaintenanceDate: "",
      nextMaintenanceDue: "",
      category: "Tanah",
      location: "Tapak Masjid",
      acquisitionDate: "2010-05-20",
      acquisitionMethod: "Purchase",
      value: 1500000.0,
      status: "Aktif",
    },
  ]);

  // Calculate aggregated data for dashboard
  const dashboardData = {
    metrics: [
      {
        title: "Total Aset",
        value: assets.length,
        description: "Jumlah keseluruhan aset",
        trend: { value: 12, isPositive: true },
        icon: <Package className="h-4 w-4 text-muted-foreground" />,
      },
      {
        title: "Nilai Keseluruhan",
        value: `RM ${assets
          .reduce((sum, asset) => sum + asset.value, 0)
          .toLocaleString("ms-MY")}`,
        description: "Nilai keseluruhan aset",
        trend: { value: 8, isPositive: true },
        icon: <DollarSign className="h-4 w-4 text-muted-foreground" />,
      },
      {
        title: "Aset Aktif",
        value: assets.filter((asset) => asset.status === "Aktif").length,
        description: "Aset dalam keadaan aktif",
        trend: { value: 5, isPositive: true },
        icon: <Activity className="h-4 w-4 text-muted-foreground" />,
      },
      {
        title: "Perlu Penyelenggaraan",
        value: assets.filter((asset) => asset.status === "Penyelenggaraan")
          .length,
        description: "Aset perlu diselenggara",
        trend: { value: 2, isPositive: false },
        icon: <TrendingUp className="h-4 w-4 text-muted-foreground" />,
      },
    ],
    barChartData: Object.entries(
      assets.reduce((acc, asset) => {
        acc[asset.category] = (acc[asset.category] || 0) + 1;
        return acc;
      }, {} as Record<string, number>)
    ).map(([name, value]) => ({ name, value })),
    pieChartData: Object.entries(
      assets.reduce((acc, asset) => {
        acc[asset.status] = (acc[asset.status] || 0) + 1;
        return acc;
      }, {} as Record<string, number>)
    ).map(([name, value], index) => ({
      name,
      value,
      color: ["#10b981", "#f59e0b", "#ef4444", "#8b5cf6"][index] || "#6b7280",
    })),
  };

  const columns = [
    {
      key: "registrationId",
      label: "No. Siri Pendaftaran",
      sortable: true,
      searchable: true,
    },
    {
      key: "name",
      label: "Nama Aset",
      sortable: true,
      searchable: true,
    },
    {
      key: "category",
      label: "Kategori",
      sortable: true,
      searchable: true,
    },
    {
      key: "acquisitionMethod",
      label: "Cara Perolehan",
      sortable: true,
      searchable: true,
    },
    {
      key: "acquisitionDate",
      label: "Tarikh Perolehan",
      sortable: true,
      render: (value) =>
        value ? new Date(value).toLocaleDateString("ms-MY") : "-",
    },
    {
      key: "value",
      label: "Nilai (RM)",
      sortable: true,
      render: (value) =>
        value
          ? Number(value).toLocaleString("ms-MY", { minimumFractionDigits: 2 })
          : "-",
    },
    {
      key: "location",
      label: "Penempatan",
      sortable: true,
      searchable: true,
    },
    {
      key: "status",
      label: "Status",
      sortable: true,
      searchable: true,
      render: (value) => (
        <Badge className={getStatusBadgeColor(value)}>{value}</Badge>
      ),
    },
  ];

  const [isRefreshing, setIsRefreshing] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [assetToDelete, setAssetToDelete] = useState<string | null>(null);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsRefreshing(false);
    toast({
      title: "Refreshed",
      description: "Asset list has been updated",
      variant: "success",
    });
  };

  const handleCellEdit = async (id: string, field: string, value: string) => {
    try {
      // Update the local state
      setAssets(
        assets.map((asset) =>
          asset.id === id ? { ...asset, [field]: value } : asset
        )
      );

      // Here you would typically make an API call to update the server
      // await updateAccount(id, { [field]: value })

      toast({
        title: "Asset updated",
        description: `${field} has been updated successfully`,
        variant: "success",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update asset. Please try again.",
        variant: "destructive",
      });
      throw error; // Re-throw to let the component handle the error state
    }
  };

  const handleNewAsset = () => {
    router.push("/asset/new");
  };

  const confirmDelete = (id: string) => {
    setAssetToDelete(id);
    setDeleteDialogOpen(true);
  };

  const handleDelete = () => {
    if (assetToDelete) {
      setAssets(assets.filter((asset) => asset.id !== assetToDelete));
      setDeleteDialogOpen(false);
      setAssetToDelete(null);
      toast({
        title: "Asset deleted",
        description: "The asset has been successfully deleted",
        variant: "success",
      });
    }
  };

  const handleViewAsset = (asset: any) => {
    router.push(`/asset/${asset.id}`);
  };
  const handleEditAsset = (asset: any) => {
    router.push(`/asset/${asset.id}/edit`);
  };

  const handleToggleChart = () => {
    setShowChart(!showChart);
  };

  const actions = [
    {
      label: "View",
      onClick: handleViewAsset,
    },
    {
      label: "Delete",
      // icon: <Trash className="h-4 w-4" />,
      onClick: confirmDelete,
      variant: "ghost",
      className: "text-destructive",
    },
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "Aktif":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "Penyelenggaraan":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      case "Pelupusan":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      case "Hilang":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
    }
  };

  return (
    <Card>
      <CardHeader>
        <ListViewHeader
          title="Aset"
          entityName="Aset"
          description="Urus semua aset masjid dan surau di sini"
          onNew={handleNewAsset}
          searchValue={searchValue}
          onSearchChange={setSearchValue}
          searchPlaceholder="Search Aset..."
          showChart={showChart}
          onToggleChart={handleToggleChart}
        />
      </CardHeader>
      <CardContent>
        <ListViewChart
          metrics={dashboardData.metrics}
          barChartData={dashboardData.barChartData}
          pieChartData={dashboardData.pieChartData}
          barChartTitle="Aset Mengikut Kategori"
          barChartDescription="Jumlah aset dalam setiap kategori"
          pieChartTitle="Status Aset"
          pieChartDescription="Taburan status aset"
          showLineChart={false}
          className="mb-6"
          isVisible={showChart}
        />
        <ListViewBody
          data={assets}
          columns={columns}
          actions={actions}
          onRowClick={handleViewAsset}
          onEdit={handleEditAsset}
          onNew={handleNewAsset}
          onRefresh={handleRefresh}
          onCellEdit={handleCellEdit}
          searchValue={searchValue}
          selectable={true}
          editable={true}
          // mobileCardRender={mobileCardRender}
          emptyMessage="No assets found. Create your first asset to get started."
        />
      </CardContent>
    </Card>
  );
}
