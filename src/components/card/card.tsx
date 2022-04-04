import React, { FC } from "react";
import { Character } from "../../models/Character";
//import './card.css';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, IconButton, Skeleton } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';

const MyCard: FC<{character: Character, selected? : (character: Character, ) => void, isSelected:boolean, isLoading:boolean}> = (props) =>{
  const {character, selected, isSelected, isLoading = false} = props;
  return (<Card sx={{ maxWidth: 345 }}>
    {isLoading?<CardActionArea>
      <CardMedia
        component="img"
        image={character.image}
        alt={character.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {character.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {character.species}
        </Typography>
        <IconButton onClick={()=> selected && selected(character)} aria-label="add to favorites">
          <FavoriteIcon style={{color: isSelected ? 'red' : 'grey'}}/>
        </IconButton>
      </CardContent>
    </CardActionArea>: <Skeleton  variant="rectangular" width={210} height={118} /> }
    
  </Card>

  );
}

export {MyCard}