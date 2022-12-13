import React, { useState } from 'react'
import './_Calendar.scss'
import { render } from 'react-dom'
import VanillaCalendar from '@uvarov.frontend/vanilla-calendar';

export default function Calendar() {

    const calendar = new VanillaCalendar({
    HTMLElement: document.querySelector('.vanilla-calendar'),
    settings: {
      range: {
        min: '2022-05-01',
        max: '2022-05-13',
        values: ['2022-05-16', '2022-05-17'],
      },
    },
});
calendar.init();
   /*  const [date, setDate] = useState(new Date());

    const onChange = (date) => {
        setDate(date); */
   

  return (
    <div class="vanilla-calendar">
      <VanillaCalendar onChange={onChange} value={date} />
    </div>
  );
 }



// render (<VanillaCalendar/>, document.querySelector('#root'));

