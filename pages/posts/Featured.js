import { Fragment } from "react"
import PostList from "../../components/posts/post-list"
import { getFeaturedPosts, getTags } from "../../lib/js/posts-util";
import Head from "next/head";
import About from "../../components/about";
function featuredPosts(props) {
    return (
        <Fragment>
            <Head>
                <title>おすすめの記事</title>
                <meta name='description' content='全ての記事' />
            </Head>
            <article>
                <h1 className="title-sec1">全ての投稿</h1>
                <PostList posts={props.posts} />
                <About tags={props.tags}/>
            </article>
        </Fragment>
    )
}
export function getStaticProps() {
    const featuredPosts = getFeaturedPosts();
    const tags = getTags();
    return {
        props: {
            posts: featuredPosts,
            tags: tags
        },
        revalidate:60 * 60 * 5
    }
}

export default featuredPosts
