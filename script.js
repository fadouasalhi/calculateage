
const year=document.querySelector(".yearinput")
const month=document.querySelector(".monthinput")
const day=document.querySelector(".dayinput")
const btn=document.querySelector(".icon")
const dayerror=document.querySelector("#day-error")
const montherror=document.querySelector("#month-error")
const yearerror=document.querySelector('#year-error')


function sanitizeday(value){
   return value.replace(/\D/g, '').slice(0, 2); // we replace non digits 
}
function validateday(value){
   if(!value)return { ok:false,msg:' this feild is required'};// we sending an object ok and msg are properties of it 
   const n= Number(value); // turn in into a number first
   if(Number.isNaN(n) || n<1 || n>31){
      return{ ok:false, msg:'must be a valid day'};
   }
   return{ ok: true };
}
day.addEventListener('input' , (e)=>{
   const clean=sanitizeday(e.target.value);
   if(e.target.value!==clean)e.target.value=clean;

   const {ok}=validateday(clean);
   if (ok){
      day.classList.remove('error');
      dayerror.textContent='';
   }
})
day.addEventListener('blur' ,()=>{
   const{ ok,msg}=validateday(day.value);
   if(!ok){
      day.classList.add('error');
      dayerror.textContent=msg;
   }else{
      day.classList.remove('error');
      dayerror.textContent='';
   }
})
//months
function sanitizemonth(value){
   return value.replace(/\D/g, '').slice(0, 2); // we replace non digits 
}
// validate function
function validatemonth(value){
   if(!value)return{ok:false, msg:'must be a valid month' };
   const m=Number(value);
   if(Number.isNaN(m) || m<1 || m>12)return {ok:false , msg:'must be a valid month'};
   else{
      return{ ok:true};
   }
} 
month.addEventListener('input',function(e) {
   const clear= sanitizemonth(e.target.value);
   if(e.target.value!==clear)e.target.value=clear;
   const {ok}=validatemonth(clear);
if(ok){
   month.classList.remove('error');
   montherror.textContent='';
}
if(!ok){
   month.classList.add('error');

}
})
month.addEventListener('blur',function(e){
   const {ok,msg}=validatemonth(e.target.value);
   if(!ok){
      month.classList.add('error');
      montherror.textContent=msg;
   }
   else{
      month.classList.remove('error');
      montherror.textContent='';
   }
})
//years 
function sanitizeyear(value){
   return value.replace(/\D/g, '').slice(0, 4);
}
function validateyear(value){
   if(!value)return{ok:false ,msg:'must be a valid year'};
   const y=Number(value);
   if(Number.isNaN(y) || y<1900 || y>2025 ){return{ok:false, msg:'must be a valid year'};}
   else{
return{ ok:true};
   }
   
}
year.addEventListener('input',function(e){
   const clearr=sanitizeyear(e.target.value);
   if(e.target.value!==clearr)e.target.value=clearr;
   const {ok}=validateyear(clearr);
   if(ok){
      year.classList.remove('error');
      yearerror.textContent='';
   }
})
year.addEventListener('blur',function(e){
   const{ok,msg}=validateyear(e.target.value);
   if(!ok){
      year.classList.add('error');
      yearerror.textContent=msg;
   }else{
      year.classList.remove('error');
      yearerror.textContent='';
   }
})
//function number of days in a month
function daysinmonth(month,year){
   return [
    31, 
    (year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0)) ? 29 : 28,
    31, 30, 31, 30, 31, 31, 30, 31, 30, 31
  ][month - 1];
}
function validatedate(d,m,y){
   const today=new Date();
   const dd=Number(d),  mm=Number(m), yy=Number(y);
   if(dd>daysinmonth(mm,yy)){
      return{ok:false, msg:'Day is invalid for this lonth/year'};

   }
   const date=new Date(yy,mm -1,dd);
   if(date>today){
      return{ok:false,msg:'Date cannot be in the future'};
   }
  {
      return{ ok:true};
   }
}
btn.addEventListener('click',()=>{
   const validday=validateday(day.value);
   const validmonth=validatemonth(month.value);
   const validyear=validateyear(year.value);

   if(!validday.ok){
      day.classList.add('error');
      dayerror.textContent=validday.msg;
   }
   if(!validmonth.ok){
      month.classList.add('error');
      montherror.textContent=validmonth.msg;
   }
   if(!validyear.ok){
      year.classList.add('error');
      yearerror.textContent=validyear.msg;
   }
   if(!validday.ok|| !validmonth.ok || !validyear.ok)return;
   const fullDate=validatedate(day.value, month.value ,year.value)
   if(!fullDate.ok){
      day.classList.add('error');
      dayerror.textContent=fullDate.msg;
      return;
   }
   day.classList.remove('error');
   month.classList.remove('error');
   year.classList.remove('error');
   calculateAge();

})
function calculateAge(){
   const d=Number(day.value);
   const m=Number(month.value);
   const y=Number(year.value);
   const today=new Date();
    let years = today.getFullYear() - y;
  let months = today.getMonth() + 1 - m;
  let days = today.getDate() - d; 
if (days < 0) {
    months--;
    days += daysinmonth(today.getMonth() === 0 ? 12 : today.getMonth(), today.getFullYear());
  }
  if (months < 0) {
    years--;
    months += 12;
  }
 document.querySelector('#years').textContent = years;
  document.querySelector('#months').textContent = months;
  document.querySelector('#days').textContent = days; 


}