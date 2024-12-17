import React, { useState, useEffect } from 'react';
import axios from 'axios';

const JamendoTracks = () => {
  const [loading, setLoading] = useState(true); // State to manage loading
  const [error, setError] = useState(null); // State to handle errors
  const [trackUrl, setTrackUrl] = useState(null); // State to hold track URL

  const CLIENT_ID = '203a7d28';

  useEffect(() => {
    const fetchTrack = async () => {
      try {
        const response = await axios.get('https://api.jamendo.com/v3.0/tracks/', {
          params: {
            client_id: CLIENT_ID,
            name: 'Motivation',
            format: 'json',
            limit: 1,
          },
        });
        
        if (response.data && response.data.results.length > 0) {
          const track = response.data.results[0];
          setTrackUrl(track.audio);
          console.log(track);
        } else {
          throw new Error('No track found');
        }
      } catch (err) {
        console.error("Error API:", err.message);
        setError(err.message); 
      } finally {
        setLoading(false); 
      }
    };
    
    fetchTrack();
  }, []);

  if (loading) return null;
  if (error) return null;

  return (
    <div>
      {/* The audio player is hidden, just play in the background */}
      {trackUrl && (
        <audio autoPlays>
          <source src={trackUrl} type="audio/mp3" />
        </audio>
      )}
    </div>
  );
};

export default JamendoTracks;