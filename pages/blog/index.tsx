import React from 'react';
import { GetStaticPropsResult } from 'next';

import Meta from 'components/Meta';
import PostItem from 'components/Post/PostItem';
import Layout from 'layouts/Page';

import { IPost } from 'interfaces/Post.interface';

import { getAllPostsForBlog } from 'services/contentful';

interface IProps {
  posts: IPost[];
}

const Blog = ({ posts }: IProps): JSX.Element => {
  const title = 'Блог Алтайсорбент';

  return (
    <Layout>
      <Meta title={title} />
      <div className="container px-2 text-gray-700 max-w-4xl mx-auto mb-4 divide-y divide-gray-200">
        <div className="pb-8 space-y-2 md:space-y-5">
          <h3 className="text-4xl font-bold leading-none mb-6">{title}</h3>
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
    </Layout>
  );
};

export async function getStaticProps(): Promise<GetStaticPropsResult<IProps>> {
  const posts = (await getAllPostsForBlog()) ?? [];

  return {
    props: { posts },
  };
}

export default Blog;
