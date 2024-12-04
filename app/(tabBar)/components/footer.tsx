export default function Footer() {
  return (
    <footer className="bg-neutral-900 text-neutral-400 py-8 text-sm flex flex-col justify-center items-center">
      <div className="flex max-w-7xl mx-auto px-4">
        {/* 상단 링크 영역 */}
        <div className="flex flex-wrap gap-4 mb-6">
          <a href="#" className="hover:text-neutral-200">
            개인정보 처리방침
          </a>
          <span>|</span>
          <a href="#" className="hover:text-neutral-200">
            고객센터 1599-7987
          </a>
          <span>|</span>
          <a href="#" className="hover:text-neutral-200">
            공지사항
          </a>
          <span>|</span>
          <a href="#" className="hover:text-neutral-200">
            자주 묻는 질문
          </a>
          <span>|</span>
          <a href="#" className="hover:text-neutral-200">
            투자 유의사항
          </a>
        </div>

        {/* 회사 정보 영역 */}
      </div>
      <div className="space-y-2 flex flex-col items-center">
        <p>
          사업자 등록번호: 519-87-01431 | 대표: 홍길동 | 주소: 06133 서울특별시
          강남구 테헤란로 133, 4층
        </p>
        <p className="text-neutral-500">
          본 사이트에서 제공하는 투자 정보는 고객의 투자 판단을 위한 단순
          참고용일 뿐, 투자 제안 및 권유, 증권 추천을 위해 작성된 것이 아닙니다.
        </p>
      </div>
    </footer>
  );
}
