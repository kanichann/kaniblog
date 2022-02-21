import { getTags, getTagsPosts } from "../../lib/js/posts-util";
import PostList from "../../components/posts/post-list";
import Head from "next/head";
import { Fragment } from "react";
import About from "../../components/about";
function PostDetailPage(props) { 
    return (
        <Fragment>
        <Head>
                <title>TAG:{props.slug}</title>
                <meta name='description' content={`TAG:${props.slug}`}/>
            </Head>
            <article>
            <h1 className="title-sec1">TAG:{props.slug}</h1>
                <PostList posts={props.posts} />
                <About tags={props.tags}/>
            </article>
        </Fragment>
    )
}

export function getStaticProps(context) {
    const { params } = context;
    const { slug } = params;
    const postData = getTagsPosts(slug);
    const tags = getTags();
    return {
        props: {
            posts: postData,
            tags: tags,
            slug:slug
        },
        revalidate:600
    }
};

export function getStaticPaths() {
    const tags = getTags();
    return {
        paths: tags.map(tag => ({params:{slug:tag}})),
        fallback: 'blocking'
    }
}

export default PostDetailPage;