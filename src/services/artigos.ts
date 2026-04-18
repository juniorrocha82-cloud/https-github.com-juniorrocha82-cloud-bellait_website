import pb from '@/lib/pocketbase/client'
import { RecordModel } from 'pocketbase'

export interface Artigo extends RecordModel {
  titulo: string
  slug: string
  resumo: string
  conteudo: string
  imagem: string
  autor: string
  data_publicacao: string
  tempo_leitura: number
  status: 'rascunho' | 'publicado'
  seo_title: string
  seo_description: string
  seo_keywords: string
  categoria: string
  user_id: string
}

export const getArtigos = async (status?: string, search?: string) => {
  const filters: string[] = []
  if (status && status !== 'Todos')
    filters.push(`status = "${status.toLowerCase()}"`)
  if (search) filters.push(`titulo ~ "${search}"`)

  return pb.collection('artigos').getFullList<Artigo>({
    filter: filters.length > 0 ? filters.join(' && ') : '',
    sort: '-created',
    expand: 'user_id',
  })
}

export const getPublishedArtigos = async () => {
  return pb.collection('artigos').getFullList<Artigo>({
    filter: 'status = "publicado"',
    sort: '-data_publicacao',
  })
}

export const getArtigoBySlug = async (slug: string) => {
  return pb.collection('artigos').getFirstListItem<Artigo>(`slug="${slug}"`)
}

export const getArtigoById = async (id: string) => {
  return pb.collection('artigos').getOne<Artigo>(id)
}

export const createArtigo = async (formData: FormData) => {
  return pb.collection('artigos').create<Artigo>(formData)
}

export const updateArtigo = async (id: string, formData: FormData) => {
  return pb.collection('artigos').update<Artigo>(id, formData)
}

export const deleteArtigo = async (id: string) => {
  return pb.collection('artigos').delete(id)
}

export const getImageUrl = (record: RecordModel, filename: string) => {
  if (!filename) return ''
  return pb.files.getURL(record, filename)
}
