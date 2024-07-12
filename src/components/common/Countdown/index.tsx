import { useEffect, useRef, useState } from "react";
import dayjs from "dayjs";
import { Text, View } from "react-native";
import { styles } from "./styles";

type CountDownProps = {
  enabled?: boolean;
  endTime: number; // milliseconds
  onEnd: () => void;
};

const CountDown = ({ enabled, endTime, onEnd }: CountDownProps) => {
  const [time, setTime] = useState<number>(0); // seconds
  const timerRef = useRef<NodeJS.Timeout>();
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  const startTimer = () => {
    const duration = dayjs.duration(dayjs(endTime).diff(dayjs()));
    setTime(Math.floor(duration.asSeconds())); // total duration in seconds as a floating-point number

    timerRef.current = setInterval(() => {
      if (isMounted.current) {
        setTime((prevTime) => {
          const newTime = prevTime - 1;
          if (newTime <= 1) {
            clearInterval(timerRef.current);
            onEnd();
            return 0;
          }
          return newTime;
        });
      }
    }, 1000);
  };

  const clearTimer = () => {
    clearInterval(timerRef.current);
  };

  useEffect(() => {
    if (enabled) {
      startTimer();
    } else {
      clearTimer();
    }

    return clearTimer;
  }, [enabled]);

  const renderDuration = (label: string, value: string, separator?: string) => {
    if (!parseInt(value)) {
      return <></>;
    }

    return (
      <View style={styles.timeItemContainer}>
        <View>
          <Text style={styles.countdownValue}>{value}</Text>
          <Text style={styles.countdownLabel}>
            {label}
            {parseInt(value) !== 1 ? "S" : ""}
          </Text>
        </View>
        {!!separator && (
          <Text style={styles.countdownSeparator}>{separator}</Text>
        )}
      </View>
    );
  };

  const render = () => {
    const duration = dayjs.duration(time * 1000); // consume milliseconds
    const hours = duration.hours().toString().padStart(2, "0"); // whole hours
    const mins = duration.minutes().toString().padStart(2, "0"); // whole minutes
    const secs = duration.seconds().toString().padStart(2, "0"); // whole seconds
    return (
      <View style={styles.container}>
        {renderDuration("HR", hours, ":")}
        {renderDuration("MIN", mins, ":")}
        {renderDuration("SEC", secs)}
      </View>
    );
  };

  return render();
};

export default CountDown;
