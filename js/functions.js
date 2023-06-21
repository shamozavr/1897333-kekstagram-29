const lengthFN = (str, maxLength) => str.length <= maxLength;

const polyndromeCheck = (str) =>
  str.replace(/\s/g, '').toLowerCase() ===
  str.replace(/\s/g, '').toLowerCase().split('').reverse().join('');

const numExtract = (str) => str.toString().match(/\d+/g) === null ? NaN : Number(str.toString().match(/\d+/g).join(''));

const isTimeOk = (dayStart, dayEnd, MeetingStart, MeetingDuration) => {
  function turnIntoMin(time) {
    const splittedTime = time.split(':');
    return Number(splittedTime[0]) * 60 + Number(splittedTime[1]);
  }
  const dayStartMin = turnIntoMin(dayStart);
  const dayEndMin = turnIntoMin(dayEnd);
  const MeetingStartMin = turnIntoMin(MeetingStart);

  return (
    MeetingStartMin + MeetingDuration <= dayEndMin &&
    MeetingStartMin >= dayStartMin
  );
};

lengthFN();
polyndromeCheck();
numExtract();
isTimeOk();
