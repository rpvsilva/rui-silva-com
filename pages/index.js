import Head from 'next/head';
import Navbar from '../components/layout/Navbar';

export default function App() {
  return (
    <div>
      <Head>
        <title>Rui Silva &bull; Resume Website</title>
        <link href="https://fonts.googleapis.com/css2?family=Ubuntu+Mono:wght@400;700&display=swap" rel="stylesheet" />
      </Head>
      <Navbar />

      <div id="about">
        <h2>About me</h2>  
      </div>
    </div>
  );
}