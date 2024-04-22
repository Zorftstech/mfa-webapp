'use client';

import React, { useEffect, useCallback } from 'react';
import useCountDown from 'react-countdown-hook';

import Each from '../helpers/each';

import { Text } from './text';

const initialTime = 60 * 6000000;
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
    const days = Math.floor(milliseconds / (1000 * 60 * 60 * 24));
    const hours = Math.floor((milliseconds % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((milliseconds % (1000 * 60)) / 1000);

    if (!days) return `${hours} hr : ${minutes} m : ${seconds} s`;

    return `${days} days : ${hours} hr : ${minutes} m : ${seconds} s`;
  };

  if (className) {
    const timeElements = formatTime(timeLeft).split(':');
    // console.log(timeElements);
    return (
      <span className="flex items-center gap-2">
        <Each
          of={timeElements}
          render={item => (
            <Text className={className} weight={'semibold'} size={'xl'}>
              {item}
            </Text>
          )}
        />
      </span>
    );
  }

  return (
    <Text size={'xl'} weight={'semibold'} variant={'white'}>
      {formatTime(timeLeft)}
    </Text>
  );
}
