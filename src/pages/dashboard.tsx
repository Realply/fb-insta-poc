import Nav from "@/components/nav";
import React, { useState, useEffect } from "react";
import { showToast } from "react-next-toast";
import { useSession } from "next-auth/react";


interface IPost {
  id: string;
  media_type: string;
  media_url: string;
  permalink: string;
  timestamp: Date;
  caption: string;
}

const dashboard = () => {
    const { data } = useSession()
  const [dummyPhotos, setDummyPhotos] = useState<IPost[]>([]);
  const [photos, setPhotos] = useState<IPost[]>([])
  

  // Define a function to fetch random images
  async function fetchRandomImages(numImages: number): Promise<IPost[]> {
    const dummyPhotos: IPost[] = [];

    for (let i = 0; i < numImages; i++) {
      // Simulate fetching random images by generating random URLs
      const randomWidth = Math.floor(Math.random() * (1920 - 640 + 1)) + 640; // Random width between 640 and 1920
      const randomHeight = Math.floor(Math.random() * (1080 - 480 + 1)) + 480; // Random height between 480 and 1080
      const imageUrl = `https://picsum.photos/${randomWidth}/${randomHeight}`;

      // Create a dummy post object
      const post: IPost = {
        id: `image_${i + 1}`,
        media_type: "image",
        media_url: imageUrl,
        permalink: `https://example.com/image_${i + 1}`,
        timestamp: new Date(),
        caption: `Random Image ${i + 1}`,
      };

      dummyPhotos.push(post);
    }

    return dummyPhotos;
  }



  useEffect(() => {
    const numImages = 30;
    fetchRandomImages(numImages)
      .then((dummyPhotos: IPost[]) => {
        setDummyPhotos(dummyPhotos);
      })
      .catch((error) => {
        console.error("Error fetching random images:", error);
      });
  }, []);



  useEffect(() => {
    const getData = async () => {
      try {
        // const response = await axios.get(`https://graph.facebook.com/v19.0/me/photos?fields=picture,name&limit=100&type=uploaded&access_token=${(data?.user as { access_token : string | undefined})?.access_token}`)
        // setPhotos(response.data?.data)
      } catch (error) {
        console.log(error)
        showToast.error("Sorry, couldn't retrieve data at this time. Please try again later.")
      }
      
    }
    getData()
  }, [data])


  return (
    <div className="h-dvh bg-primary">
      <Nav />
      <div className="grid grid-cols-auto sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {dummyPhotos.map((image) => (
          <img
            key={image.id}
            src={image.media_url}
            alt={image.caption || "Random Image"}
            className="rounded-lg object-cover h-full  w-full"
          />
        ))}
      </div>
    </div>
  );
};

export default dashboard;
