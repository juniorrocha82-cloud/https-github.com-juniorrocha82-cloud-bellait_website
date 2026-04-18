import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, Calendar, Clock, User, Share2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/contexts/LanguageContext'
import { getArtigoBySlug, Artigo, getImageUrl } from '@/services/artigos'

export default function ArtigoDetail() {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const { language } = useLanguage()
  const [isLoading, setIsLoading] = useState(true)
  const [article, setArticle] = useState<Artigo | null>(null)

  const isPt = language === 'pt'

  useEffect(() => {
    window.scrollTo(0, 0)
    const fetchArticle = async () => {
      if (!slug) return
      try {
        const data = await getArtigoBySlug(slug)
        setArticle(data)
      } catch (error) {
        console.error('Article not found', error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchArticle()
  }, [slug])

  if (!isLoading && !article) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center bg-slate-50 dark:bg-slate-950">
        <h2 className="text-3xl font-bold mb-4 text-slate-900 dark:text-white">
          {isPt ? 'Artigo não encontrado' : 'Article not found'}
        </h2>
        <p className="text-slate-500 mb-8 max-w-md mx-auto">
          {isPt
            ? 'O artigo que você está procurando pode ter sido removido ou o link está incorreto.'
            : 'The article you are looking for may have been removed or the link is incorrect.'}
        </p>
        <Button size="lg" onClick={() => navigate('/artigos')}>
          {isPt ? 'Voltar para Artigos' : 'Back to Articles'}
        </Button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-20 pt-8">
      {isLoading ? (
        <div className="container mx-auto px-4 py-8 max-w-3xl animate-pulse">
          <div className="h-6 w-32 bg-slate-200 dark:bg-slate-800 rounded mb-12" />
          <div className="h-8 w-24 bg-slate-200 dark:bg-slate-800 rounded-full mb-6" />
          <div className="h-12 w-full bg-slate-200 dark:bg-slate-800 rounded mb-4" />
          <div className="h-12 w-3/4 bg-slate-200 dark:bg-slate-800 rounded mb-8" />
          <div className="flex gap-6 mb-12">
            <div className="h-5 w-24 bg-slate-200 dark:bg-slate-800 rounded" />
            <div className="h-5 w-24 bg-slate-200 dark:bg-slate-800 rounded" />
            <div className="h-5 w-24 bg-slate-200 dark:bg-slate-800 rounded" />
          </div>
          <div className="h-[400px] md:h-[500px] w-full bg-slate-200 dark:bg-slate-800 rounded-2xl mb-12" />
          <div className="space-y-4">
            <div className="h-4 w-full bg-slate-200 dark:bg-slate-800 rounded" />
            <div className="h-4 w-full bg-slate-200 dark:bg-slate-800 rounded" />
            <div className="h-4 w-full bg-slate-200 dark:bg-slate-800 rounded" />
            <div className="h-4 w-5/6 bg-slate-200 dark:bg-slate-800 rounded" />
          </div>
        </div>
      ) : article ? (
        <article className="container mx-auto px-4 max-w-3xl">
          <div className="mb-8">
            <Link
              to="/artigos"
              className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-primary transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              {isPt ? 'Voltar para Artigos' : 'Back to Articles'}
            </Link>
          </div>

          <header className="mb-10">
            <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-6">
              {article.categoria}
            </div>

            <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-6 leading-tight tracking-tight">
              {article.titulo}
            </h1>

            <p className="text-xl text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
              {article.resumo}
            </p>

            <div className="flex flex-wrap items-center justify-between gap-6 py-6 border-y border-slate-200 dark:border-slate-800">
              <div className="flex flex-wrap items-center gap-6 text-sm text-slate-600 dark:text-slate-400">
                <div className="flex items-center gap-2">
                  <div className="h-10 w-10 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center">
                    <User className="h-5 w-5 text-slate-500" />
                  </div>
                  <span className="font-medium text-slate-900 dark:text-white">
                    {article.autor || 'Admin'}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>
                    {article.data_publicacao
                      ? new Date(article.data_publicacao).toLocaleDateString(
                          isPt ? 'pt-BR' : 'en-US',
                        )
                      : ''}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>
                    {article.tempo_leitura} min {isPt ? 'de leitura' : 'read'}
                  </span>
                </div>
              </div>

              <Button
                variant="ghost"
                size="icon"
                className="rounded-full text-slate-500 hover:text-primary"
              >
                <Share2 className="h-5 w-5" />
                <span className="sr-only">Share</span>
              </Button>
            </div>
          </header>

          <figure className="mb-12">
            <img
              src={
                article.imagem
                  ? getImageUrl(article as any, article.imagem)
                  : `https://img.usecurling.com/p/1200/600?q=${encodeURIComponent(article.categoria)}`
              }
              alt={article.titulo}
              className="w-full h-[400px] md:h-[500px] object-cover rounded-2xl shadow-md"
            />
          </figure>

          <div
            className="prose prose-lg md:prose-xl prose-slate dark:prose-invert max-w-none prose-p:leading-relaxed prose-headings:text-slate-900 dark:prose-headings:text-white"
            dangerouslySetInnerHTML={{
              __html: article.conteudo.replace(/\n/g, '<br/>'),
            }}
          />

          <div className="mt-16 pt-8 border-t border-slate-200 dark:border-slate-800 text-center">
            <h3 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white">
              {isPt ? 'Gostou deste artigo?' : 'Did you like this article?'}
            </h3>
            <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-md mx-auto">
              {isPt
                ? 'Compartilhe com sua rede ou continue explorando nosso conteúdo para se manter atualizado.'
                : 'Share it with your network or keep exploring our content to stay updated.'}
            </p>
            <div className="flex items-center justify-center gap-4">
              <Button variant="outline" className="gap-2">
                <Share2 className="h-4 w-4" />
                {isPt ? 'Compartilhar' : 'Share'}
              </Button>
              <Button onClick={() => navigate('/artigos')}>
                {isPt ? 'Mais Artigos' : 'More Articles'}
              </Button>
            </div>
          </div>
        </article>
      ) : null}
    </div>
  )
}
