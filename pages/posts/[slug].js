import Image from "next/image";
import { getPostData, getTags, postFiles } from "../../lib/js/posts-util";
import ReactMarkdown from "react-markdown";
import Head from "next/head";
import { Fragment } from "react";
import About from "../../components/about";

function PostDetailPage(props) {
    const { title, image, excerpt, date, content, slug } = props.post;
    const customRenderers = {
        img(image) {
            return (<Image src={`/img/posts/${slug}${image.src}`} alt={image.alt} height={600} width={300} />)
        },
        // h2({ node, ...props }) {
        //     return <h2>{props.children}</h2></section>
        // }
    } 
    return (
        <Fragment>
            <Head>
                <title>{title}</title>
                <meta name='description' content={ excerpt}/>
            </Head>
        <article className="max-w-2xl">
            <h1 className="title-sec1">{title}</h1>
            <time>{date}</time>
            <div>
            <Image src={`/img/posts/${image}`}  width={1440} height={960}/>
            </div>
            <p>{excerpt}</p>

            <ReactMarkdown className="markdown" components={customRenderers}>
                {content}
            </ReactMarkdown>
            <About tags={props.tags}/>
    </article>
        </Fragment>
    )
}

export function getStaticProps(context) {
    const { params } = context;
    const { slug } = params;
    const postData = getPostData(slug);
    const tags = getTags();
    return {
        props: {
            post: postData,
            tags:tags
        },
        revalidate:600
    }
};

export function getStaticPaths() {
    const postFilenames = postFiles();
    const slugs = postFilenames.map(fileName => fileName.replace(/\.md$/, ''));
    return {
        paths: slugs.map(slug => ({params:{slug:slug}})),
        fallback:'blocking'
    }
}

export default PostDetailPage;