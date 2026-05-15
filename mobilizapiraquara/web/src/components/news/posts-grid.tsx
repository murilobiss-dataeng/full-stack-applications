import { PostCard } from "@/components/news/post-card";
import type { PostCard as PostCardType } from "@/types/post";

export function PostsGrid({ posts }: { posts: PostCardType[] }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {posts.map((post, i) => (
        <PostCard key={post.id} post={post} priority={i < 3} />
      ))}
    </div>
  );
}
