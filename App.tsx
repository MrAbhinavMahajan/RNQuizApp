import React from "react";
import AppEntry from "./src/app/Main";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import duration from "dayjs/plugin/duration";
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(duration);

function App() {
  return <AppEntry />;
}

export default App;
