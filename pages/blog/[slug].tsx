import React from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import ErrorPage from 'next/error';
import Link from 'next/link';

import { postImageSizes } from 'constants/Post';

import Meta from 'components/Meta';
import PostRichText from 'components/Post/PostRichText';
import PostShare from 'components/Post/Share';
import Layout from 'layouts/Page';

import { IPost } from 'interfaces/Post.interface';

import { getAllPostsWithSlug, getPostAndMorePosts } from 'services/contentful';

import { getPostDate, getPostDay } from 'utils/Post';

interface IProps {
  post: IPost;
}

const BlogPage = ({ post }: IProps): JSX.Element => {
  const router = useRouter();

  if (!post) {
    return <ErrorPage statusCode={404} />;
  }

  const { title, content, image } = post;

  const hasPostImage = image?.post;
  const postUrl = `${process.env.NEXT_PUBLIC_DOMAIN_URL}${router.asPath}`;
  const postDay = getPostDay(post.date);
  const postDate = getPostDate(post.date);

  return (
    <Layout>
      <Meta title={title} />
      <h3 className="text-gray-700 text-4xl font-bold leading-none my-6 text-center">
        {title}
      </h3>

      <div className="container  mx-auto px-2">
        <div className="mt-2 mb-4 text-center">
          <time className="text-lg">
            <span className="capitalize">{postDay}</span>, {postDate}
          </time>
        </div>
        <hr className="my-8 w-full" />
        <div className="max-w-4xl mx-auto my-2 text-xl">
          {hasPostImage && (
            <div className="mb-8">
              <img
                alt={title}
                height={postImageSizes.height}
                src={image.post}
                width={postImageSizes.width}
              />
            </div>
          )}

          <PostRichText
            className="text-gray-700 leading-relaxed"
            content={content}
          />
          <hr className="mt-8 mb-12 w-full" />
          <div className="flex justify-between flex-col-reverse sm:flex-row">
            <div className="flex items-center">
              <Link href="/blog">
                <a className="text-green-700">← Назад в блог</a>
              </Link>
            </div>
            <PostShare
              className="text-center sm:text-right mb-4 sm:mb-0"
              title={title}
              url={postUrl}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const allPosts = await getAllPostsWithSlug();

  return {
    paths: allPosts?.map(({ slug }) => `/blog/${slug}`) ?? [],
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({
  params,
  preview = false,
}) => {
  const data = await getPostAndMorePosts(params.slug as string);

  return {
    props: {
      preview,
      post: data?.post ?? null,
    },
  };
};

export default BlogPage;
