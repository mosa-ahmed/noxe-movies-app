import React,{useState,useEffect} from 'react';
import Item from '../Item/Item.jsx';
import {Helmet} from 'react-helmet';
import { BallTriangle } from 'react-loader-spinner'
import axios from 'axios';

export default function Movies() {
  let[people,setPeople]=useState([]);
  let[isLoading,setIsLoading]=useState(true);
  let[currentPage,setCurrentPage]=useState(1);

  let maxPages = 1000;
  let items = [];
  let leftSide = currentPage - 2;
  if(leftSide <= 0)leftSide=1;
  let rightSide = currentPage + 2;
  if(rightSide>maxPages)rightSide = maxPages;

  async function getTrending(type,dest){
    let {data}=  await axios.get(`https://api.themoviedb.org/3/trending/${type}/day?api_key=bdd10d2b8f52bc0a5320d5c9d88bd1ff&page=${currentPage}`)
    console.log(data);
    dest(data.results);
    setIsLoading(false);
  }
  
  async function searchPeople(e){
    if(e.target.value){
      let {data}=  await axios.get(`https://api.themoviedb.org/3/search/person?api_key=bdd10d2b8f52bc0a5320d5c9d88bd1ff&language=en-US&page=1&query=${e.target.value}&include_adult=false`)
      console.log(data);
      setPeople(data.results);
    }else{
      getTrending('person',setPeople);
    }
  }
    useEffect(()=>{
      getTrending('person',setPeople);
    },[currentPage]);

    for(let number =leftSide;number<=rightSide;number++){
      items.push(
        <div key={number} className={(number === currentPage?'rounded-effect active':'rounded-effect')} onClick={()=>{setCurrentPage(number)}}><a href="#" className='text-decoration-none text-white'>{number}</a></div>
      )
    }
 
    function nextPage(){
      if (currentPage<maxPages){
        setCurrentPage(currentPage+1);
      }
    }
    function prevPage(){
      if(currentPage>1){
        setCurrentPage(currentPage-1);
      }
    }

  return (
    <>
    {isLoading? <div className='d-flex w-100 justify-content-center vh-100 align-items-center'><BallTriangle
      height={100}
      width={100}
      radius={5}
      color="#4fa94d"
      ariaLabel="ball-triangle-loading"
      wrapperClass={{}}
      wrapperStyle=""
      visible={true}
    /></div>: <>
      <Helmet>
      <title>People Page | Movie App</title>
    </Helmet>
    <>
    <div className="row mt-5">
    <div className="px-2">
      <input type='text' onChange={searchPeople}className='form-control bg-search mb-5 px-3 py-2 rounded-pill border-info' placeholder='Search .....'></input>
      </div>
      {people?.map(person=><Item key={person.id} data={person} type={`person`}/>)}
    </div>
    <div className='d-flex justify-content-center align-items-center mb-5'>
      {currentPage<=1?'':<div  className='cursor-pointer fw-bolder fs-5 mx-3' onClick={prevPage}>&lsaquo;</div>}
      {items}
      {currentPage>=maxPages?'':<div className=' cursor-pointer fw-bolder fs-5 mx-3' onClick={nextPage}>&rsaquo;</div>}
    </div> 
</>
</>}
    </>
  )
}

