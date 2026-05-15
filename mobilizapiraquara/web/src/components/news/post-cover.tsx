import Image from "next/image";
import { resolveCoverImage } from "@/lib/cover-image";
import { cn } from "@/lib/utils";

type PostCoverProps = {
  src?: string | null;
  alt: string;
  categorySlug?: string | null;
  fill?: boolean;
  className?: string;
  sizes?: string;
  priority?: boolean;
};

export function PostCover({
  src,
  alt,
  categorySlug,
  fill = true,
  className,
  sizes,
  priority,
}: PostCoverProps) {
  const imageUrl = resolveCoverImage(src, categorySlug);

  return (
    <Image
      src={imageUrl}
      alt={alt}
      fill={fill}
      className={cn("object-cover", className)}
      sizes={sizes ?? "(max-width: 768px) 100vw, 33vw"}
      priority={priority}
    />
  );
}
