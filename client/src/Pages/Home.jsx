import React, { useEffect, useState } from 'react';
import Articles from '../components/Articles';
import { MDBCarousel, MDBCarouselItem, MDBCarouselCaption } from 'mdb-react-ui-kit';
import Header from '../components/Header';

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:4000/post/fetchposts');
        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }

        const fetchedPosts = await response.json();
        console.log(fetchedPosts);
        setPosts(fetchedPosts);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchData();
  }, []); 

  console.log(posts)

  return (
    <>
    <Header/>
    {/* Carousels */}
    { posts.length > 0 ? <div className='p-2 px-4 rounded-xl lg:block hidden'><MDBCarousel showIndicators showControls fade>
      <MDBCarouselItem itemId={1}>
        <img src={`http://localhost:4000/${posts[0]?.cover}`} className='d-block w-100 h-[70vh] object-cover rounded-xl' alt='...' />
        <MDBCarouselCaption>
          <h5>{`${posts[0]?.title}`}</h5>
          <p>{`${posts[0]?.summary}`}</p>
        </MDBCarouselCaption>
      </MDBCarouselItem>

      <MDBCarouselItem itemId={2}>
        <img src={`http://localhost:4000/${posts[1]?.cover}`} className='d-block w-100 h-[70vh] object-cover rounded-xl' alt='...' />
        <MDBCarouselCaption>
          <h5>{`${posts[1]?.title}`}</h5>
          <p>{`${posts[1]?.title}`}</p>
        </MDBCarouselCaption>
      </MDBCarouselItem>

      <MDBCarouselItem itemId={3}>
        <img src={`http://localhost:4000/${posts[2]?.cover}`} className='d-block w-100 h-[70vh] object-cover rounded-xl' alt='...' />
        <MDBCarouselCaption>
          <h5>{`${posts[2]?.title}`}</h5>
          <p>{`${posts[2]?.summary}`}</p>
        </MDBCarouselCaption>
      </MDBCarouselItem>
    </MDBCarousel>
    </div>: "Loading" }


    {/* Recent Blogs */}
    <div>
      <div>
        <h5 className='lg:pt-5 px-4 sm-p-1'>most Recent Blogs</h5> 
      </div>
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
    {posts.length > 0 &&
      posts.map((post) => (
        <Articles key={post._id} post={post} />
      ))}
  </div>
  </div>
  </>
  );
};

export default Home;
