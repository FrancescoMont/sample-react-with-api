import { Grid } from '@mui/material';
import React, { FC, useEffect, useState } from 'react';
import './App.css';
import { MyCard } from './components/card/card';
import { Character, RootObject } from './models/Character';
import { Button } from '@mui/material';


const App: FC = () => {
  const [page ,setPage ] = useState(1);
  const [favourites, setFavourites] = useState([] as number[]);
  const [characters , setCharacters] = useState([] as Character[]);
  const [isLoading, setLoading] = useState(false);
  const url = 'https://rickandmortyapi.com/api/character/';

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const loadData = async () => {
    const response = await fetch (`${url}?page=${page}`)
    const {results} = await response.json() as RootObject;
    setCharacters(results);
    console.log(results);
    setLoading(true);
  }

  useEffect(()=> {
    //console.log('Sono dentro effect')
    setLoading(false);
    setTimeout(loadData,700);
  },[page]);

  const handleNewCharacter = (characters: Character) => {
    const index = favourites.indexOf(characters.id);
    index === -1 ? favourites.push(characters.id) : favourites.splice(index,1);
    setFavourites([...favourites]);
  }

  return(
    <>
    <p>Hai {favourites.length} favoriti</p>
    <Button onClick={()=> {setPage (page -1)}}>Previus</Button>
    <p>{page}</p> 
    <Button onClick={()=> {setPage (page +1)}}>Next</Button>
    
    <Grid container spacing={2}>
    {
        characters.map(item =><Grid item xs={3}>
          <MyCard character = {item} 
        selected ={handleNewCharacter}
        isSelected={favourites.includes(item.id)}
        isLoading={isLoading}/>
        </Grid>)
    }
    </Grid>

    <Button onClick={()=> {setPage (page -1)}}>Previus</Button>
    <p>{page}</p> 
    <Button onClick={()=> {setPage (page +1)}}>Next</Button>
    </>
  )
}

export default App;
