// Search Input Field
const btnSubmit = () =>{
    document.getElementById("searchResult").innerHTML = "";
    document.getElementById("phoneDetails").innerHTML = "";
    const spinner = document.getElementById("spinner");
    const input = document.getElementById('inputField').value;
    spinner.style.display = "block";
    const url =`https://openapi.programming-hero.com/api/phones?search=${input}`
    fetch(url)
    .then(res => res.json())
    .then(data => showPhone(data.data.slice(0,20)));

    document.getElementById('inputField').value="";
};

const showPhone = data =>{
    const searchResult = document.getElementById('searchResult');
    // console.log(data);
    //Error Handler
    if(data.length === 0){
      const errorMessage = document.getElementById("error-message");
    errorMessage.style.display = "flex";
    spinner.style.display = "none";
    document.getElementById("device-name").innerText = "Phone Not Found!";
    }else{
    data.forEach(phones => {
        const div = document.createElement('div');
        div.classList.add('col')
        div.innerHTML =`
        <div class="row row-cols-1 row-cols-md-3 g-4 mb-3">
        <div class="card m-4" style="width: 18rem; ">
        <img src="${phones.image}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${phones.phone_name}</h5>
          <div onclick="details('${phones.slug}')" class="btn btn-info">Details</div>
        </div>
      </div>
        `
        searchResult.appendChild(div);
        spinner.style.display = "none";
        document.getElementById("error-message").style.display = "none";
    })
  }
};

const details = (id)=> {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    fetch(url)
    .then(res => res.json())
    .then(data => showDetails(data.data));
};
// Show details part
const showDetails =(show) =>{
  // console.log(show.mainFeatures);
  document.getElementById("phoneDetails").innerHTML = "";
  const phoneDetail = document.getElementById('phoneDetails');
  const div = document.createElement('div');
  div.innerHTML=`
  <div class="card" style="width: 18rem;">
  <img src="${show.image}" class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title"><span class="fw-bold">Name:</span> ${show.name}</h5>
    <p class="card-text"><span class="fw-bold">Brand:</span> ${show.brand}</p>
    <p class="card-text"><span class="fw-bold">Storage:</span> ${show.mainFeatures.storage}</p>
    <p class="card-text"><span class="fw-bold">DisplaySize:</span> ${show.mainFeatures.displaySize}</p>
    <p class="card-text"><span class="fw-bold">ChipSet:</span> ${show.mainFeatures.chipSet}</p>
    <p class="card-text"><span class="fw-bold">Memory:</span> ${show.mainFeatures.memory}</p>
    <p class="card-text"><span class="fw-bold">Sensors:</span> ${show.mainFeatures.sensors}</p>
    <p class="card-text"><span class="fw-bold">ReleaseDate:</span> ${show.releaseDate ? show.releaseDate : "No released date"}</p>
    <p class="card-text"><span class="fw-bold">WLAN:</span> ${show.others.WLAN}</p>
    <p class="card-text"><span class="fw-bold">Bluetooth:</span> ${show.others.Bluetooth}</p>
    <p class="card-text"><span class="fw-bold">GPS:</span> ${show.others.GPS}</p>
    <p class="card-text"><span class="fw-bold">NFC:</span> ${show.others.NFC}</p>
    <p class="card-text"><span class="fw-bold">Radio:</span> ${show.others.Radio}</p>
    <p class="card-text"><span class="fw-bold">USB:</span> ${show.others.USB}</p>
  </div>
</div>
  
  `
  phoneDetail.appendChild(div);

}