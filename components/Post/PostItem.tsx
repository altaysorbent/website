import React from 'react';
import Link from 'next/link';

import PostRichText from 'components/Post/PostRichText';

import { IPost } from 'interfaces/Post.interface';

import { getPostDate, getPostDay } from 'utils/Post';

interface IProps {
  post: IPost;
}

const PostItem = ({ post }: IProps): JSX.Element => {
  const postDay = getPostDay(post.date);
  const postDate = getPostDate(post.date);

  return (
    <article className="space-y-2 xl:grid xl:grid-cols-4 xl:space-y-0 xl:items-baseline">
      <dl>
        <dt className="sr-only">Дата публикации</dt>
        <dd className="text-base font-medium text-gray-700">
          <span className="capitalize">{postDay}</span>, {postDate}
        </dd>
      </dl>
      <div className="space-y-5 xl:col-span-3 text-xl">
        <div className="space-y-6">
          <h2 className="text-2xl font-bold tracking-tight">
            <Link href={`/blog/${post.slug}`}>{post.title}</Link>
          </h2>
          <PostRichText json={post.annotation.json} />
        </div>
        <div className="font-medium">
          <Link href={`/blog/${post.slug}`}>
            <a className="mx-auto text-green-700">Читать далее →</a>
          </Link>
        </div>
      </div>
    </article>
  );
};

export default PostItem;
