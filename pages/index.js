import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { Fragment } from 'react'
import PostList from '../components/posts/post-list'
import About from '../components/about'
import { getFeaturedPosts, getAllPosts, getTags } from '../lib/js/posts-util'

export default function Home(props) {

  return (
    <Fragment>
      <Head>
        <title>KaniBlog</title>
        <meta name='description' content='WEB関係のお仕事をしております。日々の学習について気ままに発信します。' />
      </Head>
      <div className='text-right max-w-5xl mx-auto relative'>
        <h1 className='absolute z-20 top-1/2 text-3xl md:text-xl sm:text-lg left-1/4 -translate-x-1/2 md:-translate-x-1/4 transform'>よわよわフロントエンド日記</h1>
        <div className='max-w-2xl inline-block'>
        <Image src='/img/main.svg' width={951} height={760}/>
        </div>
      </div>
      <article>
        {/* <section className='mt-16 mb-24'>
          <h2 className='title-sec2'>人気の記事</h2>
          <PostList posts={props.featuredPosts} />
          <div className='text-right'>
            <Link href="/"><a className='btn'>他の記事</a></Link>
          </div>
        </section> */}
        <section className='mt-16 mb-24'>
          <h2 className='title-sec2'>新着記事</h2>
          <PostList posts={props.allPosts} />
          <div className='text-right'>
            <Link href="/posts"><a className='btn'>他の記事</a></Link>
          </div>
        </section>
        {/* <section className='text-center mx-auto border-gray-200 bg-gray-50 border-2 py-4 border-solid w-3/5 md:w-full'>
          <h2 className='title-sec2'>PORTFOLIO</h2>
          <p className='mb-8'>日々の学習の記録、制作物はこちら</p>
          <Link href="/"><a className='btn-sub'>詳しく見る</a></Link>
        </section> */}
        {/* <div className='flex justify-center gap-16 md:gap-x-8 sm:flex-col sm:gap-8'>
          <div className='w-full'>
            <dl>
              <dt className='title-sec2'>About</dt>
              <dd>
                <p className='mb-2'>ゆるくWEBのフロントを勉強中です。</p>
                <ul>
                  <li><a href="" className='w-10 inline-block'><Image objectFit='contein' src='/sns/twitter.png' width={40} height={40} /></a></li>
                </ul>
              </dd>
            </dl>
          </div>
          <div className='w-full'>
            <dl>
              <dt className='title-sec2'>TAG</dt>
              <dd>
                <ul className='flex gap-4 flex-wrap'>
                  {props.tags.map(tag => (<li key={tag} className='rounded-full border border-solid border-gray-300 bg-gray-100 px-3 text-gray-600 btn-bg'><Link href={`/tag/${tag}`}>{tag}</Link></li>))}
                </ul></dd>
            </dl>
          </div>
        </div> */}
        <About tags={props.tags}/>
        
      </article>
    </Fragment>

  )
}

export function getStaticProps() {
  let featuredPosts = getFeaturedPosts();
  if (featuredPosts.length > 3) {
    featuredPosts = featuredPosts.slice(0, 3)
  }
  let allPosts = getAllPosts();
  if (featuredPosts.length > 3) {
    allPosts = allPosts.slice(0, 3)
  }
  const tags = getTags();
  return {
    props: {
      featuredPosts: featuredPosts,
      allPosts: allPosts,
      tags: tags
    },
    // revalidate:60
  }
}
