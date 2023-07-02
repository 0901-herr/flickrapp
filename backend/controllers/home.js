import axios from "axios";

export default class HomeController {
  static async apiGetImages(req, res) {
    try {
      const { tags } = req.query; // Get the tags parameter from the request query

      // Make a request to the Flickr API
      const response = await axios.get(
        "https://api.flickr.com/services/rest/",
        {
          params: {
            method: "flickr.photos.search",
            api_key: process.env.FLICKR_API_KEY,
            tags: tags,
            format: "json",
            nojsoncallback: 1,
          },
        }
      );
      const photos = response.data.photos.photo;

      // Extract the data from the response and format it
      const formattedPhotos = photos.map((photo) => ({
        id: photo.id,
        title: photo.title,
        url: `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`,
      }));
      res.json(formattedPhotos); // Send the formatted photos as the response
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "An error occurred" });
    }
  }
}
