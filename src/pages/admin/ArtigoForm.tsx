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
  })
  const [currentImage, setCurrentImage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [seoValid, setSeoValid] = useState<boolean | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // AI Modal State
  const [isAiModalOpen, setIsAiModalOpen] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const [aiError, setAiError] = useState('')
  const [aiForm, setAiForm] = useState({
    tema: '',
    categoria: 'IA',
    tom: 'Técnico',
    comprimento: '2', // 1=Curto, 2=Médio, 3=Longo
  })

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

  const handleSave = async (status: 'rascunho' | 'publicado') => {
    setIsSubmitting(true)
    setErrors({})

    try {
      const data = new FormData()
      Object.entries(formData).forEach(([key, value]) =>
        data.append(key, String(value)),
      )
      data.append('status', status)
      data.append('user_id', user?.id || '')

      if (status === 'publicado') {
        data.append('data_publicacao', new Date().toISOString())
      }

      if (fileInputRef.current?.files?.[0]) {
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
    return 'Longo (1500 words)'
  }

  const getComprimentoString = (val: string) => {
    if (val === '1') return 'Curto'
    if (val === '2') return 'Médio'
    return 'Longo'
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

      setFormData((prev) => ({
        ...prev,
        titulo: response.titulo || prev.titulo,
        slug: response.titulo
          ? response.titulo
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, '-')
              .replace(/(^-|-$)+/g, '')
          : prev.slug,
        resumo: response.resumo || prev.resumo,
        conteudo: response.conteudo || prev.conteudo,
        seo_keywords: response.keywords_sugeridas || prev.seo_keywords,
        categoria: aiForm.categoria,
      }))

      setIsAiModalOpen(false)
      toast({
        title: 'Sucesso!',
        description: 'Artigo gerado com sucesso! Revise e publique.',
        variant: 'default',
      })
    } catch (error) {
      setAiError(
        'Erro ao gerar artigo. Verifique as configurações e tente novamente.',
      )
      toast({
        title: 'Erro na geração',
        description: 'Erro ao gerar artigo. Tente novamente.',
        variant: 'destructive',
      })
    } finally {
      setIsGenerating(false)
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
              className="gap-2 bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:hover:bg-blue-900/50 border border-blue-200 dark:border-blue-800"
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
          <div className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 space-y-4">
            <div>
              <label className="text-sm font-medium mb-1 block">Título</label>
              <Input
                name="titulo"
                value={formData.titulo}
                onChange={handleChange}
                placeholder="Título do artigo"
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
                className="w-full flex min-h-[80px] rounded-md border border-slate-200 bg-transparent px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 dark:border-slate-800 dark:focus-visible:ring-slate-300"
                placeholder="Breve resumo..."
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
                className="w-full flex min-h-[400px] rounded-md border border-slate-200 bg-transparent px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 dark:border-slate-800 dark:focus-visible:ring-slate-300"
                placeholder="Escreva o conteúdo do artigo aqui. Suporta HTML básico se necessário."
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
                Categoria
              </label>
              <select
                name="categoria"
                value={formData.categoria}
                onChange={handleChange}
                className="w-full h-10 px-3 py-2 rounded-md border border-slate-200 dark:border-slate-800 bg-transparent text-sm focus:outline-none focus:ring-1 focus:ring-primary"
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

            <div>
              <label className="text-sm font-medium mb-1 block">
                Tempo de Leitura (min)
              </label>
              <Input
                type="number"
                name="tempo_leitura"
                value={formData.tempo_leitura}
                onChange={handleChange}
                min="1"
              />
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 space-y-4">
            <h3 className="font-semibold text-lg border-b border-slate-100 dark:border-slate-800 pb-2 flex items-center gap-2">
              <ImageIcon className="h-5 w-5" /> Imagem de Capa
            </h3>

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
              accept="image/png, image/jpeg, image/webp"
              className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
            />
            <p className="text-xs text-slate-500">
              Max 5MB. Formatos: JPG, PNG, WebP.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 space-y-4">
            <h3 className="font-semibold text-lg border-b border-slate-100 dark:border-slate-800 pb-2 flex justify-between items-center">
              SEO
              <Button
                variant="ghost"
                size="sm"
                onClick={validateSEO}
                className="h-7 text-xs px-2"
              >
                Validar
              </Button>
            </h3>

            {seoValid !== null && (
              <div
                className={`text-xs p-2 rounded flex items-center gap-1 ${seoValid ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}
              >
                <CheckCircle2 className="h-3 w-3" />{' '}
                {seoValid
                  ? 'SEO preenchido corretamente'
                  : 'Preencha mais detalhes para SEO ideal'}
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

      {/* AI Generation Modal */}
      {isAiModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-950 rounded-xl shadow-xl w-full max-w-lg overflow-hidden border border-slate-200 dark:border-slate-800">
            <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-900/50">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                Gerar Artigo com IA
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
                <div className="p-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm rounded-md border border-red-200 dark:border-red-900/50 flex flex-col gap-2">
                  <p>{aiError}</p>
                </div>
              )}

              <div>
                <label className="text-sm font-medium mb-1.5 block text-slate-700 dark:text-slate-300">
                  Tema do artigo *
                </label>
                <Input
                  name="tema"
                  value={aiForm.tema}
                  onChange={handleAiChange}
                  placeholder="Ex: Segurança em Cloud Computing"
                  disabled={isGenerating}
                  className="bg-white dark:bg-slate-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-1.5 block text-slate-700 dark:text-slate-300">
                    Categoria
                  </label>
                  <select
                    name="categoria"
                    value={aiForm.categoria}
                    onChange={handleAiChange}
                    disabled={isGenerating}
                    className="w-full h-10 px-3 py-2 rounded-md border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="IA">IA</option>
                    <option value="Segurança">Segurança</option>
                    <option value="Cloud">Cloud</option>
                    <option value="Infraestrutura">Infraestrutura</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block text-slate-700 dark:text-slate-300">
                    Tom
                  </label>
                  <select
                    name="tom"
                    value={aiForm.tom}
                    onChange={handleAiChange}
                    disabled={isGenerating}
                    className="w-full h-10 px-3 py-2 rounded-md border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Técnico">Técnico</option>
                    <option value="Educativo">Educativo</option>
                    <option value="Notícia">Notícia</option>
                  </select>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Comprimento
                  </label>
                  <span className="text-xs text-slate-500 font-medium">
                    {getComprimentoLabel(aiForm.comprimento)}
                  </span>
                </div>
                <input
                  type="range"
                  name="comprimento"
                  min="1"
                  max="3"
                  step="1"
                  value={aiForm.comprimento}
                  onChange={handleAiChange}
                  disabled={isGenerating}
                  className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <div className="flex justify-between text-xs text-slate-400 mt-1">
                  <span>Curto</span>
                  <span>Médio</span>
                  <span>Longo</span>
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
              {aiError ? (
                <Button
                  onClick={handleGenerateAI}
                  disabled={isGenerating}
                  className="bg-blue-600 hover:bg-blue-700 text-white min-w-[140px]"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />{' '}
                      Gerando...
                    </>
                  ) : (
                    'Tentar Novamente'
                  )}
                </Button>
              ) : (
                <Button
                  onClick={handleGenerateAI}
                  disabled={isGenerating || !aiForm.tema.trim()}
                  className="bg-blue-600 hover:bg-blue-700 text-white min-w-[140px]"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Gerando
                      artigo com IA...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-4 w-4" /> Gerar Conteúdo
                    </>
                  )}
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
