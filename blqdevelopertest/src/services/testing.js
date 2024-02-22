const fetchBanners=()=>{

    fetch('https://api.testvalley.kr/main-banner/all')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    console.log(data);
    // Use the data as needed
  })
  .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
  });
}
//fetchBanners()

const fetchCollections=()=>{
    fetch('https://api.testvalley.kr/main-shortcut/all')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    console.log(data);
    // Use the data as needed
  })
  .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
  });
}
//fetchCollections()

const sortCollections=()=>{
    fetch('https://api.testvalley.kr/collections?prearrangedDiscount')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    console.log(data);
    // Use the data as needed
  })
  .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
  });
    
}
sortCollections()
