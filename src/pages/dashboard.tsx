import Nav from "@/components/nav";
import React, { useState, useEffect } from "react";
import { showToast } from "react-next-toast";
import { useSession } from "next-auth/react";
import AOS from "aos";
import axios from "axios";

interface IPost {
  id: string;
  media_type: string;
  media_url: string;
  permalink: string;
  timestamp: Date;
  caption: string;
}

// animations
const animationClasses = [
  "fade-up",
  "fade-down",
  "fade-left",
  "fade-right",
  "fade-up-right",
  "fade-up-left",
  "fade-down-right",
  "fade-down-left",
  "zoom-in",
  "zoom-in-up",
  "zoom-in-down",
  "zoom-in-left",
  "zoom-in-right",
  "zoom-out",
  "zoom-out-up",
  "zoom-out-down",
  "flip-left",
  "flip-right",
  "flip-up",
  "flip-down",
  "slide-right",
  "slide-left",
];

// random animation
const randomNum = Math.floor(Math.random() * (animationClasses.length - 1));

const dashboard = () => {
  useEffect(() => {
    AOS.init({ delay: 400, duration: 900, easing: "ease-in-out" });
  }, []);

  const { data } = useSession();

  const [instaPhotos, setInstaPhotos] = useState<IPost[]>([]);

  const [dummyPhotos, setDummyPhotos] = useState<IPost[]>([]);

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

  // TODO: enable when FB App is verified and ready for use.
  // useEffect(() => {
  //   const getData = async () => {
  //     try {
  //       // const response = await axios.get(`https://graph.facebook.com/v19.0/me/photos?fields=picture,name&limit=100&type=uploaded&access_token=${(data?.user as { access_token : string | undefined})?.access_token}`)
  //       // setPhotos(response.data?.data)
  //     } catch (error) {
  //       console.log(error)
  //       showToast.error("Sorry, couldn't retrieve data at this time. Please try again later.")
  //     }

  //   }
  //   getData()
  // }, [data])

  useEffect(() => {
    const getPhotos = async () => {
      try {
        // hard coded access token for Test User account
        const response = await axios.get(
          `https://graph.instagram.com/me/media?fields=id,caption,media_url,timestamp,media_type,permalink&access_token=IGQWRPLWxGVFV0ZAzdDZAWtwdXdhc1JMaEh2NkFBUDFtZA2dzM1EyZAnNxWjdwa0E3NnZAtSnJ1NDY1ZAjNrT09kX3ZAiVXVoUmFlajJMVG5scGlHSXBwdjdDbjBCdF95ZADgweDZAfOTF1cFp4ZA2pkOEs1dWJDUTFiamVhWW8ZD`,
        );
        console.log("API response ==> ", response);
        setInstaPhotos(response.data?.data);
      } catch (error) {
        console.log(error);
        showToast.error(
          "Sorry, couldn't retrieve data at this time. Please try again later.",
        );
      }
    };
    getPhotos();
  }, []);

  return (
    <div className="h-dvh overflow-x-hidden overflow-y-scroll bg-primary">
      <Nav />
      <div className="grid grid-cols-auto sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6 p-12">
        {instaPhotos.map((repeatedImage, index) => (
          <img
            key={index}
            src={repeatedImage.media_url}
            alt={repeatedImage.caption || "Random Image"}
            className="rounded-lg object-cover h-full w-full !transition-all !duration-300 cursor-pointer hover:!scale-105"
            data-aos={animationClasses[index]}
          />
        ))}
      </div>
    </div>
  );
};

export default dashboard;
