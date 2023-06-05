const launchesURL='https://services.isrostats.in/api/launches';
const spacecraftURL='https://services.isrostats.in/api/spacecraft';
const launchSearchInputEl=document.querySelector('.launch-search-input');
const spacecraftSearchInputEl=document.querySelector('.spcaecraft-search-input');
const searchResultsEl=document.querySelector('.search-results');
const formEl=document.querySelector('.launch-search');
document.querySelector('.table-head-launches').style.display='none';
document.querySelector('.table-head-spacecraft').style.display='none';

const launchMenuEl=document.querySelector('.launch-menu');
const spacecraftMenuEl=document.querySelector('.spacecraft-menu');

document.querySelector('.spacecraft-search').style.display='none';

document.querySelector('.launch-search').addEventListener('submit',(event)=>{
  event.preventDefault();
  const inputValue=launchSearchInputEl.value;
  clearResults();
  
  getLaunches(inputValue);
})

document.querySelector('.spacecraft-search').addEventListener('submit',(event)=>{
  event.preventDefault();
  const inputValue=spacecraftSearchInputEl.value;
  document.querySelectorAll('.table-row-data').forEach(element=>{
    element.parentNode.removeChild(element);
  }
  )
  
  getSpacecrafts(inputValue);
})

console.log(document.querySelector('.launch-search').style.display)
launchMenuEl.addEventListener('click',()=>{
  document.querySelector('.spacecraft-search').style.display='none';
  document.querySelector('.launch-search').style.display='';
  document.querySelector('.table-head-launches').style.display='none';
  document.querySelector('.table-head-spacecraft').style.display='none';
  launchSearchInputEl.value='';
  clearResults();
})

spacecraftMenuEl.addEventListener('click',()=>{
  document.querySelector('.launch-search').style.display='none';
  document.querySelector('.spacecraft-search').style.display='';
  document.querySelector('.table-head-launches').style.display='none';
  document.querySelector('.table-head-spacecraft').style.display='none';
  spacecraftSearchInputEl.value='';
  clearResults();
  
})

function clearResults(){
  document.querySelectorAll('.table-row-data').forEach(element=>{
    element.parentNode.removeChild(element);
  }
  )
}









async function getLaunches(inputValue){
  try{
    
    document.querySelector('.table-head-launches').style.display='table';
    const launchData=await fetch(launchesURL)
    const data=await launchData.json()

    const results = data.filter(item => {
    return item.Name.includes(`${inputValue}`);
    });
  results.forEach((element,index) => {
      const dataWrapper=document.createElement('div')
      dataWrapper.classList.add('data-element')
      dataWrapper.innerHTML=`
      <div class="table-row-data">
      <div class="table-cell"><a class="site-link" target="_blank" href="${element.Link}">${element.Name}</a></div>
      <div class="table-cell">${element.LaunchDate}</div>
      <div class="table-cell">${element.LaunchType}</div>
      <div class="table-cell">${element.Payload}</div>
    </div>
    `
      searchResultsEl.appendChild(dataWrapper);
  });
  console.log(results);
}
catch(error){
  const dataWrapper=document.createElement('div')
  dataWrapper.classList.add('data-element')
  dataWrapper.innerHTML=error
  searchResultsEl.appendChild(dataWrapper);
}
  }

  async function getSpacecrafts(inputValue){
    document.querySelector('.table-head-spacecraft').style.display='table';
    const spacecraftData=await fetch(spacecraftURL)
    const data=await spacecraftData.json()
    const results = data.filter(item => {
      return item.name.includes(`${inputValue}`);
      });
    results.forEach(element=>{
      const dataWrapper=document.createElement('div')
      dataWrapper.classList.add('data-element')
      dataWrapper.innerHTML=`
      <div class="table-row-data">
      <div class="table-cell"><a class="site-link" target="_blank" href="${element.link}">${element.name}</a></div>
      <div class="table-cell">${element.launchDate}</div>
      <div class="table-cell">${element.launchVehicle}</div>
      <div class="table-cell">${element.application}</div>
      <div class="table-cell">${element.orbitType}</div>
    </div>
    ` 
    searchResultsEl.appendChild(dataWrapper);
    })
    console.log(data)

  }

