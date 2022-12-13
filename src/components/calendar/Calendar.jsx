import React, { useRef, useEffect } from "react";
import "./_Calendar.scss";
import VanillaCalendar from "@uvarov.frontend/vanilla-calendar";
import "@uvarov.frontend/vanilla-calendar/build/vanilla-calendar.min.css";

export default function Calendar() {
  const calendarEl = useRef(null);

  useEffect(() => {
    if (!calendarEl.current) return;

    const calendar = new VanillaCalendar(calendarEl.current, {
      settings: {
        selected: {
          dates: ["2022-12-10", "2022-12-12", "2022-12-13"],
        },
        lang: "en",
        selection: {
          time: false,
        },
      },
    });
    calendar.init();
  }, [calendarEl]);

  return <div ref={calendarEl}>test</div>;
}

// render (<VanillaCalendar/>, document.querySelector('#root'));
