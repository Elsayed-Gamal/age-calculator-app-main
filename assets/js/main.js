const btn = document.querySelector('.btn');
const yearsSpan = document.querySelector('.years span');
const monthsSpan = document.querySelector('.months span');
const daysSpan = document.querySelector('.days span');
const errorDay = document.querySelector('.error-day');
const errorMonth = document.querySelector('.error-month');
const errorYear = document.querySelector('.error-year');

const calcAge = function () {
  // get input values
  const day = parseInt(document.querySelector('#day').value);
  const month = parseInt(document.querySelector('#month').value);
  const year = parseInt(document.querySelector('#year').value);

  console.log(isNaN(day));

  // validate inputs of birth date
  const isValid = validateInputs(day, month, year);

  // stop the function if there is an error input value
  if (!isValid) return;

  // reset error message if exsist
  errorDay.parentElement.querySelector('label').style.color = '';
  errorMonth.parentElement.querySelector('label').style.color = '';
  errorYear.parentElement.querySelector('label').style.color = '';
  errorDay.parentElement.querySelector('input').style.border = '';
  errorMonth.parentElement.querySelector('input').style.border = '';
  errorYear.parentElement.querySelector('input').style.border = '';
  errorYear.textContent = '';
  errorYear.classList.add('hidden');
  errorMonth.textContent = '';
  errorMonth.classList.add('hidden');
  errorDay.textContent = '';
  errorDay.classList.add('hidden');

  // errorDay.classList.add('hidden');

  const birthDate = new Date(`${month}/${day}/${year}`);
  const dateNow = new Date();

  // get diffrence between birth date and now
  let yearsDiff = dateNow.getFullYear() - birthDate.getFullYear();
  let monthsDiff = dateNow.getMonth() - birthDate.getMonth();
  let daysDiff = dateNow.getDate() - birthDate.getDate();

  // check if months or days negative numbers
  if (monthsDiff < 0 || (monthsDiff === 0 && daysDiff < 0)) {
    yearsDiff--;
    monthsDiff += 12;
  }

  if (daysDiff < 0) {
    const daysInLastMonth = new Date(
      dateNow.getFullYear(),
      dateNow.getMonth(),
      0
    ).getDate();
    monthsDiff--;
    daysDiff += daysInLastMonth;
  }

  // update the ui
  yearsSpan.textContent = yearsDiff;
  monthsSpan.textContent = monthsDiff;
  daysSpan.textContent = daysDiff;
};

const validateInputs = function (day, month, year) {
  let isValid = true;

  if (year > new Date().getFullYear() || year < 1) {
    errorYear.textContent = 'Must be in the past';
    errorYear.classList.remove('hidden');
    errorYear.parentElement.querySelector('label').style.color = '#ff5959';
    errorYear.parentElement.querySelector('input').style.border =
      '1px solid #ff5959';

    isValid = false;
  }

  if (month > 12 || month < 1) {
    errorMonth.textContent = 'Must be a valid monthy';
    errorMonth.classList.remove('hidden');
    errorMonth.parentElement.querySelector('label').style.color = '#ff5959';
    errorMonth.parentElement.querySelector('input').style.border =
      '1px solid #ff5959';

    isValid = false;
  }

  const daysInMonth = new Date(year, month, 0).getDate();
  if (day > daysInMonth || day < 1) {
    errorDay.textContent = 'Must be a valid day';
    errorDay.classList.remove('hidden');
    errorDay.parentElement.querySelector('label').style.color = '#ff5959';
    errorDay.parentElement.querySelector('input').style.border =
      '1px solid #ff5959';

    isValid = false;
  }

  if (isNaN(day)) {
    errorDay.textContent = 'This field is required';
    errorDay.classList.remove('hidden');
    errorDay.parentElement.querySelector('label').style.color = '#ff5959';
    errorDay.parentElement.querySelector('input').style.border =
      '1px solid #ff5959';

    isValid = false;
  }

  if (isNaN(month)) {
    errorMonth.textContent = 'This field is required';
    errorMonth.classList.remove('hidden');
    errorMonth.parentElement.querySelector('label').style.color = '#ff5959';
    errorMonth.parentElement.querySelector('input').style.border =
      '1px solid #ff5959';

    isValid = false;
  }

  if (isNaN(year)) {
    errorYear.textContent = 'This field is required';
    errorYear.classList.remove('hidden');
    errorYear.parentElement.querySelector('label').style.color = '#ff5959';
    errorYear.parentElement.querySelector('input').style.border =
      '1px solid #ff5959';

    isValid = false;
  }

  return isValid;
};

btn.addEventListener('click', calcAge);
