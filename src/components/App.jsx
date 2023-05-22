import {useState} from "react";
import Searchbar from "./Searchbar/Searchbar";
import ImageGallery from "./ImageGallery/ImageGallery";
import ImageGalleryitem from "./ImageGalleryItem/ImageGalleryItem";

export const App = () => {
  // state = {
  //   searchText: '',
  // }
  const [searchText,setSearchText] = useState('')

  const handleSearch = (searchText) => {
   setSearchText(searchText);
  }
  
    return (
      <div>
        <Searchbar handleSearch={handleSearch} />
        <ImageGallery />
        <ImageGalleryitem searchText={searchText} />
        <ImageGallery />
      </div>
    );
  
}
