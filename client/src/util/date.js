import { format, register } from 'timeago.js';
import koLocale from 'timeago.js/lib/lang/ko';

// Failed to parse source map Error
// 원인 : webpack5 와 CRA5 문제
// 해결: GENERATE_SOURCEMAP=false 로 설정하기
register('ko', koLocale);

export function formatAgo(date, lang) {
  // 게시글 등록 날짜를 Date 객체로 변환
  const postDate = new Date(date);

  // 현재 시간 가져오기
  const currentDate = new Date();

  // 두 날짜 간의 차이를 계산
  const timeDifference = currentDate - postDate;

  // 일 단위로 변환
  const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

  if (days < 8) {
    return format(date, lang);
  } else {
    // 일주일이 지났을 경우 날짜 형식 변경
    return new Date(date).toLocaleDateString();
  }
}
