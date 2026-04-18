import { useEffect } from 'react'
import { Outlet, useNavigate, Link } from 'react-router-dom'
import { useAuth } from '@/hooks/use-auth'
import { Button } from '@/components/ui/button'
import { LayoutDashboard, FileText, LogOut, Loader2 } from 'lucide-react'

export default function AdminLayout() {
  const { user, loading, isAdmin, signOut } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) {
      navigate('/login')
    }
  }, [user, loading, isAdmin, navigate])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (!user || !isAdmin) return null

  const handleLogout = () => {
    signOut()
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col">
        <div className="p-6 border-b border-slate-200 dark:border-slate-800">
          <Link
            to="/"
            className="text-xl font-bold text-primary flex items-center gap-2"
          >
            <LayoutDashboard className="h-6 w-6" />
            Bella IT Admin
          </Link>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <Link
            to="/admin/artigos"
            className="flex items-center gap-3 px-4 py-3 text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 rounded-lg font-medium"
          >
            <FileText className="h-5 w-5" />
            Artigos
          </Link>
        </nav>
        <div className="p-4 border-t border-slate-200 dark:border-slate-800">
          <Button
            variant="ghost"
            className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/50"
            onClick={handleLogout}
          >
            <LogOut className="h-5 w-5 mr-3" />
            Sair
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-8 py-4 flex items-center justify-between">
          <h1 className="text-xl font-semibold text-slate-900 dark:text-white">
            Painel Administrativo
          </h1>
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold">
              {user.name?.charAt(0) || 'A'}
            </div>
            <span className="text-sm font-medium hidden sm:block">
              {user.name || 'Admin'}
            </span>
          </div>
        </header>
        <div className="flex-1 overflow-auto p-4 md:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
