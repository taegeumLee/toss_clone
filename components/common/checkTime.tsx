export const checkTime = (time: Date) => {
  const now = new Date();
  const diff = now.getTime() - new Date(time).getTime();
  const diffMinutes = Math.floor(diff / (1000 * 60));
  if (diffMinutes < 60) {
    return `${diffMinutes}분 전`;
  } else if (diffMinutes < 1440) {
    return `${Math.floor(diffMinutes / 60)}시간 전`;
  } else if (diffMinutes < 10080) {
    return `${Math.floor(diffMinutes / 1440)}일 전`;
  } else if (diffMinutes < 40320) {
    return `${Math.floor(diffMinutes / 10080)}주 전`;
  } else {
    return `${Math.floor(diffMinutes / 40320)}년 전`;
  }
};
