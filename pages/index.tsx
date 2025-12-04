import * as React from 'react'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { resolveNotionPage } from '@/lib/resolve-notion-page'
import { domain } from '@/lib/config'

// 데이터 가져오는 부분
export const getStaticProps = async () => {
  try {
    const props = await resolveNotionPage(domain)
    return { props, revalidate: 10 }
  } catch (err) {
    console.error('Page error', err)
    return { props: { error: err }, revalidate: 10 }
  }
}

export default function NotionDomainPage(props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: '1fr 1fr', 
      gridTemplateRows: '1fr 1fr',    
      height: '100vh',                
      margin: 0,
      fontFamily: 'sans-serif'
    }}>
      
      {/* 1번 구역 (왼쪽 위) */}
      <div style={{ 
        backgroundColor: '#f0f0f0', 
        padding: '20px', 
        border: '1px solid #ddd', 
        position: 'relative', 
        overflow: 'hidden', 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center', 
        alignItems: 'center' 
      }}>
        
        <h2>왼쪽 위 (메인)</h2>

        {/* 버튼이 여기 있어야 합니다! */}
        <button 
          onClick={() => setIsOpen(true)}
          style={{ 
            padding: '10px 20px', 
            marginTop: '10px', 
            cursor: 'pointer', 
            backgroundColor: 'black', 
            color: 'white', 
            border: 'none', 
            borderRadius: '5px',
            fontSize: '16px',
            zIndex: 5
          }}
        >
          자세히 보기 (클릭!)
        </button>

        {/* 애니메이션 화면 */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              style={{
                position: 'absolute',
                top: 0, 
                left: 0, 
                width: '100%', 
                height: '100%',
                backgroundColor: '#2d3436',
                color: 'white',
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'center', 
                alignItems: 'center',
                zIndex: 10
              }}
            >
              <h2>✨ 짠! 새로운 페이지입니다 ✨</h2>
              <p>여기에 상세 내용을 적으면 됩니다.</p>
              
              <button 
                onClick={() => setIsOpen(false)}
                style={{ 
                  marginTop: '20px', 
                  padding: '10px', 
                  cursor: 'pointer', 
                  backgroundColor: 'white', 
                  border: 'none', 
                  borderRadius: '5px' 
                }}
              >
                닫기 (내려가기)
              </button>
            </motion.div>
          )}
        </AnimatePresence>

      </div>

      <div style={{ backgroundColor: '#ffffff', padding: '20px', border: '1px solid #ddd' }}>
        <h3>오른쪽 위</h3>
      </div>
      <div style={{ backgroundColor: '#ffffff', padding: '20px', border: '1px solid #ddd' }}>
        <h3>왼쪽 아래</h3>
      </div>
      <div style={{ backgroundColor: '#f9f9f9', padding: '20px', border: '1px solid #ddd' }}>
        <h3>오른쪽 아래</h3>
      </div>

    </div>
  );
}
