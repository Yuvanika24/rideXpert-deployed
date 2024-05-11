// receives a request, extracts the search query from it, 
// generates a session token, makes a request to the Mapbox Search API, 
// parses the response, and returns the search results

//sample endpoint: http://localhost:3000/api/search-address?q=indira nagar

import { NextResponse } from "next/server";
import {v4 as uuidv4} from 'uuid';

const BASE_URL="https://api.mapbox.com/search/searchbox/v1/suggest?q=" 

export async function GET(request:any) {

    const {searchParams}= new URL (request.url);
    const searchText= searchParams.get('q');

    const sessionToken='session_token='+ uuidv4();
    //f6b778b8-4194-4646-a887-0997f6dd4a77
    console.log(sessionToken);

    const result=await fetch(BASE_URL+searchText+'&'+sessionToken+'&access_token='+
    process.env.MAPBOX_ACCESS_TOKEN+'&language=en&limit=8&country=IN',
    {
        headers:{
            'content-type':'application/json'
        }
    });

    console.log("sessionToken",sessionToken)
    const searchResult=await result.json();
    
    return NextResponse.json(searchResult);
}