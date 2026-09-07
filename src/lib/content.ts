import { getCollection, getEntry, type CollectionEntry } from "astro:content"

export type Post = CollectionEntry<"posts">

export async function getPosts(): Promise<Post[]> {
  return getCollection("posts")
}

export async function getPostById(id: string): Promise<Post | undefined> {
  return getEntry("posts", id)
}
