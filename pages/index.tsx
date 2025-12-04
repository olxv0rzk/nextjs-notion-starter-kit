import * as React from 'react'
import { resolveNotionPage } from '@/lib/resolve-notion-page'
import { domain } from '@/lib/config'

// 1. 데이터 가져오는 부분 (이게 없으면 에러가 납니다)
export const getStaticProps = async () => {
  try {
    const props = await resolveNotionPage(domain)
    return { props, revalidate: 10 }
  } catch (err) {
    console.error('Page error', err)
    return { props: { error: err }, revalidate: 10 }
  }
}

// 2. 화면 보여주는 부분 (여기가 4분할 디자인!)
export default function NotionDomainPage(props) {
  return (
    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: '1fr 1fr', // 가로 반반
      gridTemplateRows: '1fr 1fr',    // 세로 반반
      height: '100vh',                // 화면 꽉 차게
      margin: 0,
      fontFamily: 'sans-serif'
    }}>
      
      {/* 1번 구역 (왼쪽 위) */}
      <div style={{ backgroundColor: '#f0f0f0', padding: '20px', border: '1px solid #ddd', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <h2>왼쪽 위 (메인)</h2>
        <button style={{ padding: '10px 20px', marginTop: '10px', cursor: 'pointer', backgroundColor: 'black', color: 'white', border: 'none', borderRadius: '5px' }}>
          자세히 보기
        </button>
      </div>

      {/* 2번 구역 (오른쪽 위) */}
      <div style={{ backgroundColor: '#ffffff', padding: '20px', border: '1px solid #ddd' }}>
        <h3>오른쪽 위</h3>
        <p>사진이나 소개글 공간</p>
      </div>

      {/* 3번 구역 (왼쪽 아래) */}
      <div style={{ backgroundColor: '#ffffff', padding: '20px', border: '1px solid #ddd' }}>
        <h3>왼쪽 아래</h3>
      </div>

      {/* 4번 구역 (오른쪽 아래) */}
      <div style={{ backgroundColor: '#f9f9f9', padding: '20px', border: '1px solid #ddd' }}>
        <h3>오른쪽 아래</h3>
      </div>

    </div>
  );
}
