import React, { useState, useEffect } from "react";
import { getSearchNews } from "./api.api";
import { Audio } from 'react-loader-spinner'
import { Ul } from "../ImageGallery/ImageGallery.styled";
import { Li, Img } from "./Imagegalleryitem.styled";
import Modal from "components/Modal/Modal";
import PropTypes from 'prop-types';
import { Button } from "./Imagegalleryitem.styled";
import { DivButton } from "./Imagegalleryitem.styled";

const ImageGalleryitem = ({ searchText }) => {
  const [news, setNews] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    if (searchText) {
      const fetchData = async () => {
        try {
          setIsLoading(true);
          setPage(1); 
          const data = await getSearchNews(searchText, 1);
          setNews(data.hits);
          setError(null);
        } catch (error) {
          setError(error);
        } finally {
          setIsLoading(false);
        }
      };

      fetchData();
    }
  }, [searchText]);

  const handleLoadMore = () => {
    setIsLoading(true);
    const nextPage = page + 1;
    getSearchNews(searchText, nextPage)
      .then((data) => {
        setNews((prevNews) => [...prevNews, ...data.hits]);
        setError(null);
        setPage(prevPage => prevPage + 1); 
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleOpenModal = (imageUrl) => {
    setSelectedImage(imageUrl);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
    setIsModalOpen(false);
  };

  return (
    <>
      {error && <p>{error.message}</p>}
      {searchText && (
        <Ul>
          {news.map((item) => (
            <Li key={item.id} onClick={() => handleOpenModal(item.largeImageURL)}>
              <Img src={item.webformatURL} alt={item.tags} />
            </Li>
          ))}
        </Ul>
      )}
      {isLoading && <Audio type="ThreeDots" color="#00BFFF" height={80} width={80} />}
      {news.length > 0 && (
        <DivButton>
        <Button type="button" onClick={handleLoadMore}>
          Load more
          </Button>
          </DivButton>
      )}
      {isModalOpen && (
        <Modal onClose={handleCloseModal} large={selectedImage} />
      )}
    </>
  );
}

ImageGalleryitem.propTypes = {
  searchText: PropTypes.string.isRequired,
};

export default ImageGalleryitem;
