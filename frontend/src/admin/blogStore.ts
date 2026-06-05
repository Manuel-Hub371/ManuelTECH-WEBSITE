/**
 * Blog store — API-driven without localStorage fallback.
 */
import {
  fetchBlogPosts,
  apiCreateBlogPost,
  apiUpdateBlogPost,
  apiDeleteBlogPost,
  fetchBlogPostBySlug,
  type AdminBlogPost,
  type CreateBlogPostPayload,
  type UpdateBlogPostPayload,
} from './api'
import type { BlogPost } from '../data/blog'

/* ── Adapter ────────────────────────────────────────────────────── */

function toBlogPost(a: AdminBlogPost): BlogPost {
  return {
    id:          a.id,
    slug:        a.slug,
    title:       a.title,
    excerpt:     a.excerpt,
    body:        a.body ?? [],
    category:    a.category,
    tags:        a.tags ?? [],
    author:      a.author,
    authorRole:  a.authorRole,
    authorImage: a.authorImage,
    publishedAt: a.publishedAt,
    readTime:    a.readTime,
    image:       a.image,
    featured:    a.featured,
  }
}

/* ── Public API ────────────────────────────────────────────────── */

export async function loadPosts(): Promise<BlogPost[]> {
  const data = await fetchBlogPosts()
  return data.map(toBlogPost)
}

export async function loadPostBySlug(slug: string): Promise<BlogPost> {
  const data = await fetchBlogPostBySlug(slug)
  return toBlogPost(data)
}

export async function createPost(post: Omit<BlogPost, 'id'>): Promise<BlogPost> {
  const payload: CreateBlogPostPayload = {
    slug:        post.slug,
    title:       post.title,
    excerpt:     post.excerpt,
    body:        post.body,
    category:    post.category,
    tags:        post.tags,
    author:      post.author,
    authorRole:  post.authorRole,
    authorImage: post.authorImage,
    publishedAt: post.publishedAt,
    readTime:    post.readTime,
    image:       post.image,
    featured:    post.featured ?? false,
  }
  const created = await apiCreateBlogPost(payload)
  return toBlogPost(created)
}

export async function updatePost(id: string, changes: Partial<BlogPost>): Promise<BlogPost> {
  const payload: UpdateBlogPostPayload = {}
  const fields = [
    'slug', 'title', 'excerpt', 'body', 'category', 'tags',
    'author', 'authorRole', 'authorImage', 'publishedAt', 'readTime', 'image', 'featured'
  ] as const

  for (const f of fields) {
    if (changes[f] !== undefined) {
      (payload as Record<string, unknown>)[f] = changes[f]
    }
  }

  const updated = await apiUpdateBlogPost(id, payload)
  return toBlogPost(updated)
}

export async function deletePost(id: string): Promise<void> {
  await apiDeleteBlogPost(id)
}

export async function toggleFeatured(id: string, currentFeatured: boolean): Promise<BlogPost> {
  const updated = await apiUpdateBlogPost(id, { featured: !currentFeatured })
  return toBlogPost(updated)
}

/** Generate a URL-safe slug from a title */
export function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}
