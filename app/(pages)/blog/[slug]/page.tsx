import Link from 'next/link';
import Image from 'next/image';

import { notFound } from 'next/navigation';
import { postImageSizes } from '@/lib/constants/Post';

import PostRichText from '@/components/Post/PostRichText';
import PostShare from '@/components/Post/Share';

import { getPostAndMorePosts } from '@/lib/services/contentful';

import { getPostDate, getPostDay } from '@/components/Post/utils/Post';
import type { Metadata } from 'next';

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const slug = params.slug;
    const { post } = await getPostAndMorePosts(slug);
    return { title: post?.title };
  } catch {
    return {
      title: 'Not Found',
      description: 'The page you are looking for does not exist',
    };
  }
}

export default async function BlogPage({ params }: Props) {
  const { post } = await getPostAndMorePosts(params.slug as string);
  if (!post) {
    notFound();
  }

  const { title, content, image } = post;

  const hasPostImage = image?.post;
  const postUrl = `${process.env.NEXT_PUBLIC_DOMAIN_URL}${params.slug}`;
  const postDay = getPostDay(post.date);
  const postDate = getPostDate(post.date);

  return (
    <>
      <h3 className="my-6 text-center text-4xl font-bold leading-none text-gray-700">
        {title}
      </h3>

      <div className="container mx-auto px-2">
        <div className="mb-4 mt-2 text-center">
          <time className="text-lg">
            <span className="capitalize">{postDay}</span>, {postDate}
          </time>
        </div>
        <hr className="my-8 w-full" />
        <div className="mx-auto my-2 max-w-4xl text-xl">
          {hasPostImage && (
            <div className="mb-8">
              <Image
                src={image.post}
                alt={title}
                width={postImageSizes.width}
                height={postImageSizes.height}
              />
            </div>
          )}

          <PostRichText
            className="leading-relaxed text-gray-700"
            content={content}
          />
          <hr className="mb-12 mt-8 w-full" />
          <div className="flex flex-col-reverse justify-between sm:flex-row">
            <div className="flex items-center">
              <Link className="text-green-700" href="/blog">
                ← Назад в блог
              </Link>
            </div>
            <PostShare
              className="mb-4 text-center sm:mb-0 sm:text-right"
              title={title}
              url={postUrl}
            />
          </div>
        </div>
      </div>
    </>
  );
}
