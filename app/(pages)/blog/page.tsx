import React from 'react';
import { type Metadata } from 'next';

import PostItem from '@/components/Post/PostItem';

import { getAllPostsForBlog } from '@/lib/services/contentful';
import { getMeta } from '@/lib/meta';

const title = 'Блог Алтайсорбент';
export const metadata: Metadata = getMeta({ title });

export default async function BlogIndexPage() {
  const posts = (await getAllPostsForBlog()) ?? [];

  return (
    <>
      <div className="container mx-auto mb-4 max-w-4xl divide-y divide-gray-200 px-2 text-gray-700">
        <div className="space-y-2 pb-8 md:space-y-5">
          <h3 className="mb-6 text-4xl font-bold leading-none">{title}</h3>
          <p className="text-xl">
            Всё самое интересное про здоровье, монтморилонит и бентонитовые
            глины динозаврового месторождения
          </p>
        </div>
        <ul className="divide-y divide-gray-200">
          {posts.map((post) => (
            <li className="py-12" key={post.slug}>
              <PostItem post={post} />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
