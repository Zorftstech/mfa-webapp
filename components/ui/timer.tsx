'use client';

import React, { useEffect, useCallback } from 'react';
import useCountDown from 'react-countdown-hook';

import Each from '../helpers/each';

import { Text } from './text';

const initialTime = 60 * 600000;
const interval = 1000;

export default function Timer({ className }: { className?: string }) {
  const [timeLeft, { start, pause, resume, reset }] = useCountDown(initialTime, interval);

  useEffect(() => {
    start();
  }, []);

  const restart = useCallback(() => {
    const newTime = 42 * 1000;
    start(newTime);
  }, []);

  const formatTime = (milliseconds: number) => {
    const hours = Math.floor(milliseconds / (1000 * 60 * 60));
    const minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((milliseconds % (1000 * 60)) / 1000);

    return `${hours}h : ${minutes}m : ${seconds}s`;
  };

  const timeElements = formatTime(timeLeft).split(':');

  if (className) {
    return (
      <span className="flex flex-wrap items-center gap-2">
        <Each
          of={timeElements}
          render={(item: any, index: number) => (
            <Text key={index} className={className}>
              {item}
            </Text>
          )}
        />
      </span>
    );
  }

  return (
    <div className="flex items-center gap-2">
      {/* {formatTime(timeLeft)} */}
      <Each
        of={timeElements}
        render={(item: any, index: number) => (
          <span>
            <Text
              className={`${item.includes('h') ? 'text-[#7ab42c]' : ''}`}
              key={index}
              size={'xl'}
              weight={'semibold'}
              variant={'white'}
            >
              {item} {index + 1 !== timeElements.length && <span>:</span>}
            </Text>
          </span>
        )}
      />
    </div>
  );
}
