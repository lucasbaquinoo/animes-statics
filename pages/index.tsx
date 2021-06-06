import { GetStaticProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home({ randomAnime, quotesNaruto, quotesOnePiece }) {
  return (
    <div className={styles.container}>
      <a className={styles.title} href="#">Animes</a>
      <div className={styles.spotlight}>
        <h1 className={styles.description}>{`"${randomAnime.quote}"- ${randomAnime.character}`}</h1>
        <h2 className={styles.title}>{randomAnime.anime}</h2>
      </div>
      <div className={styles.grids}>
        <div className={styles.grid}>
          <h2>Quotes from Naruto</h2>
          {quotesNaruto.map(quote => (
            <div className={styles.card}>
              <p>{quote.quote}</p>
              <h2>{quote.character}</h2>
            </div>
          ))}
        </div>
        <div className={styles.grid}>
          <h2>Quotes from One Piece</h2>
          {quotesOnePiece.map(quote => (
            <div className={styles.card}>
              <p>{quote.quote}</p>
              <h2>{quote.character}</h2>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const randomAnime = await fetch('https://animechan.vercel.app/api/random').then(response => response.json())
  const quotesNaruto = await fetch('https://animechan.vercel.app/api/quotes/anime?title=naruto').then(response => response.json())
  const quotesOnePiece = await fetch('https://animechan.vercel.app/api/quotes/anime?title=one%20piece').then(response => response.json())

  return {
    props: {
      randomAnime,
      quotesNaruto,
      quotesOnePiece
    },
    revalidate: 6
  }
}
