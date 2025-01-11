import { clsx, type ClassValue } from 'clsx';
import { isEmpty } from 'lodash';
import { twMerge } from 'tailwind-merge';
import { Json } from '~/types/database.types';
import { DateTime, GrabDateTime } from '~/types/schedule.types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function extractDate(dateString: Json | string | null): string {
  try {
    if (isEmpty(dateString)) {
      return '____.__.__';
    }
    const parsedData = JSON.parse(dateString as string);
    const dateKey = Object.keys(parsedData[0])[0];
    return dateKey;
  } catch (error) {
    // throw new Error('유효하지 않은 날짜 형식입니다.');
    return '____.__.__';
  }
}

// DateTime 변수에서 시간만 출력하는 함수
// ex) [{"2024-12-13":[{"time":"09:00"}]}] ->>>> "09:00"
export function extractTime(dateString: Json | string | null): string {
  try {
    if (isEmpty(dateString)) {
      return '--:--';
    }
    const parsedData = JSON.parse(dateString as string);
    const dateKey = Object.keys(parsedData[0])[0];

    return parsedData[0][dateKey][0].time;
  } catch (error) {
    return '--:00';
  }
}

// 활성화된 날짜와 시간을 확인하는 함수
// ex) [{"2024-11-29":[{"time":"11:00"}]}] / 2024-11-29 / 09:00
export const isActive = (dateList: DateTime, date: string, time: string): boolean => {
  return dateList.some((item) => {
    const times = item[date];
    if (!times) return false;
    return times.some((slot) => slot.time === time);
  });
};

// 시간 선택시 변수 값을 추가/삭제하는 토글 함수
// ex) [] => [{"2024-11-11": {time: "09:00"}}]
export const toggleSelectedTime = (dateTime: DateTime, date: string, time: string): DateTime => {
  try {
    // 현재 데이터의 복사본 생성
    let result = [...dateTime];

    // 해당 날짜의 데이터 찾기
    const dateIndex = result.findIndex((item) => Object.keys(item)[0] === date);

    if (dateIndex === -1) {
      // 날짜가 존재하지 않으면 새로 추가
      return [...result, { [date]: [{ time }] }];
    }

    const dateData = result[dateIndex];
    const timeSlots = dateData[date];

    // 해당 시간이 이미 존재하는지 확인
    const timeIndex = timeSlots.findIndex((slot) => slot.time === time);

    if (timeIndex === -1) {
      // 시간이 존재하지 않으면 추가
      dateData[date] = [...timeSlots, { time }];
    } else {
      // 시간이 존재하면 삭제
      dateData[date] = timeSlots.filter((slot) => slot.time !== time);

      // 해당 날짜의 모든 시간이 삭제되었다면 날짜도 제거
      if (dateData[date].length === 0) {
        result = result.filter((_, index) => index !== dateIndex);
      }
    }

    return result;
  } catch (err) {
    console.log('errrr  ', err);
    return [];
  }
};

// 선택된 날짜를 투표 날짜로 변환
// ex) []
export const convertToScheduleArray = (dates: string[]): DateTime => {
  dates.sort((a, b) => new Date(a).getTime() - new Date(b).getTime());

  return dates.map((date) => ({
    [date]: Array.from({ length: 12 }, (_, index) => ({
      time: `${('0' + (9 + index)).slice(-2)}:00`, // '09:00', '10:00', ..., '21:00'
    })),
  }));
};

// json 데이터에서 날짜가 존재하는지 확인하는 함수
// ex) checkDateExists([{"2024-11-05":[{"time":"09:00"}]}] ["2024-11-06", "2024-11-22"])
export const checkDateExists = (data: any | null, searchDates: string[]): boolean => {
  if (data === null) return false;
  // 데이터에서 날짜 추출
  const existingDate = Object.keys(data[0])[0];

  // searchDates 배열에 existingDate가 포함되어 있는지 확인
  return searchDates.includes(existingDate);
};

// 현재 미팅 참여 요청한 데이터들 중 몇명이 누가 선택하는지 체크하는 함수
// ex)
export const findMatchSchedules = (
  grabDateTime: GrabDateTime | undefined,
  targetDate: string,
  targetTime: string,
) => {
  if (grabDateTime === undefined) return 0;

  return grabDateTime.reduce((count, entry) => {
    const date = Object.keys(entry)[0];
    const timeValue = entry[date].time;

    if (date === targetDate && timeValue === targetTime) {
      return count + 1;
    }
    return count;
  }, 0);
};
