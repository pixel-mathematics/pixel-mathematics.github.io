import { getCollection, type CollectionEntry } from "astro:content"

export type Post = CollectionEntry<"posts">

export function getPosts(): Promise<Post[]> {
  return getCollection("posts")
}
