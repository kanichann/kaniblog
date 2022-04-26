import { useState, useRef, Fragment } from "react"

import Head from "next/head"
import { getTags } from "../lib/js/posts-util"
import { getSoliloquy } from "../lib/js/soliloquy-util"
import About from "../components/about"

export default function Home(props) {
  let key = 0;
  let soliDate;


  function continued(soli, key) {
    return (<dd key={key} className="relative pl-8 text-lg pb-4"><div class="absolute  w-3 h-3 bg-indigo-100 border border-indigo-600 mt-2 -ml-1.5 -translate-y-1/4 rounded-full left-0"></div>{soli.hitorigoto}</dd>)
  }
  function notContinued(soli, key) {
    soliDate = soli.date;
    return (<div className="mt-2" key={key}>
      <dt className="relative text-sm mt-2  pl-8 text-gray-500 pt-"><div class="absolute w-5 h-5 bg-indigo-300 border-2 border-indigo-600 mt-px -ml-2.5 rounded-full left-0"></div>{soli.date}</dt>
      <dd className="relative pl-8 text-lg mt-4 pb-2"><div class="absolute  w-3 h-3 bg- border border-indigo-600 bg-indigo-100 mt-2 -ml-1.5 -translate-y-1/4 rounded-full left-0"></div>{soli.hitorigoto}</dd></div>)
  }

  return (
    <Fragment>
      <Head>
        <title>ひとりごと | KaniBlog</title>
        <meta name='description' content='WEB関係のお仕事をしております。日々の学習について気ままに発信します。' />
      </Head>
      <article>
        <h1 className="title-sec1">ひとりごと</h1>
        <div className="px-12 md:px-0">
          <dl className="border-l-2 ml-12 border-orange-300">
            {props.soliloquy.map(soli => {
              key++;



              return soliDate === soli.date ? continued(soli, key) : notContinued(soli, key);
            })}

          </dl>
        </div>
        <About tags={props.tags} />

      </article>
    </Fragment>
  )
}
export function getStaticProps() {
  const tags = getTags();
  const soliloquy = getSoliloquy();
  return {
    props: {
      tags: tags,
      soliloquy: soliloquy
    }
  }
}