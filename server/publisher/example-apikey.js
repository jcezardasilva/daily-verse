import {google} from 'googleapis';

// Each API may support multiple versions. With this sample, we're getting
// v3 of the blogger API, and using an API key to authenticate.

const youtube = google.youtube({
  version: 'v3',
  auth: 'AIzaSyC253eR2PFWI2DfTQaLTD3LjbIpvIyIehE'
})

youtube.channels.list({
  forUsername: "ieqjdmiranda",
  part: "contentDetails"
}).then((response)=>{
  console.log(response.items);
})
