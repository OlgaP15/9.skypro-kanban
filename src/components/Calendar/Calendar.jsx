import React, { useState, useEffect } from "react";
import {
  CalendarContainer,
  CalendarTitle,
  CalendarBlock,
  CalendarMonth,
  CalendarContent,
  CalendarDaysNames,
  CalendarDayName,
  CalendarCells,
  CalendarCell,
  CalendarNav,
  NavActions,
  NavAction,
  CalendarPeriod,
  CalendarText,
} from "./Calendar.styled";

function Calendar({ value, onChange, isDisabled = false }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [hoverDate, setHoverDate] = useState(null);

  useEffect(() => {
    if (value) {
      try {
        let date;
        if (typeof value === 'string' && value.includes('T')) {
          date = new Date(value);
        } else if (typeof value === 'string') {
          const parts = value.split('.');
          if (parts.length === 3) {
            date = new Date(parts[2], parts[1] - 1, parts[0]);
          }
        } else if (typeof value === 'number') {
          date = new Date(value);
        }
        
        if (date instanceof Date && !isNaN(date)) {
          setSelectedDate(date);
          setCurrentDate(new Date(date.getFullYear(), date.getMonth(), 1));
        }
      } catch (error) {
        console.error("Ошибка парсинга даты:", error);
      }
    }
  }, [value]);

  const getCalendarData = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDay = new Date(firstDay);
    startDay.setDate(startDay.getDate() - firstDay.getDay() + (firstDay.getDay() === 0 ? -6 : 1));
    
    const days = [];
    let currentDay = new Date(startDay);

    for (let i = 0; i < 42; i++) {
      days.push(new Date(currentDay));
      currentDay.setDate(currentDay.getDate() + 1);
    }
    
    return days;
  };

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const handleDateSelect = (date) => {
    if (isDisabled) return;
    
    setSelectedDate(date);
    if (onChange) {
      onChange(date.toISOString());
    }
  };

  const isToday = (date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const isSelected = (date) => {
    if (!selectedDate) return false;
    return (
      date.getDate() === selectedDate.getDate() &&
      date.getMonth() === selectedDate.getMonth() &&
      date.getFullYear() === selectedDate.getFullYear()
    );
  };

  const isCurrentMonth = (date) => {
    return date.getMonth() === currentDate.getMonth();
  };

  const isHovered = (date) => {
    if (!hoverDate) return false;
    return (
      date.getDate() === hoverDate.getDate() &&
      date.getMonth() === hoverDate.getMonth() &&
      date.getFullYear() === hoverDate.getFullYear()
    );
  };

  const getMonthYearString = () => {
    const months = [
      "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
      "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"
    ];
    return `${months[currentDate.getMonth()]} ${currentDate.getFullYear()}`;
  };

  const formatDateDisplay = () => {
    if (!selectedDate) return "Выберите срок исполнения";
    return `Срок исполнения: ${selectedDate.toLocaleDateString('ru-RU')}`;
  };

  const days = getCalendarData();
  const daysOfWeek = ["пн", "вт", "ср", "чт", "пт", "сб", "вс"];

  return (
    <CalendarContainer className="pop-new-card__calendar">
      <CalendarTitle className="subttl">Даты</CalendarTitle>
      <CalendarBlock>
        <CalendarNav>
          <CalendarMonth>{getMonthYearString()}</CalendarMonth>
          <NavActions>
            <NavAction 
              onClick={prevMonth}
              disabled={isDisabled}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="6"
                height="11"
                viewBox="0 0 6 11"
              >
                <path d="M5.72945 1.95273C6.09018 1.62041 6.09018 1.0833 5.72945 0.750969C5.36622 0.416344 4.7754 0.416344 4.41218 0.750969L0.528487 4.32883C-0.176162 4.97799 -0.176162 6.02201 0.528487 6.67117L4.41217 10.249C4.7754 10.5837 5.36622 10.5837 5.72945 10.249C6.09018 9.9167 6.09018 9.37959 5.72945 9.04727L1.87897 5.5L5.72945 1.95273Z" />
              </svg>
            </NavAction>
            <NavAction 
              onClick={nextMonth}
              disabled={isDisabled}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="6"
                height="11"
                viewBox="0 0 6 11"
              >
                <path d="M0.27055 9.04727C-0.0901833 9.37959 -0.0901832 9.9167 0.27055 10.249C0.633779 10.5837 1.2246 10.5837 1.58783 10.249L5.47151 6.67117C6.17616 6.02201 6.17616 4.97799 5.47151 4.32883L1.58782 0.75097C1.2246 0.416344 0.633778 0.416344 0.270549 0.75097C-0.0901831 1.0833 -0.090184 1.62041 0.270549 1.95273L4.12103 5.5L0.27055 9.04727Z" />
              </svg>
            </NavAction>
          </NavActions>
        </CalendarNav>
        <CalendarContent>
          <CalendarDaysNames>
            {daysOfWeek.map((day, index) => (
              <CalendarDayName 
                key={day} 
                className={index >= 5 ? "weekend" : ""}
              >
                {day}
              </CalendarDayName>
            ))}
          </CalendarDaysNames>
          <CalendarCells>
            {days.map((date, index) => {
              const isWeekend = date.getDay() === 0 || date.getDay() === 6;
              const isOtherMonth = !isCurrentMonth(date);
              const isDayToday = isToday(date);
              const isDaySelected = isSelected(date);
              const isDayHovered = isHovered(date);

              return (
                <CalendarCell
                  key={index}
                  className={`
                    ${isOtherMonth ? "other-month" : ""}
                    ${isWeekend ? "weekend" : ""}
                    ${isDayToday ? "current" : ""}
                    ${isDaySelected ? "active-day" : ""}
                    ${isDayHovered ? "hovered" : ""}
                  `}
                  onClick={() => handleDateSelect(date)}
                  onMouseEnter={() => !isDisabled && setHoverDate(date)}
                  onMouseLeave={() => !isDisabled && setHoverDate(null)}
                  style={{ 
                    cursor: isDisabled ? 'not-allowed' : 'pointer',
                    opacity: isDisabled ? 0.5 : 1
                  }}
                  title={date.toLocaleDateString('ru-RU')}
                >
                  {date.getDate()}
                </CalendarCell>
              );
            })}
          </CalendarCells>
        </CalendarContent>
        <CalendarPeriod>
          <CalendarText className="date-end">
            {formatDateDisplay()}
          </CalendarText>
        </CalendarPeriod>
      </CalendarBlock>
    </CalendarContainer>
  );
}

export default Calendar;