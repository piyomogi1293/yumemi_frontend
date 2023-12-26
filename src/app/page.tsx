import Image from 'next/image'
import Main from '@/component/Main'

export default function Home() {
    return (
        <div style={{marginBottom:"20px", marginTop:"5px"}}>
            <header style={{textAlign: 'center', borderBottom: '3px'}}>
                <h1>都道府県別人口推移</h1>
            </header>
            <Main />
        </div>
  )
}
