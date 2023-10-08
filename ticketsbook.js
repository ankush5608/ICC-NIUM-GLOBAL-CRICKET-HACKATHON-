const container = document.querySelector('.m-container');
const seats = document.querySelectorAll('.m-row.seats-M-size:not(.m-occupied');
const count = document.getElementById('m-count');
const total = document.getElementById('m-total');
const sectionSelect = document.getElementById('sel-m-section');
const seatno = document.querySelectorAll('.seats-M-size:not(.m-occupied');
const secname = document.getElementById('sel-m-section');
const main = document.querySelector('main');
const repeatticket = document.querySelector('.m-pay')
const register = document.querySelectorAll('.fo-update')
const repeatform = document.querySelector('.m-formset')
var element = document.getElementById('ticketsprint');
var senufo = document.getElementById('seatnoform');
var ID = document.getElementById('ID');
var NAME = document.getElementById('Name');
let NAMEarr =[]
let IDarr =[]
populateUI();
let ticketPrice = +sectionSelect.value;
let sname = sectionSelect.data;
let secarr=['North-East Stand','North-West Stand','West Stand','East Stand','Diamond Pavilion','Platinum Pavilion','Gold Pavilion','West  Suites','Royal Suites','Royal Lounge','East VIP Suites']
let myarr=[];
let htmlstring="";
let htmlstring1="";
let seatval=0;
let selectedSeatsCount=0;
let sectionDisplay = "";
let selectIndex = 0;

seatno.forEach(function(seatnum){
  seatnum.addEventListener('click',function(){
    let seatnumber = this.getAttribute('data-sno');
    console.log(seatnumber);
    myarr.push(seatnumber);
    myarr = removeEvenTimes(myarr);
    myarr.sort();
  })
})


function removeEvenTimes(myarr) {
  const freq = {};
  for (let i = 0; i < myarr.length; i++) {
    freq[myarr[i]] = (freq[myarr[i]] || 0) + 1;
  }
  myarr = myarr.filter((el) => freq[el] % 2 !== 0);
  return myarr;
  
}
function repeating(){
  for(let i=0;i<myarr.length;i++){
    htmlstring += '<div class="o-container"><div class="o-card o-card-left"><h1 class="o-header">Jsinput</h1><div class="o-title"><h2>Jsinput</h2><span>Match</span></div><div class="o-ticno"><h2>Jsinput</h2><span>t no.</span></div><div class="o-name"><h2>Jsinput</h2><span>name</span> </div><div class="o-id"><h2>Jsinput</h2><span>id</span></div><div class="o-section"><h2>'
    htmlstring += secarr[selectIndex]
    htmlstring +='</h2><span>section</span></div><div class="o-seat"><h2>'
    htmlstring +=myarr[i]
    htmlstring +='</h2><span>seat no.</span></div><div class="o-time"><h2>Jsinput</h2><span>time</span></div></div><div class="o-card o-card-right"><div class="o-eye"></div><div class="o-section1"><h3>';
    htmlstring += secarr[selectIndex]                          
    htmlstring += '</h3><span>Section</span></div><div class="o-number"><h3>'
    htmlstring += myarr[i]
    htmlstring += '</h3><span>seat</span></div></div></div>'
    }  
  element.innerHTML = htmlstring;
}
function repeating1(){
  for(let i=0;i<myarr.length;i++){
    htmlstring1 +='<div class="fo-body"><div class="fo-container"><header>SEAT NUMBER '
    htmlstring1 += myarr[i];
    htmlstring1 +='</header><div class="container"><form><div class="form first"><div class="details personal"><span class="title">Personal Details</span><div class="fields"><div class="input-field"><label>Full Name</label><input type="text" placeholder="Enter your name" id="Name" required></div><div class="input-field"><label>Date of Birth</label><input type="date" placeholder="Enter birth date" required> </div><div class="input-field"><label>Mobile Number</label><input type="number" placeholder="Enter mobile number" required></div><div class="input-field"><label>Gender</label><select required><option disabled selected>Select gender</option><option>Male</option><option>Female</option><option>Others</option></select></div><div class="input-field"> <label>ID Type</label><input type="text" placeholder="Enter ID type" required></div> <div class="input-field"><label>ID Number</label> <input type="number" placeholder="Enter ID number" id="ID" required> </div></div></div></div></form><button class="fo-update btn btn-primary">Register</button></div></div></div>'
  }
senufo.innerHTML = htmlstring1;
}
function setdata(){
  NAMEarr.push(NAME.value)
  IDarr.push(ID.value);
  console.log(NAMEarr);
}
function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll('.m-row .seats-M-size.m-selected');

  const seatsIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));

  localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));
  const selectedSeatsCount = selectedSeats.length;
  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;
}

function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add('m-selected');
      }
    });
  }

  const selectedsectionIndex = localStorage.getItem('selectedsectionIndex');

  if (selectedsectionIndex !== null) {
    sectionSelect.selectedIndex = selectedsectionIndex;
  }
}

function setsectionData(sectionIndex, sectionPrice) {
  localStorage.setItem('selectedsectionIndex', sectionIndex);
  localStorage.setItem('selectedsectionPrice', sectionPrice);
}

sectionSelect.addEventListener('change', (e) => {
  ticketPrice = +e.target.value;
  selectIndex=e.target.selectedIndex;
  setsectionData(e.target.selectedIndex, e.target.value);
  console.log(selectIndex)
  updateSelectedCount();
});

container.addEventListener('click', (e) => {
  if (e.target.classList.contains('seats-M-size') && !e.target.classList.contains('m-occupied')) {
    e.target.classList.toggle('m-selected');
    updateSelectedCount();
  }
});
repeatticket.addEventListener('click', (e) => {
  repeating();
});
repeatform.addEventListener('click', (e) => {
  repeating1();
});
register.addEventListener('click', (e) => {
  setdata();
});
updateSelectedCount();