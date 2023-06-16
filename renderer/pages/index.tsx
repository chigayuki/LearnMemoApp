import { useEffect } from 'react'
import Link from 'next/link'
import Layout from '../components/Layout'
import dynamic from 'next/dynamic'

const Editor = dynamic(import("../components/draft/index"), { ssr: false})

const IndexPage = () => {
  useEffect(() => {
    const handleMessage = (_event: any, args: any) => alert(args)

    // add a listener to 'message' channel
    global.ipcRenderer.addListener('message', handleMessage)

    return () => {
      global.ipcRenderer.removeListener('message', handleMessage)
    }
  }, [])

  const onSayHiClick = () => {
    global.ipcRenderer.send('message', 'hi from next')
  }

  return (
    <Layout title="Home | Next.js + TypeScript + Electron Example">
      <h1>Hello Next.js 👋</h1>
      <button onClick={onSayHiClick}>Say hi to electron</button>
      <p>
        <Link href="/about">About</Link>
      </p>
        <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
          Draft.js with Next
        </h1>
        <Editor />
    </Layout>
  )
}

export default IndexPage
