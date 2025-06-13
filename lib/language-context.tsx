"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

type Language = "ms-MY" | "en-US"

interface LanguageContextType {
  language: Language
  setLanguage: (language: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

// Simple translations
const translations = {
  "ms-MY": {
    // Common
    "app.name": "SistemAset",
    "common.save": "Simpan",
    "common.cancel": "Batal",
    "common.edit": "Edit",
    "common.delete": "Hapus",
    "common.back": "Kembali",
    "common.search": "Cari",
    "common.filter": "Tapis",
    "common.export": "Eksport",
    "common.print": "Cetak",
    "common.download": "Muat Turun",
    "common.submit": "Hantar",
    "common.approve": "Luluskan",
    "common.reject": "Tolak",
    "common.view": "Lihat",
    "common.details": "Butiran",
    "common.actions": "Tindakan",
    "common.status": "Status",
    "common.date": "Tarikh",
    "common.notes": "Catatan",
    "common.description": "Penerangan",
    "common.location": "Lokasi",
    "common.value": "Nilai",
    "common.type": "Jenis",
    "common.category": "Kategori",
    "common.id": "ID",
    "common.name": "Nama",
    "common.all": "Semua",
    "common.active": "Aktif",
    "common.inactive": "Tidak Aktif",
    "common.loading": "Memuatkan...",
    "common.success": "Berjaya",
    "common.error": "Ralat",
    "common.warning": "Amaran",
    "common.info": "Maklumat",

    // Dashboard
    "dashboard.title": "Dashboard",
    "dashboard.overview": "Ringkasan",
    "dashboard.analytics": "Analitik",
    "dashboard.reports": "Laporan",
    "dashboard.total_assets": "Jumlah Aset",
    "dashboard.maintenance": "Penyelenggaraan",
    "dashboard.losses": "Kehilangan",
    "dashboard.disposals": "Pelupusan",
    "dashboard.asset_stats": "Statistik Aset",
    "dashboard.recent_activities": "Aktiviti Terkini",

    // Assets
    "assets.title": "Aset",
    "assets.new": "Aset Baru",
    "assets.list": "Senarai Aset",
    "assets.details": "Butiran Aset",
    "assets.edit": "Edit Aset",
    "assets.delete": "Hapus Aset",
    "assets.movable": "Aset Alih",
    "assets.immovable": "Aset Tak Alih",
    "assets.acquisition_date": "Tarikh Perolehan",
    "assets.acquisition_method": "Kaedah Perolehan",
    "assets.serial_number": "No. Siri",
    "assets.status.active": "Aktif",
    "assets.status.maintenance": "Penyelenggaraan",
    "assets.status.disposal": "Pelupusan",
    "assets.status.lost": "Hilang",
    "assets.register_success": "Aset berjaya didaftarkan",

    // Forms
    "forms.title": "Borang",
    "forms.new": "Borang Baru",
    "forms.list": "Senarai Borang",
    "forms.details": "Butiran Borang",
    "forms.edit": "Edit Borang",
    "forms.delete": "Hapus Borang",
    "forms.submit": "Hantar Borang",
    "forms.approve": "Luluskan Borang",
    "forms.reject": "Tolak Borang",
    "forms.status.draft": "Draf",
    "forms.status.submitted": "Dihantar",
    "forms.status.approved": "Diluluskan",
    "forms.status.rejected": "Ditolak",
    "forms.submit_success": "Borang berjaya dihantar",

    // Maintenance
    "maintenance.title": "Penyelenggaraan",
    "maintenance.new": "Jadual Baru",
    "maintenance.list": "Rekod Penyelenggaraan",
    "maintenance.details": "Butiran Penyelenggaraan",
    "maintenance.edit": "Edit Penyelenggaraan",
    "maintenance.delete": "Hapus Penyelenggaraan",
    "maintenance.schedule": "Jadual Penyelenggaraan",
    "maintenance.complete": "Tandakan Selesai",
    "maintenance.status.scheduled": "Dijadualkan",
    "maintenance.status.in_progress": "Dalam Proses",
    "maintenance.status.completed": "Selesai",
    "maintenance.status.cancelled": "Dibatalkan",
    "maintenance.schedule_success": "Penyelenggaraan berjaya dijadualkan",

    // Disposals
    "disposals.title": "Pelupusan",
    "disposals.new": "Permohonan Baru",
    "disposals.list": "Permohonan Pelupusan",
    "disposals.details": "Butiran Pelupusan",
    "disposals.edit": "Edit Pelupusan",
    "disposals.delete": "Hapus Pelupusan",
    "disposals.approve": "Luluskan Pelupusan",
    "disposals.reject": "Tolak Pelupusan",
    "disposals.complete": "Tandakan Selesai",
    "disposals.status.pending": "Menunggu Kelulusan",
    "disposals.status.approved": "Diluluskan",
    "disposals.status.rejected": "Ditolak",
    "disposals.status.completed": "Selesai",
    "disposals.submit_success": "Permohonan pelupusan berjaya dihantar",

    // Losses
    "losses.title": "Kehilangan",
    "losses.new": "Laporan Baru",
    "losses.list": "Laporan Kehilangan",
    "losses.details": "Butiran Kehilangan",
    "losses.edit": "Edit Kehilangan",
    "losses.delete": "Hapus Kehilangan",
    "losses.status.reported": "Dilaporkan",
    "losses.status.investigating": "Siasatan",
    "losses.status.written_off": "Hapus Kira",
    "losses.status.found": "Dijumpai",
    "losses.submit_success": "Laporan kehilangan berjaya dihantar",

    // Settings
    "settings.title": "Tetapan",
    "settings.general": "Umum",
    "settings.masjid": "Masjid",
    "settings.users": "Pengguna",
    "settings.categories": "Kategori Aset",
    "settings.forms": "Borang",
    "settings.language": "Bahasa",
    "settings.notifications": "Notifikasi",
    "settings.email_reports": "Laporan Melalui Email",
    "settings.save_success": "Tetapan berjaya disimpan",

    // Auth
    "auth.login": "Log Masuk",
    "auth.register": "Daftar",
    "auth.logout": "Log Keluar",
    "auth.forgot_password": "Lupa Kata Laluan",
    "auth.email": "Email",
    "auth.password": "Kata Laluan",
    "auth.confirm_password": "Sahkan Kata Laluan",
    "auth.name": "Nama",
    "auth.role": "Peranan",
    "auth.login_success": "Log masuk berjaya",
    "auth.register_success": "Pendaftaran berjaya",
    "auth.logout_success": "Log keluar berjaya",
  },
  "en-US": {
    // Common
    "app.name": "AssetSystem",
    "common.save": "Save",
    "common.cancel": "Cancel",
    "common.edit": "Edit",
    "common.delete": "Delete",
    "common.back": "Back",
    "common.search": "Search",
    "common.filter": "Filter",
    "common.export": "Export",
    "common.print": "Print",
    "common.download": "Download",
    "common.submit": "Submit",
    "common.approve": "Approve",
    "common.reject": "Reject",
    "common.view": "View",
    "common.details": "Details",
    "common.actions": "Actions",
    "common.status": "Status",
    "common.date": "Date",
    "common.notes": "Notes",
    "common.description": "Description",
    "common.location": "Location",
    "common.value": "Value",
    "common.type": "Type",
    "common.category": "Category",
    "common.id": "ID",
    "common.name": "Name",
    "common.all": "All",
    "common.active": "Active",
    "common.inactive": "Inactive",
    "common.loading": "Loading...",
    "common.success": "Success",
    "common.error": "Error",
    "common.warning": "Warning",
    "common.info": "Information",

    // Dashboard
    "dashboard.title": "Dashboard",
    "dashboard.overview": "Overview",
    "dashboard.analytics": "Analytics",
    "dashboard.reports": "Reports",
    "dashboard.total_assets": "Total Assets",
    "dashboard.maintenance": "Maintenance",
    "dashboard.losses": "Losses",
    "dashboard.disposals": "Disposals",
    "dashboard.asset_stats": "Asset Statistics",
    "dashboard.recent_activities": "Recent Activities",

    // Assets
    "assets.title": "Assets",
    "assets.new": "New Asset",
    "assets.list": "Asset List",
    "assets.details": "Asset Details",
    "assets.edit": "Edit Asset",
    "assets.delete": "Delete Asset",
    "assets.movable": "Movable Asset",
    "assets.immovable": "Immovable Asset",
    "assets.acquisition_date": "Acquisition Date",
    "assets.acquisition_method": "Acquisition Method",
    "assets.serial_number": "Serial Number",
    "assets.status.active": "Active",
    "assets.status.maintenance": "Maintenance",
    "assets.status.disposal": "Disposal",
    "assets.status.lost": "Lost",
    "assets.register_success": "Asset registered successfully",

    // Forms
    "forms.title": "Forms",
    "forms.new": "New Form",
    "forms.list": "Form List",
    "forms.details": "Form Details",
    "forms.edit": "Edit Form",
    "forms.delete": "Delete Form",
    "forms.submit": "Submit Form",
    "forms.approve": "Approve Form",
    "forms.reject": "Reject Form",
    "forms.status.draft": "Draft",
    "forms.status.submitted": "Submitted",
    "forms.status.approved": "Approved",
    "forms.status.rejected": "Rejected",
    "forms.submit_success": "Form submitted successfully",

    // Maintenance
    "maintenance.title": "Maintenance",
    "maintenance.new": "New Schedule",
    "maintenance.list": "Maintenance Records",
    "maintenance.details": "Maintenance Details",
    "maintenance.edit": "Edit Maintenance",
    "maintenance.delete": "Delete Maintenance",
    "maintenance.schedule": "Schedule Maintenance",
    "maintenance.complete": "Mark as Complete",
    "maintenance.status.scheduled": "Scheduled",
    "maintenance.status.in_progress": "In Progress",
    "maintenance.status.completed": "Completed",
    "maintenance.status.cancelled": "Cancelled",
    "maintenance.schedule_success": "Maintenance scheduled successfully",

    // Disposals
    "disposals.title": "Disposals",
    "disposals.new": "New Request",
    "disposals.list": "Disposal Requests",
    "disposals.details": "Disposal Details",
    "disposals.edit": "Edit Disposal",
    "disposals.delete": "Delete Disposal",
    "disposals.approve": "Approve Disposal",
    "disposals.reject": "Reject Disposal",
    "disposals.complete": "Mark as Complete",
    "disposals.status.pending": "Pending Approval",
    "disposals.status.approved": "Approved",
    "disposals.status.rejected": "Rejected",
    "disposals.status.completed": "Completed",
    "disposals.submit_success": "Disposal request submitted successfully",

    // Losses
    "losses.title": "Losses",
    "losses.new": "New Report",
    "losses.list": "Loss Reports",
    "losses.details": "Loss Details",
    "losses.edit": "Edit Loss",
    "losses.delete": "Delete Loss",
    "losses.status.reported": "Reported",
    "losses.status.investigating": "Investigating",
    "losses.status.written_off": "Written Off",
    "losses.status.found": "Found",
    "losses.submit_success": "Loss report submitted successfully",

    // Settings
    "settings.title": "Settings",
    "settings.general": "General",
    "settings.masjid": "Mosque",
    "settings.users": "Users",
    "settings.categories": "Asset Categories",
    "settings.forms": "Forms",
    "settings.language": "Language",
    "settings.notifications": "Notifications",
    "settings.email_reports": "Email Reports",
    "settings.save_success": "Settings saved successfully",

    // Auth
    "auth.login": "Login",
    "auth.register": "Register",
    "auth.logout": "Logout",
    "auth.forgot_password": "Forgot Password",
    "auth.email": "Email",
    "auth.password": "Password",
    "auth.confirm_password": "Confirm Password",
    "auth.name": "Name",
    "auth.role": "Role",
    "auth.login_success": "Login successful",
    "auth.register_success": "Registration successful",
    "auth.logout_success": "Logout successful",
  },
}

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>("ms-MY")

  useEffect(() => {
    // Load language preference from localStorage if available
    const savedLanguage = localStorage.getItem("language") as Language
    if (savedLanguage && (savedLanguage === "ms-MY" || savedLanguage === "en-US")) {
      setLanguageState(savedLanguage)
    }
  }, [])

  const setLanguage = (newLanguage: Language) => {
    setLanguageState(newLanguage)
    localStorage.setItem("language", newLanguage)
  }

  const t = (key: string): string => {
    return translations[language][key as keyof (typeof translations)[typeof language]] || key
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
