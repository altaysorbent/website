import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { previewImageSizes } from 'constants/Post';

import PostRichText from 'components/Post/PostRichText';

import { IPost } from 'interfaces/Post.interface';

import { getPostDate, getPostDay } from 'utils/Post';

interface IProps {
  post: IPost;
}

const PostItem = ({ post }: IProps): JSX.Element => {
  const postDay = getPostDay(post.date);
  const postDate = getPostDate(post.date);

  const hasPreviewImage = post.image?.preview;
  const postUrl = `/blog/${post.slug}`;

  return (
    <article className="text-xl">
      <h2 className="text-2xl font-bold tracking-tight">
        <Link href={postUrl}>{post.title}</Link>
      </h2>
      <dl className="my-4">
        <dt className="sr-only">Дата публикации</dt>
        <dd className="text-lg font-medium text-gray-600">
          <span className="capitalize">{postDay}</span>, {postDate}
        </dd>
      </dl>
      {hasPreviewImage && (
        <div className="mb-8">
          <Link href={postUrl}>
            <a>
              <Image
                alt={post.title}
                height={previewImageSizes.height}
                src={post.image.preview}
                width={previewImageSizes.width}
              />
            </a>
          </Link>
        </div>
      )}
      <PostRichText className="mb-4" json={post.annotation.json} />

      <div className="font-medium">
        <Link href={postUrl}>
          <a className="mx-auto text-green-700">Читать далее →</a>
        </Link>
      </div>
    </article>
  );
};

export default PostItem;
