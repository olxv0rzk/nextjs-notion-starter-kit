import * as React from 'react'
import { useState } from 'react' // 1. 상태 관리(열림/닫힘) 도구
import { motion, AnimatePresence } from 'framer-motion' // 2. 애니메이션 도구
import { resolveNotionPage } from '@/lib/resolve-notion-page'
import { domain } from '@/lib/config'

// 데이터 가져오는 부분 (그대로 유지)
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
  // "왼쪽 위 상자가 열렸니?"를 기억하는 변수 (false = 닫힘)
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
      
      {/* 1번 구역 (왼쪽 위) - 여기가 핵심! */}
      <div style={{ 
        backgroundColor: '#f0f0f0', 
        padding: '20px', 
        border: '1px solid #ddd', 
        position: 'relative',       // ★ 중요: 이 안에서만 움직이게 가두는 설정
        overflow: 'hidden',         // ★ 중요: 박스 밖으로 튀어나가면 잘라버림
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center', 
        alignItems: 'center' 
      }}>
        
        {/* 기본 내용 */}
        <h2>왼쪽 위 (메인)</h2>
        <button 
          onClick={() => setIsOpen(true)} // 버튼 누르면 '열림'으로 변경
          style={{ padding: '10px 20px', marginTop: '10px', cursor: 'pointer', backgroundColor: 'black', color: 'white', border: 'none', borderRadius: '5px' }}
        >
          자세히 보기 (클릭!)
        </button>

        {/* 👇 여기가 애니메이션 화면 (쓱 올라오는 부분) 👇 */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ y: "100%" }} // 시작 위치: 맨 아래
              animate={{ y: 0 }}      // 끝 위치: 제자리 (위로 올라옴)
              exit={{ y: "100%" }}    // 꺼질 때: 다시 아래로 내려감
              transition={{ duration: 0.5, ease: "easeInOut" }} // 0.5초 동안 부드럽게
              style={{
                position: 'absolute', // 부모(1번 구역) 기준으로 둥둥 뜸
                top: 0, left: 0, width: '100%', height: '100%', // 꽉 채우기
                backgroundColor: '#2d3436', // 진한 회색 배경
                color: 'white',
                display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
                zIndex: 10 // 다른 글자보다 위에 뜨게
              }}
            >
              <h2>✨ 짠! 새로운 페이지입니다 ✨</h2>
              <p>여기에 상세 내용을 적으면 됩니다.</p>
              
              <button 
                onClick={() => setIsOpen(false)} // 누르면 '닫힘'으로 변경
                style={{ marginTop: '20px', padding: '10px', cursor: 'pointer', backgroundColor: 'white', border: 'none', borderRadius: '5px' }}
              >
                닫기 (내려가기)
              </button>
            </motion.div>
          )}
        </AnimatePresence>

      </div>

      {/* 나머지 구역들 */}
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
