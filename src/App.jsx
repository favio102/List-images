import { useEffect, useState } from "react";
import { ImageList } from "./components/ImageList/ImageList";
import "./App.css";
import { useScrollPosition } from "./hooks/useScrollPosition";
import axios from "axios";

export default function App() {
  const [imageList, setImageList] = useState([]);
  const { isBottom } = useScrollPosition();
  const [pageToFetch, setPageToFetch] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchImagesByPage(pageToFetch);
  }, [pageToFetch]);

  useEffect(() => {
    if (isBottom) {
      increasePage();
    }
  }, [isBottom]);

  async function fetchImagesByPage(pageNumber) {
    setIsLoading(true);
    const { data } = await axios(
      `https://picsum.photos/v2/list?page=${pageNumber}&limit=5`
    );
    setImageList([...imageList, ...data]);
    setIsLoading(false);
  }

  function increasePage() {
    setPageToFetch(pageToFetch + 1);
  }

  return (
    <div className="root">
      <h1>Random Images</h1>
      <h2>Download random open source images</h2>
      <ImageList ImageList={imageList} />
      {isLoading && <div className="spinner-border" role="status" />}
    </div>
  );
}
