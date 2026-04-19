import { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  getArtigoById,
  createArtigo,
  updateArtigo,
  getImageUrl,
} from '@/services/artigos'
import { useAuth } from '@/hooks/use-auth'
import {
  ArrowLeft,
  Save,
  Send,
  Image as ImageIcon,
  CheckCircle2,
  Sparkles,
  X,
  Loader2,
  Search,
} from 'lucide-react'
import { extractFieldErrors } from '@/lib/pocketbase/errors'
import { useToast } from '@/components/ui/use-toast'
import pb from '@/lib/pocketbase/client'

export default function ArtigoForm() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    titulo: '',
    slug: '',
    resumo: '',
    conteudo: '',
    autor: user?.name || '',
    tempo_leitura: 5,
    categoria: 'IA',
    seo_title: '',
    seo_description: '',
    seo_keywords: '',
    data_agendada: '',
  })

  const [currentImage, setCurrentImage] = useState('')
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [seoValid, setSeoValid] = useState<boolean | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // AI Modal State
  const [isAiModalOpen, setIsAiModalOpen] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const [aiError, setAiError] = useState('')
  const [aiSentiment, setAiSentiment] = useState('')
  const [seoSuggestions, setSeoSuggestions] = useState<{
    title: string
    description: string
  } | null>(null)
  const [aiForm, setAiForm] = useState({
    tema: '',
    categoria: 'IA',
    tom: 'Técnico',
    comprimento: '2',
  })

  // Unsplash Modal State
  const [isUnsplashModalOpen, setIsUnsplashModalOpen] = useState(false)
  const [unsplashQuery, setUnsplashQuery] = useState('')
  const [unsplashImages, setUnsplashImages] = useState<any[]>([])
  const [isSearchingUnsplash, setIsSearchingUnsplash] = useState(false)
  const [isDownloadingImage, setIsDownloadingImage] = useState(false)

  const formatToDatetimeLocal = (isoString: string) => {
    if (!isoString) return ''
    const date = new Date(isoString)
    const offset = date.getTimezoneOffset() * 60000
    return new Date(date.getTime() - offset).toISOString().slice(0, 16)
  }

  useEffect(() => {
    if (id) {
      getArtigoById(id).then((data) => {
        setFormData({
          titulo: data.titulo,
          slug: data.slug,
          resumo: data.resumo,
          conteudo: data.conteudo,
          autor: data.autor,
          tempo_leitura: data.tempo_leitura,
          categoria: data.categoria,
          seo_title: data.seo_title,
          seo_description: data.seo_description,
          seo_keywords: data.seo_keywords,
          data_agendada: data.data_agendada
            ? formatToDatetimeLocal(data.data_agendada)
            : '',
        })
        if (data.imagem) setCurrentImage(getImageUrl(data, data.imagem))
      })
    }
  }, [id])

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target
    setFormData((prev) => {
      const updated = { ...prev, [name]: value }
      if (name === 'titulo' && !id) {
        updated.slug = value
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)+/g, '')
      }
      return updated
    })
  }

  const handleAiChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target
    setAiForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = () => {
    if (fileInputRef.current?.files?.[0]) {
      setSelectedFile(null)
      setCurrentImage(URL.createObjectURL(fileInputRef.current.files[0]))
    }
  }

  const handleSave = async (status: 'rascunho' | 'publicado') => {
    setIsSubmitting(true)
    setErrors({})

    try {
      const data = new FormData()
      Object.entries(formData).forEach(([key, value]) => {
        if (key !== 'data_agendada') data.append(key, String(value))
      })
      data.append('status', status)
      data.append('user_id', user?.id || '')

      if (formData.data_agendada) {
        data.append(
          'data_agendada',
          new Date(formData.data_agendada).toISOString(),
        )
      } else {
        data.append('data_agendada', '')
      }

      if (status === 'publicado') {
        data.append('data_publicacao', new Date().toISOString())
      }

      if (selectedFile) {
        data.append('imagem', selectedFile)
      } else if (fileInputRef.current?.files?.[0]) {
        data.append('imagem', fileInputRef.current.files[0])
      }

      if (id) await updateArtigo(id, data)
      else await createArtigo(data)

      navigate('/admin/artigos')
    } catch (error) {
      setErrors(extractFieldErrors(error))
    } finally {
      setIsSubmitting(false)
    }
  }

  const validateSEO = () => {
    const isValid =
      formData.seo_title.length > 10 &&
      formData.seo_description.length > 50 &&
      formData.seo_keywords.length > 5
    setSeoValid(isValid)
    setTimeout(() => setSeoValid(null), 3000)
  }

  const getComprimentoLabel = (val: string) => {
    if (val === '1') return 'Curto (500 words)'
    if (val === '2') return 'Médio (1000 words)'
    if (val === '3') return 'Longo (1500 words)'
    if (val === '4') return 'Muito Longo (3000 words)'
    return 'Épico (5000 words)'
  }

  const getComprimentoString = (val: string) => {
    if (val === '1') return '500'
    if (val === '2') return '1000'
    if (val === '3') return '1500'
    if (val === '4') return '3000'
    return '5000'
  }

  const handleGenerateAI = async () => {
    if (!aiForm.tema.trim()) {
      setAiError('O tema do artigo é obrigatório.')
      return
    }

    setIsGenerating(true)
    setAiError('')

    try {
      const response = await pb.send('/backend/v1/artigos/gerar-ia', {
        method: 'POST',
        body: JSON.stringify({
          tema: aiForm.tema,
          categoria: aiForm.categoria,
          tom: aiForm.tom,
          comprimento: getComprimentoString(aiForm.comprimento),
        }),
      })

      const aiData = response.data || response

      setFormData((prev) => ({
        ...prev,
        titulo: aiData.titulo || prev.titulo,
        slug: aiData.titulo
          ? aiData.titulo
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, '-')
              .replace(/(^-|-$)+/g, '')
          : prev.slug,
        resumo: aiData.resumo || prev.resumo,
        conteudo: aiData.conteudo || prev.conteudo,
        seo_keywords: Array.isArray(aiData.keywords_sugeridas)
          ? aiData.keywords_sugeridas.join(', ')
          : aiData.keywords_sugeridas || prev.seo_keywords,
        categoria: aiForm.categoria,
      }))

      setAiSentiment(aiData.analise_sentimento || '')
      setSeoSuggestions({
        title: aiData.seo_title_sugestao || '',
        description: aiData.seo_description_sugestao || '',
      })

      setIsAiModalOpen(false)
      toast({
        title: 'Sucesso!',
        description: 'Artigo gerado com sucesso! Revise as sugestões.',
      })
    } catch (error: any) {
      setAiError(error?.response?.error || 'Erro ao gerar artigo.')
      toast({
        title: 'Erro na geração',
        description: 'Tente novamente.',
        variant: 'destructive',
      })
    } finally {
      setIsGenerating(false)
    }
  }

  const applySeo = () => {
    if (seoSuggestions) {
      setFormData((prev) => ({
        ...prev,
        seo_title: seoSuggestions.title,
        seo_description: seoSuggestions.description,
      }))
      toast({
        title: 'SEO Aplicado',
        description: 'Meta Title e Description atualizados.',
      })
      setSeoSuggestions(null)
    }
  }

  const searchUnsplash = async () => {
    setIsSearchingUnsplash(true)
    try {
      const query = unsplashQuery || formData.titulo || 'technology'
      const res = await pb.send(
        `/backend/v1/unsplash/search?q=${encodeURIComponent(query)}`,
        { method: 'GET' },
      )
      setUnsplashImages(res.results || [])
    } catch (error) {
      toast({
        title: 'Erro',
        description: 'Não foi possível buscar imagens.',
        variant: 'destructive',
      })
    } finally {
      setIsSearchingUnsplash(false)
    }
  }

  const selectUnsplashImage = async (url: string) => {
    try {
      setIsDownloadingImage(true)
      const response = await fetch(url)
      const blob = await response.blob()
      const file = new File([blob], 'unsplash_cover.jpg', { type: blob.type })

      setSelectedFile(file)
      setCurrentImage(url)
      if (fileInputRef.current) fileInputRef.current.value = ''
      setIsUnsplashModalOpen(false)
      toast({
        title: 'Imagem Aplicada',
        description: 'Imagem do Unsplash selecionada.',
      })
    } catch (error) {
      toast({
        title: 'Erro',
        description: 'Falha ao processar a imagem selecionada.',
        variant: 'destructive',
      })
    } finally {
      setIsDownloadingImage(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/admin/artigos')}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            {id ? 'Editar Artigo' : 'Novo Artigo'}
          </h2>
        </div>
        <div className="flex gap-3">
          {!id && (
            <Button
              variant="secondary"
              onClick={() => setIsAiModalOpen(true)}
              className="gap-2 bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800"
            >
              <Sparkles className="h-4 w-4" /> Gerar com IA
            </Button>
          )}
          <Button
            variant="outline"
            onClick={() => handleSave('rascunho')}
            disabled={isSubmitting}
            className="gap-2"
          >
            <Save className="h-4 w-4" /> Salvar Rascunho
          </Button>
          <Button
            onClick={() => handleSave('publicado')}
            disabled={isSubmitting}
            className="gap-2 bg-green-600 hover:bg-green-700 text-white"
          >
            <Send className="h-4 w-4" /> Publicar
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {aiSentiment && (
            <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg flex items-start gap-3 border border-purple-100 dark:border-purple-900/50">
              <Sparkles className="h-5 w-5 text-purple-600 dark:text-purple-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-semibold text-purple-800 dark:text-purple-300">
                  Análise de Voz da Marca
                </h4>
                <p className="text-sm text-purple-700 dark:text-purple-400 mt-1">
                  {aiSentiment}
                </p>
              </div>
            </div>
          )}

          <div className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 space-y-4">
            <div>
              <label className="text-sm font-medium mb-1 block">Título</label>
              <Input
                name="titulo"
                value={formData.titulo}
                onChange={handleChange}
                required
              />
              {errors.titulo && (
                <p className="text-sm text-red-500 mt-1">{errors.titulo}</p>
              )}
            </div>

            <div>
              <label className="text-sm font-medium mb-1 block">
                Resumo (max 150 caracteres)
              </label>
              <textarea
                name="resumo"
                value={formData.resumo}
                onChange={handleChange}
                maxLength={150}
                className="w-full flex min-h-[80px] rounded-md border border-slate-200 bg-transparent px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 dark:border-slate-800"
              />
              <div className="text-xs text-right text-slate-500 mt-1">
                {formData.resumo.length}/150
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-1 block">Conteúdo</label>
              <textarea
                name="conteudo"
                value={formData.conteudo}
                onChange={handleChange}
                required
                className="w-full flex min-h-[400px] rounded-md border border-slate-200 bg-transparent px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 dark:border-slate-800"
              />
              {errors.conteudo && (
                <p className="text-sm text-red-500 mt-1">{errors.conteudo}</p>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 space-y-4">
            <h3 className="font-semibold text-lg border-b border-slate-100 dark:border-slate-800 pb-2">
              Configurações
            </h3>

            <div>
              <label className="text-sm font-medium mb-1 block">
                Slug (URL)
              </label>
              <Input
                name="slug"
                value={formData.slug}
                onChange={handleChange}
              />
              {errors.slug && (
                <p className="text-sm text-red-500 mt-1">{errors.slug}</p>
              )}
            </div>

            <div>
              <label className="text-sm font-medium mb-1 block">
                Data de Publicação Agendada
              </label>
              <Input
                type="datetime-local"
                name="data_agendada"
                value={formData.data_agendada}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-1 block">
                Categoria
              </label>
              <select
                name="categoria"
                value={formData.categoria}
                onChange={handleChange}
                className="w-full h-10 px-3 py-2 rounded-md border border-slate-200 dark:border-slate-800 bg-transparent text-sm"
              >
                <option value="IA">IA</option>
                <option value="Segurança">Segurança</option>
                <option value="Cloud">Cloud</option>
                <option value="Infraestrutura">Infraestrutura</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium mb-1 block">Autor</label>
              <Input
                name="autor"
                value={formData.autor}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
              <h3 className="font-semibold text-lg flex items-center gap-2">
                <ImageIcon className="h-5 w-5" /> Imagem de Capa
              </h3>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setUnsplashQuery(formData.titulo)
                  setIsUnsplashModalOpen(true)
                  searchUnsplash()
                }}
                className="h-8 gap-1.5 text-xs"
              >
                <Search className="h-3 w-3" /> Buscar Imagem
              </Button>
            </div>

            {currentImage && (
              <img
                src={currentImage}
                alt="Capa atual"
                className="w-full h-32 object-cover rounded-md mb-2"
              />
            )}

            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/png, image/jpeg, image/webp"
              className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
            />
          </div>

          <div className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-2">
              <h3 className="font-semibold text-lg">SEO</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={validateSEO}
                className="h-7 text-xs px-2"
              >
                Validar
              </Button>
            </div>

            {seoSuggestions && (
              <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-md border border-blue-100 dark:border-blue-900/50">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-semibold text-blue-800 dark:text-blue-300">
                    Sugestões de IA
                  </span>
                  <Button
                    size="sm"
                    variant="secondary"
                    className="h-6 text-[10px] px-2"
                    onClick={applySeo}
                  >
                    Aplicar SEO
                  </Button>
                </div>
                <p
                  className="text-[11px] text-blue-700 dark:text-blue-400 mb-1 line-clamp-1"
                  title={seoSuggestions.title}
                >
                  <b>Title:</b> {seoSuggestions.title}
                </p>
                <p
                  className="text-[11px] text-blue-700 dark:text-blue-400 line-clamp-2"
                  title={seoSuggestions.description}
                >
                  <b>Desc:</b> {seoSuggestions.description}
                </p>
              </div>
            )}

            {seoValid !== null && (
              <div
                className={`text-xs p-2 rounded flex items-center gap-1 ${seoValid ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}
              >
                <CheckCircle2 className="h-3 w-3" />{' '}
                {seoValid
                  ? 'SEO preenchido corretamente'
                  : 'Preencha mais detalhes para SEO'}
              </div>
            )}

            <div>
              <label className="text-sm font-medium mb-1 block text-slate-600">
                Meta Title
              </label>
              <Input
                name="seo_title"
                value={formData.seo_title}
                onChange={handleChange}
                className="h-9 text-sm"
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-1 block text-slate-600">
                Meta Description
              </label>
              <textarea
                name="seo_description"
                value={formData.seo_description}
                onChange={handleChange}
                className="w-full flex min-h-[60px] rounded-md border border-slate-200 bg-transparent px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 dark:border-slate-800"
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-1 block text-slate-600">
                Keywords (separadas por vírgula)
              </label>
              <Input
                name="seo_keywords"
                value={formData.seo_keywords}
                onChange={handleChange}
                className="h-9 text-sm"
              />
            </div>
          </div>
        </div>
      </div>

      {isAiModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-950 rounded-xl shadow-xl w-full max-w-lg overflow-hidden border border-slate-200 dark:border-slate-800">
            <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-900/50">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-blue-600" /> Gerar Artigo
              </h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => !isGenerating && setIsAiModalOpen(false)}
                disabled={isGenerating}
                className="h-8 w-8"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="p-6 space-y-5">
              {aiError && (
                <div className="p-3 bg-red-50 text-red-600 text-sm rounded-md">
                  {aiError}
                </div>
              )}

              <div>
                <label className="text-sm font-medium mb-1.5 block">
                  Tema do artigo *
                </label>
                <Input
                  name="tema"
                  value={aiForm.tema}
                  onChange={handleAiChange}
                  disabled={isGenerating}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-1.5 block">
                    Categoria
                  </label>
                  <select
                    name="categoria"
                    value={aiForm.categoria}
                    onChange={handleAiChange}
                    disabled={isGenerating}
                    className="w-full h-10 px-3 rounded-md border border-slate-200 dark:border-slate-800 bg-transparent"
                  >
                    <option value="IA">IA</option>
                    <option value="Segurança">Segurança</option>
                    <option value="Cloud">Cloud</option>
                    <option value="Infraestrutura">Infraestrutura</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">
                    Tom
                  </label>
                  <select
                    name="tom"
                    value={aiForm.tom}
                    onChange={handleAiChange}
                    disabled={isGenerating}
                    className="w-full h-10 px-3 rounded-md border border-slate-200 dark:border-slate-800 bg-transparent"
                  >
                    <option value="Técnico">Técnico</option>
                    <option value="Educativo">Educativo</option>
                    <option value="Notícia">Notícia</option>
                  </select>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-sm font-medium">
                    Comprimento Máximo
                  </label>
                  <span className="text-xs text-slate-500 font-medium">
                    {getComprimentoLabel(aiForm.comprimento)}
                  </span>
                </div>
                <input
                  type="range"
                  name="comprimento"
                  min="1"
                  max="5"
                  step="1"
                  value={aiForm.comprimento}
                  onChange={handleAiChange}
                  disabled={isGenerating}
                  className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <div className="flex justify-between text-[10px] text-slate-400 mt-1 px-1">
                  <span>500</span>
                  <span>1000</span>
                  <span>1500</span>
                  <span>3000</span>
                  <span>5000</span>
                </div>
              </div>
            </div>

            <div className="px-6 py-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 flex justify-end gap-3">
              <Button
                variant="outline"
                onClick={() => setIsAiModalOpen(false)}
                disabled={isGenerating}
              >
                Cancelar
              </Button>
              <Button
                onClick={handleGenerateAI}
                disabled={isGenerating || !aiForm.tema.trim()}
                className="bg-blue-600 hover:bg-blue-700 text-white min-w-[140px]"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Gerando...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" /> Gerar Conteúdo
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      )}

      {isUnsplashModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 p-4">
          <div className="bg-white dark:bg-slate-950 rounded-xl w-full max-w-4xl max-h-[85vh] flex flex-col border border-slate-200 dark:border-slate-800">
            <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-900/50">
              <h3 className="font-semibold text-lg flex items-center gap-2">
                <Search className="h-5 w-5 text-blue-600" /> Imagens do Unsplash
              </h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsUnsplashModalOpen(false)}
                disabled={isDownloadingImage}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="p-6 flex-1 overflow-y-auto space-y-4">
              <div className="flex gap-2 mb-6">
                <Input
                  value={unsplashQuery}
                  onChange={(e) => setUnsplashQuery(e.target.value)}
                  placeholder="Buscar imagens (ex: technology, cloud, office)..."
                  onKeyDown={(e) => e.key === 'Enter' && searchUnsplash()}
                />
                <Button
                  onClick={searchUnsplash}
                  disabled={isSearchingUnsplash || isDownloadingImage}
                >
                  {isSearchingUnsplash ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    'Buscar'
                  )}
                </Button>
              </div>

              {isDownloadingImage ? (
                <div className="py-20 flex flex-col items-center justify-center text-slate-500">
                  <Loader2 className="h-8 w-8 animate-spin mb-4 text-blue-500" />
                  <p>Preparando imagem selecionada...</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {unsplashImages.map((img: any) => (
                    <div
                      key={img.id}
                      className="relative aspect-video rounded-md overflow-hidden cursor-pointer hover:ring-2 hover:ring-blue-500 group bg-slate-100 dark:bg-slate-900"
                      onClick={() => selectUnsplashImage(img.urls.regular)}
                    >
                      <img
                        src={img.urls.small}
                        alt={img.alt_description}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center transition-opacity duration-200">
                        <span className="text-white text-sm font-medium mb-1">
                          Usar Imagem
                        </span>
                        <span className="text-slate-300 text-[10px]">
                          por {img.user.name}
                        </span>
                      </div>
                    </div>
                  ))}
                  {unsplashImages.length === 0 && !isSearchingUnsplash && (
                    <div className="col-span-full py-12 text-center text-slate-500">
                      Nenhuma imagem encontrada. Tente outros termos em inglês.
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
