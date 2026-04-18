import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Search, FileText, Calendar, Clock, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useLanguage } from '@/contexts/LanguageContext'
import { getPublishedArtigos, Artigo, getImageUrl } from '@/services/artigos'
import { useRealtime } from '@/hooks/use-realtime'

export default function Artigos() {
  const { language } = useLanguage()
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [articles, setArticles] = useState<Artigo[]>([])
  const itemsPerPage = 9

  const loadArticles = async () => {
    try {
      const data = await getPublishedArtigos()
      setArticles(data)
    } catch (error) {
      console.error('Failed to load articles:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadArticles()
  }, [])

  useRealtime('artigos', () => {
    loadArticles()
  })

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search)
      setPage(1)
    }, 300)
    return () => clearTimeout(timer)
  }, [search])

  const filteredArticles = articles.filter((article) => {
    const title = article.titulo.toLowerCase()
    const summary = article.resumo.toLowerCase()
    const query = debouncedSearch.toLowerCase()
    return title.includes(query) || summary.includes(query)
  })

  const totalPages = Math.ceil(filteredArticles.length / itemsPerPage)
  const paginatedArticles = filteredArticles.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage,
  )

  const isPt = language === 'pt'

  const getSummary = (text: string) => {
    if (text.length > 150) return text.substring(0, 147) + '...'
    return text
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12 md:py-20">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-5xl mb-4">
            {isPt ? 'Artigos e Tutoriais' : 'Articles and Tutorials'}
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            {isPt
              ? 'Dicas, notícias e guias sobre Tecnologia, IA, Segurança e Infraestrutura'
              : 'Tips, news, and guides on Technology, AI, Security, and Infrastructure'}
          </p>
        </div>

        <div className="max-w-md mx-auto mb-16 flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              type="text"
              placeholder={isPt ? 'Buscar artigos...' : 'Search articles...'}
              className="pl-10 h-12"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Button
            onClick={() => setDebouncedSearch(search)}
            className="h-12 px-6"
          >
            {isPt ? 'Buscar' : 'Search'}
          </Button>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="rounded-xl border bg-white dark:bg-slate-900 shadow-sm overflow-hidden flex flex-col h-[420px]"
              >
                <div className="h-48 bg-slate-200 dark:bg-slate-800 animate-pulse" />
                <div className="p-6 flex-1 flex flex-col gap-4">
                  <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-1/3 animate-pulse" />
                  <div className="h-6 bg-slate-200 dark:bg-slate-800 rounded w-3/4 animate-pulse" />
                  <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-full animate-pulse" />
                  <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-5/6 animate-pulse" />
                  <div className="mt-auto h-10 bg-slate-200 dark:bg-slate-800 rounded w-full animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        ) : paginatedArticles.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center bg-white dark:bg-slate-900 rounded-xl border border-dashed">
            <div className="bg-slate-100 dark:bg-slate-800 p-5 rounded-full mb-6">
              <FileText className="h-10 w-10 text-slate-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-slate-900 dark:text-white">
              {isPt
                ? 'Nenhum artigo publicado ainda'
                : 'No articles published yet'}
            </h3>
            <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-sm">
              {isPt
                ? 'Sua busca não retornou resultados. Tente usar termos diferentes.'
                : 'Your search returned no results. Try using different terms.'}
            </p>
            <Link to="/">
              <Button variant="outline" size="lg">
                {isPt ? 'Voltar para Home' : 'Back to Home'}
              </Button>
            </Link>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {paginatedArticles.map((article) => (
                <div
                  key={article.id}
                  onClick={() => navigate(`/artigos/${article.slug}`)}
                  className="cursor-pointer group rounded-xl border bg-white dark:bg-slate-900 shadow-sm overflow-hidden flex flex-col transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                >
                  <div className="relative overflow-hidden h-48">
                    <img
                      src={
                        article.imagem
                          ? getImageUrl(article as any, article.imagem)
                          : `https://img.usecurling.com/p/800/400?q=${encodeURIComponent(article.categoria)}`
                      }
                      alt={article.titulo}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-primary text-white text-xs font-semibold px-2.5 py-1 rounded-full shadow-sm">
                        {article.categoria}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white line-clamp-2 group-hover:text-primary transition-colors">
                      {article.titulo}
                    </h3>

                    <p className="text-slate-600 dark:text-slate-300 mb-6 text-sm flex-1 leading-relaxed">
                      {getSummary(article.resumo)}
                    </p>

                    <div className="mt-auto">
                      <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400 mb-4 pb-4 border-b border-slate-100 dark:border-slate-800">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="h-3.5 w-3.5" />
                          <span>
                            {article.data_publicacao
                              ? new Date(
                                  article.data_publicacao,
                                ).toLocaleDateString(isPt ? 'pt-BR' : 'en-US')
                              : ''}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Clock className="h-3.5 w-3.5" />
                          <span>
                            {article.tempo_leitura} min{' '}
                            {isPt ? 'leitura' : 'read'}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="h-6 w-6 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center">
                            <User className="h-3.5 w-3.5 text-slate-500" />
                          </div>
                          <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
                            {article.autor || 'Admin'}
                          </span>
                        </div>
                        <span className="text-sm font-semibold text-primary group-hover:underline">
                          {isPt ? 'Ler Artigo' : 'Read Article'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {totalPages > 1 && (
              <div className="mt-16 flex justify-center gap-2">
                <Button
                  variant="outline"
                  disabled={page === 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                >
                  {isPt ? 'Anterior' : 'Previous'}
                </Button>
                {Array.from({ length: totalPages }).map((_, i) => (
                  <Button
                    key={i}
                    variant={page === i + 1 ? 'default' : 'outline'}
                    onClick={() => setPage(i + 1)}
                    className={page === i + 1 ? 'pointer-events-none' : ''}
                  >
                    {i + 1}
                  </Button>
                ))}
                <Button
                  variant="outline"
                  disabled={page === totalPages}
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                >
                  {isPt ? 'Próximo' : 'Next'}
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
