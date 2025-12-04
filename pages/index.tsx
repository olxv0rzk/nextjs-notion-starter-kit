import type { PageProps } from '@/lib/types'
import { NotionPage } from '@/components/NotionPage'
import { domain } from '@/lib/config'
import { resolveNotionPage } from '@/lib/resolve-notion-page'

export const getStaticProps = async () => {
  try {
    const props = await resolveNotionPage(domain)

    return { props, revalidate: 10 }
  } catch (err) {
    console.error('page error', domain, err)

    // we don't want to publish the error version of this page, so
    // let next.js know explicitly that incremental SSG failed
    throw err
  }
}

export default function NotionDomainPage(props: PageProps) {
  //return <NotionPage {...props} />//
  return (
    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: '1fr 1fr', // 1:1 비율로 2열 나눔
      gridTemplateRows: '1fr 1fr',    // 1:1 비율로 2행 나눔
      height: '100vh',                // 화면 전체 높이 사용
      margin: 0 
    }}>
      
      {/* 1번 구역 (왼쪽 위) */}
      <div style={{ backgroundColor: '#FFD700', padding: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <h2>왼쪽 위 (버튼 넣을 곳)</h2>
      </div>

      {/* 2번 구역 (오른쪽 위) */}
      <div style={{ backgroundColor: '#ADD8E6', padding: '20px' }}>
        <h2>오른쪽 위</h2>
      </div>

      {/* 3번 구역 (왼쪽 아래) */}
      <div style={{ backgroundColor: '#90EE90', padding: '20px' }}>
        <h2>왼쪽 아래</h2>
      </div>

      {/* 4번 구역 (오른쪽 아래) */}
      <div style={{ backgroundColor: '#FFA07A', padding: '20px' }}>
        <h2>오른쪽 아래</h2>
      </div>

    </div>
  );
}
