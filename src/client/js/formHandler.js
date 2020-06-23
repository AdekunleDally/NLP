const form = document.querySelector('.AylienInput-form');
export async function handleSubmit(e){
  form.addEventListener('submit', handleSubmit)
  e.preventDefault();
  const text= document.getElementById('text').value;
  //console.log(text.value);
  const postAylienDataResult=  postAylienData('/AylienDataRoute', {
    polarity: polarity,
    subjectivity: subjectivity, 
    text: text,
    polarity_confidence: polarity_confidence,
    subjectivity_confidence: subjectivity_confidence
  })
  // console.log('Post Aylien results: ', postAylienDataResult)
}

//An asynchronous function to fetch the data from the app endpoint and Display to screen
export async function postAylienData(url, data){
  const dataResult= await fetch(url, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(dataResult => dataResult.json())
  .then(function(dataResult) {
    console.log(dataResult); // for debugging
    document.getElementById('polarity').innerHTML =  dataResult.polarity;
    document.getElementById('subjectivity').innerHTML = dataResult.subjectivity;
    document.getElementById('content').innerHTML = dataResult.text;
    document.getElementById('polarity_confidence').innerHTML = dataResult.polarity_confidence;
    document.getElementById('subjectivity_confidence').innerHTML = dataResult.subjectivity_confidence;
  })
}
  