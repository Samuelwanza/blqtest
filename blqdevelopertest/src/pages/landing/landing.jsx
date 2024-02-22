import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBanners } from "../../redux/feature/banners/bannersSlice";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Style from "./landing.module.css";
import { fetchShortcuts } from "../../redux/feature/shortcuts/shortcutsSlice";
import { fetchCollections } from "../../redux/feature/collections/collectionsSlice";
import { TiStar } from "react-icons/ti";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

const Landing = () => {
  const { banners, loading } = useSelector((state) => state.banners);

  const { shortcuts, loading: shortcutLoading } = useSelector(
    (state) => state.shortcuts
  );
  const { collections, loading: collectionLoading } = useSelector(
    (state) => state.collections
  );

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchBanners());
    dispatch(fetchShortcuts());
    dispatch(fetchCollections());
  }, []);

  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNext = () => {
    setCurrentSlide(
      (prevSlide) => (prevSlide + 1) % collections[0].items.length
    );
  };

  const handlePrev = () => {
    setCurrentSlide(
      (prevSlide) =>
        (prevSlide - 1 + collections[0].items.length) %
        collections[0].items.length
    );
  };

  const handleSlideChange = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className={Style.landingContainer}>
      <Carousel showThumbs={false} autoPlay interval={2000} infiniteLoop>
        {banners &&
          banners.map((banner) => {
            return (
              <div>
                <img src={banner.pcImageUrl} />
              </div>
            );
          })}
      </Carousel>
      <div className={Style.detailsContainer}>
        {shortcuts &&
          shortcuts.map((shortcut) => {
            return (
              <div className={Style.detailshortcut}>
                <img src={shortcut.imageUrl} alt="shortcut" />
                <p>{shortcut.title}</p>
              </div>
            );
          })}
      </div>
      <div className=''>
        {collections.length > 0 && (
          <div className={Style.cardItemsContainer}>
            <div className={Style.itemPromoter}>
              <h3>{collections[0].title}</h3>
              <span>{`[UPTO ${collections[0].items.reduce((acc, curr) => {
                return typeof curr.publication?.priceInfo?.discountRate ===
                  "number"
                  ? Math.max(acc, curr.publication?.priceInfo?.discountRate)
                  : acc;
              }, Number.NEGATIVE_INFINITY)}% OFF] ${
                collections[0].subtitle
              }`}</span>
              <div className={Style.scroll}>
                <FaAngleLeft onClick={handlePrev} />
                <FaAngleRight onClick={handleNext} />
              </div>
            </div>
            <Carousel
              className={Style.InnerRowContainer}
              showThumbs={false}
              showStatus={false}
              interval={1000}
              infiniteLoop
              emulateTouch
              centerMode
              centerSlidePercentage={100 / 4}
              selectedItem={currentSlide}
              swipeScrollTolerance={10}
              autoPlay
              onChange={handleSlideChange}
            >
              {collections[0].items.map((collection, index) => {
                return (
                  <div key={index} className={Style.card}>
                    <img
                      src={collection.publication.media[0].uri}
                      alt="thumbnail"
                    />
                    <p>{collection.publication.title}</p>
                    <div className={Style.priceInfo}>
                      <p>
                        {collection.publication.priceInfo.discountRate
                          ? collection.publication.priceInfo.discountRate + "%"
                          : ""}
                      </p>
                      <span>{collection.publication.priceInfo?.price}</span>
                      <span className={Style.priceDenominator}>원</span>
                    </div>
                    <div className={Style.rating}>
                      <TiStar />
                      <p>{collection.publication.rating}</p>
                    </div>
                    <div className={Style.productTag}>
                      <p>{collection.publication?.tagsOnImage[0]}</p>
                    </div>
                  </div>
                );
              })}
            </Carousel>
          </div>
        )}
        
      </div>
      <div >
          {collections.length > 0 &&
            collections.slice(1,10000).map((collection) => {
              return (
                <div className={Style.cardItemsContainer}>
                  <div className={Style.itemPromoter}>
                    <h3>{collection.title}</h3>
                    <span>{`[UPTO ${collection.items.reduce((acc, curr) => {
                      return typeof curr.publication?.priceInfo
                        ?.discountRate === "number"
                        ? Math.max(
                            acc,
                            curr.publication?.priceInfo?.discountRate
                          )
                        : acc;
                    }, Number.NEGATIVE_INFINITY)}% OFF] ${
                      collection.subtitle
                    }`}</span>
                    <div className={Style.scroll}>
                      <FaAngleLeft onClick={handlePrev} />
                      <FaAngleRight onClick={handleNext} />
                    </div>
                  </div>
                  <Carousel
                    className={Style.InnerRowContainer}
                    showThumbs={false}
                    showStatus={false}
                    interval={1000}
                    infiniteLoop
                    emulateTouch
                    centerMode
                    centerSlidePercentage={100 / 4}
                    selectedItem={currentSlide}
                    swipeScrollTolerance={10}
                    autoPlay
                    onChange={handleSlideChange}
                  >
                    {collection.items.map((collection, index) => {
                      return (
                        <div key={index} className={Style.card}>
                          <img
                            src={collection.publication.media[0].uri}
                            alt="thumbnail"
                          />
                          <p>{collection.publication.title}</p>
                          <div className={Style.priceInfo}>
                            <p>
                              {collection.publication.priceInfo.discountRate
                                ? collection.publication.priceInfo
                                    .discountRate + "%"
                                : ""}
                            </p>
                            <span>
                              {collection.publication.priceInfo?.price}
                            </span>
                            <span className={Style.priceDenominator}>원</span>
                          </div>
                          <div className={Style.rating}>
                            <TiStar />
                            <p>{collection.publication.rating}</p>
                          </div>
                          <div className={Style.productTag}>
                            <p>{collection.publication?.tagsOnImage[0]}</p>
                          </div>
                        </div>
                      );
                    })}
                  </Carousel>
                </div>
              );
            })}
        </div>
    </div>
  );
};

export default Landing;
