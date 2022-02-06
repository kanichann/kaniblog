import { Fragment } from "react"
import Head from "next/head"
import Image from "next/image"
import { getTags } from "../lib/js/posts-util"
import About from "../components/about"

export default function Home(props) {

    return (
      <Fragment>
        <Head>
          <title>KaniBlog</title>
          <meta name='description' content='WEB関係のお仕事をしております。日々の学習について気ままに発信します。' />
        </Head>
            <article>       
            <h1 className="title-sec1">お問い合わせ</h1>    
        <div>
        <div className='mt-20 mb-16'><Image alt="kaniblog" src="/img/logo.svg" width={600} height={148} /></div>
                </div>
                <p>ご質問や、感想などのご連絡は<a className="link" href="m&#97;i&#108;t&#111;:&#102;&#114;es&#104;&#103;&#97;&#110;i&#115;&#64;&#103;m&#97;i&#108;.c&#111;m">&#102;&#114;es&#104;&#103;&#97;&#110;i&#115;&#64;&#103;m&#97;i&#108;.c&#111;m</a>までよろしくお願いいたします。</p>
                <About tags={props.tags}/>
        </article>
      </Fragment>
  
    )
}
  

export function getStaticProps() {
    const tags = getTags();
    return {
      props: {
        tags: tags
      },
      // revalidate:60
    }
  }